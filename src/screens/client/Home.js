import React, { useState, useEffect } from 'react';
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

import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ref, get, update } from 'firebase/database';

import { ArtistCard } from '../../components/ArtistCard';
import { IMAGES } from '../../constants/images';
import { homeStyles as styles } from '../../styles/HomeStyles';
import { COLORS } from '../../theme/colors';
import BottomTabs from '../../components/BottomTabs';
import { useTheme } from '../../context/ThemeContext';
import { db } from '../../../firebase';
import { getUserData } from '../../utils/storage';

export default function Home() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [artists, setArtists] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Pegamos as cores do tema
  const { colors, isDark } = useTheme();

  // Carregar dados
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Carregar usuário atual
      const userData = await getUserData();
      setCurrentUser(userData);
      
      if (userData) {
        // Carregar favoritos do usuário
        await loadUserFavorites(userData.uid);
        
        // Carregar todos os tatuadores
        await loadAllArtists(userData.uid);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar os tatuadores');
    } finally {
      setLoading(false);
    }
  };

  // Carregar favoritos do usuário
  const loadUserFavorites = async (userId) => {
    try {
      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setFavorites(userData.favoritos || []);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  // Carregar todos os tatuadores
  const loadAllArtists = async (currentUserId) => {
    try {
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const artistsArray = [];
        
        // Filtrar apenas usuários com role "Tattoo Artist" e que não seja o usuário atual
        Object.keys(usersData).forEach(userId => {
          const user = usersData[userId];
          if (user.role === 'Tattoo Artist' && userId !== currentUserId) {
            artistsArray.push({
              id: userId,
              uid: userId,
              name: user.name || 'Tatuador',
              styles: user.tags ? user.tags.join(', ') : 'Estilos variados',
              rating: 4.5, // Você pode implementar um sistema de avaliações depois
              foto: user.foto || IMAGES.ANA_SILVA,
              tags: user.tags || [],
              endereco: user.endereco || '',
              telefone: user.telefone || '',
              isFavorite: favorites.includes(userId)
            });
          }
        });
        
        setArtists(artistsArray);
      }
    } catch (error) {
      console.error('Erro ao carregar tatuadores:', error);
    }
  };

  // Atualizar quando a tela receber foco
  useFocusEffect(
    React.useCallback(() => {
      loadData();
      return () => {};
    }, [])
  );

  useEffect(() => {
    loadData();
  }, []);

  // Filtrar artistas por busca
  const filteredArtists = artists.filter((artist) => {
    if (!searchText.trim()) return true;
    
    const nameMatch = artist.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    
    const styleMatch = artist.styles
      .toLowerCase()
      .includes(searchText.toLowerCase());
    
    const tagMatch = artist.tags?.some(tag => 
      tag.toLowerCase().includes(searchText.toLowerCase())
    );
    
    return nameMatch || styleMatch || tagMatch;
  });

  // Função para favoritar/desfavoritar
  const handleToggleFavorite = async (artistId) => {
    if (!currentUser?.uid) {
      Alert.alert('Erro', 'Usuário não identificado');
      return;
    }

    try {
      const userRef = ref(db, `users/${currentUser.uid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const userData = snapshot.val();
        let updatedFavorites = [...(userData.favoritos || [])];
        
        if (updatedFavorites.includes(artistId)) {
          // Remover dos favoritos
          updatedFavorites = updatedFavorites.filter(id => id !== artistId);
        } else {
          // Adicionar aos favoritos
          updatedFavorites.push(artistId);
        }
        
        // Atualizar no Firebase
        await update(userRef, { favoritos: updatedFavorites });
        
        // Atualizar estado local
        setFavorites(updatedFavorites);
        
        // Atualizar lista de artistas
        setArtists(prevArtists => 
          prevArtists.map(artist => ({
            ...artist,
            isFavorite: updatedFavorites.includes(artist.id)
          }))
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os favoritos');
    }
  };

  // Componente de loading
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} backgroundColor={colors.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}>
        {/* Header */}
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
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Settings')}>
              <Ionicons
                name="settings-outline"
                size={24}
                color={isDark ? '#FFF' : COLORS.logoText}
              />
            </TouchableOpacity>
            
            {/* Botão para favoritos */}
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Favorites')}>
              <Ionicons
                name="heart"
                size={24}
                color={isDark ? '#FF6B6B' : '#FF0000'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Busca */}
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

        {/* Contador de resultados */}
        <View style={styles.resultsContainer}>
          <Text style={[styles.resultsText, { color: colors.text }]}>
            {filteredArtists.length} tatuador{filteredArtists.length !== 1 ? 'es' : ''} encontrado{filteredArtists.length !== 1 ? 's' : ''}
          </Text>
          {favorites.length > 0 && (
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
              <Text style={[styles.favoritesText, { color: '#FF0000' }]}>
                {favorites.length} favorito{favorites.length !== 1 ? 's' : ''}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Grid de Artistas */}
        {filteredArtists.length > 0 ? (
          <View style={styles.gridContainer}>
            {filteredArtists.map((artist) => (
              <ArtistCard 
                key={artist.id} 
                artist={artist}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={80} color={colors.subText} />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              Nenhum tatuador encontrado
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.subText }]}>
              {searchText ? 'Tente buscar por outros termos' : 'Os tatuadores aparecerão aqui'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Navegação Inferior */}
      <BottomTabs currentRoute={'Home'} navigation={navigation} />
    </SafeAreaView>
  );
}