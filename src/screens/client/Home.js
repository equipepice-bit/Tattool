import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ref, get } from 'firebase/database';

import { ArtistCard } from '../../components/ArtistCard';
import { IMAGES } from '../../constants/images';
import { homeStyles as styles } from '../../styles/HomeStyles';
import { COLORS } from '../../theme/colors';
import BottomTabs from '../../components/BottomTabs';
import { useTheme } from '../../context/ThemeContext';
import { db } from '../../../firebase';
import { getUserData } from '../../utils/storage';
import { RTDBService } from '../../services/RTDBService';

export default function Home() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [artists, setArtists] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Adicione esta linha

  const { colors, isDark } = useTheme();

  const loadUserAndFavorites = useCallback(async () => {
    try {
      const userData = await getUserData();
      setUser(userData);
      
      if (userData?.uid) {
        await loadUserFavorites(userData.uid);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  }, []);

  const loadUserFavorites = async (userId) => {
    try {
      const favoritesData = await RTDBService.getUserFavorites(userId);
      const favoriteIds = favoritesData.map(artist => artist.uid || artist.id);
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  const loadAllArtists = useCallback(async () => {
    try {
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const artistsArray = [];
        
        Object.keys(usersData).forEach(userId => {
          const userData = usersData[userId];
          if (userData.role === 'Tattoo Artist') {
            const isFav = favorites.includes(userId);
            
            artistsArray.push({
              id: userId,
              uid: userId,
              name: userData.name || 'Tatuador',
              styles: userData.tags ? userData.tags.join(', ') : 'Estilos variados',
              rating: userData.rating || 4.5,
              foto: userData.foto || IMAGES.ANA_SILVA,
              tags: userData.tags || [],
              endereco: userData.endereco || '',
              telefone: userData.telefone || '',
              isFavorite: isFav,
              bio: userData.bio || ''
            });
          }
        });
        
        setArtists(artistsArray);
      } else {
        setArtists([]);
      }
    } catch (error) {
      console.error('Erro ao carregar tatuadores:', error);
      setArtists([]);
    }
  }, [favorites]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      await loadUserAndFavorites();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, [loadUserAndFavorites]);

  useEffect(() => {
    if (favorites.length >= 0) {
      loadAllArtists();
    }
  }, [favorites, loadAllArtists]);

  useFocusEffect(
    useCallback(() => {
      loadData();
      setRefreshKey(prev => prev + 1); // Force re-render
    }, [loadData])
  );

  const filteredArtists = artists.filter((artist) => {
    if (!searchText.trim()) return true;
    
    const searchLower = searchText.toLowerCase();
    const nameMatch = artist.name.toLowerCase().includes(searchLower);
    const styleMatch = artist.styles.toLowerCase().includes(searchLower);
    const tagMatch = artist.tags?.some(tag => tag.toLowerCase().includes(searchLower));
    const bioMatch = artist.bio?.toLowerCase().includes(searchLower);
    
    return nameMatch || styleMatch || tagMatch || bioMatch;
  });

  const toggleFavorite = async (artistId) => {
    if (!user?.uid) {
      Alert.alert('Login necessário', 'Faça login para favoritar artistas');
      return;
    }

    try {
      if (favorites.includes(artistId)) {
        await RTDBService.removeFromFavorites(user.uid, artistId);
        setFavorites(prev => prev.filter(id => id !== artistId));
      } else {
        await RTDBService.addToFavorites(user.uid, artistId);
        setFavorites(prev => [...prev, artistId]);
      }
      
      // Atualiza o estado local dos artistas
      setArtists(prevArtists => 
        prevArtists.map(artist => 
          artist.id === artistId 
            ? { ...artist, isFavorite: !artist.isFavorite }
            : artist
        )
      );
    } catch (error) {
      console.error('Erro ao alterar favorito:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os favoritos');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={colors.statusBarStyle} backgroundColor={colors.background} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5D1010" />
          <Text style={{ marginTop: 10, color: colors.text }}>Carregando tatuadores...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} key={refreshKey}>
      <StatusBar barStyle={colors.statusBarStyle} backgroundColor={colors.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}>
        
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={[
                styles.logo,
                {
                  width: 45,
                  height: 45,
                  tintColor: isDark ? '#FFF' : undefined,
                },
              ]}
              resizeMode="contain"
            />
            <Text style={[styles.logoText, { color: isDark ? '#FFF' : styles.logoText.color }]}>
              Tattool
            </Text>
          </View>

          <View style={styles.headerIcons}>
            {user && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate('Settings')}>
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color={isDark ? '#FFF' : COLORS.logoText}
                />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                if (user) {
                  navigation.navigate('Favorites');
                } else {
                  navigation.navigate('Login');
                }
              }}>
              <Ionicons
                name="heart"
                size={24}
                color={favorites.length > 0 ? '#FF0000' : (isDark ? '#FF6B6B' : '#888')}
              />
              {favorites.length > 0 && (
                <View style={[styles.favoriteBadge, { backgroundColor: '#FF0000' }]}>
                  <Text style={styles.favoriteBadgeText}>{favorites.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.searchContainer, { backgroundColor: colors.cardBg }]}>
          <Ionicons name="search-outline" size={20} color={colors.subText} />
          <TextInput
            placeholder="Buscar tatuadores, estilos ou tags"
            placeholderTextColor={colors.subText}
            style={[styles.searchInput, { color: colors.text }]}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color={colors.subText} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.resultsContainer}>
          <Text style={[styles.resultsText, { color: colors.text }]}>
            {filteredArtists.length} tatuador{filteredArtists.length !== 1 ? 'es' : ''} encontrado{filteredArtists.length !== 1 ? 's' : ''}
          </Text>
          {user && favorites.length > 0 && (
            <TouchableOpacity 
              style={[styles.favoritesButton, { 
                backgroundColor: isDark ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.05)' 
              }]}
              onPress={() => navigation.navigate('Favorites')}>
              <Ionicons name="heart" size={16} color="#FF0000" />
              <Text style={[styles.favoritesText, { color: '#FF0000', marginLeft: 5 }]}>
                {favorites.length} favorito{favorites.length !== 1 ? 's' : ''}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {filteredArtists.length > 0 ? (
          <View style={styles.gridContainer}>
            {filteredArtists.map((artist) => (
              <ArtistCard 
                key={artist.id} 
                artist={artist}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={80} color={colors.subText} />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              {searchText ? 'Nenhum resultado encontrado' : 'Nenhum tatuador disponível'}
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.subText }]}>
              {searchText ? 'Tente buscar por outros termos' : 'Os tatuadores aparecerão aqui quando estiverem cadastrados'}
            </Text>
            {!user && (
              <TouchableOpacity
                style={[styles.loginButton, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginButtonText}>Fazer login para favoritar</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      <BottomTabs currentRoute={'Home'} navigation={navigation} />
    </SafeAreaView>
  );
}