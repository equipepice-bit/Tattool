import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  RefreshControl,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ref, get, update } from 'firebase/database';

import { BackButton } from '../../components/BackButton';
import BottomTabs from '../../components/BottomTabs';
import { favoritesStyles as styles } from '../../styles/FavoritesStyles';
import { useTheme } from '../../context/ThemeContext';
import { getUserData } from '../../utils/storage';
import { database } from '../../../firebase';

import { RTDBService } from '../../services/RTDBService';

export default function Favorites() {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = useCallback(async (userId) => {
    try {
      const data = await RTDBService.getUserFavorites(userId);
      setFavorites(data);
    } catch (e) {
      console.error(e);
      setFavorites([]);
    }
  }, []);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const userData = await getUserData();
      setUser(userData);
      
      if (userData && userData.uid) {
        await loadFavorites(userData.uid);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error('Erro geral ao carregar dados:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [loadFavorites]);

  useFocusEffect(
    useCallback(() => {
      loadData();
      return () => {};
    }, [loadData])
  );

  const onRefresh = async () => {
    if (!user || !user.uid) {
      return;
    }
    
    setRefreshing(true);
    try {
      await loadFavorites(user.uid);
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleRemoveFavorite = async (artistId, artistName) => {
  if (!user || !user.uid) {
    Alert.alert('Erro', 'Usuário não identificado');
    return;
  }
  
  Alert.alert(
    'Remover dos favoritos',
    `Deseja remover ${artistName || 'este artista'} dos seus favoritos?`,
    [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Remover', 
        style: 'destructive',
        onPress: async () => {
          try {
            // Método simples: recarrega tudo do Firebase
            const userRef = ref(database, `users/${user.uid}`);
            const userSnap = await get(userRef);
            
            if (userSnap.exists()) {
              const userData = userSnap.val();
              let favoritesArray = userData.favoritos || [];
              
              // Remove o ID
              const index = favoritesArray.indexOf(artistId);
              if (index > -1) {
                favoritesArray.splice(index, 1);
              }
              
              // Salva no Firebase
              await update(userRef, { favoritos: favoritesArray });
              
              // Recarrega os favoritos do Firebase
              setTimeout(async () => {
                const updatedFavorites = await RTDBService.getUserFavorites(user.uid);
                setFavorites(updatedFavorites);
              }, 300);
              
              Alert.alert('Sucesso', 'Artista removido dos favoritos');
            }
          } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível remover');
          }
        }
      }
    ]
  );
};
  const handleRequestBudget = (artist) => {
    if (!user) {
      Alert.alert(
        'Login necessário',
        'Faça login para solicitar orçamentos',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Fazer login', onPress: () => navigation.navigate('Login') }
        ]
      );
      return;
    }
    
    navigation.navigate('BudgetRequest', { artist });
  };

  const handleViewArtistProfile = (artist) => {
    navigation.navigate('ArtistProfile', { 
      artistId: artist.uid || artist.id,
      artist
    });
  };

  const renderArtistImage = (artist) => {
    if (artist?.foto && artist.foto.trim() !== '') {
      return (
        <Image 
          source={{ uri: artist.foto }} 
          style={styles.artistImage}
        />
      );
    }

    return (
      <View style={[styles.artistImage, styles.defaultAvatar]}>
        <Ionicons
          name="person-circle-outline"
          size={90}
          color="#B0B0B0"
        />
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.favHeader}>
          <Text style={[styles.favTitle, { color: colors.text }]}>Favoritos</Text>
        </View>
        <View style={styles.onlyBackButton}>
          <BackButton color="#FFF" backgroundColor="#5D1010" />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.emptyText, { color: colors.text, marginTop: 20 }]}>
            Carregando favoritos...
          </Text>
        </View>
        <BottomTabs currentRoute="Favorites" navigation={navigation} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.favHeader}>
        <Text style={[styles.favTitle, { color: colors.text }]}>Favoritos</Text>
        {user && favorites.length > 0 && (
          <Text style={[styles.favSubtitle, { color: colors.subText }]}>
            {favorites.length} artista{favorites.length !== 1 ? 's' : ''}
          </Text>
        )}
      </View>

      <View style={styles.onlyBackButton}>
        <BackButton color="#FFF" backgroundColor="#5D1010" />
      </View>

      {!user ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="person-outline" size={80} color={colors.subText} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            Faça login para ver seus favoritos
          </Text>
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>Fazer login</Text>
          </TouchableOpacity>
        </View>
      ) : favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color={colors.subText} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            Nenhum artista favoritado ainda
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.subText }]}>
            Toque no coração nos artistas para adicioná-los aqui
          </Text>
          <TouchableOpacity
            style={[styles.exploreButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Home')}>
            <Ionicons name="search" size={20} color="#FFF" />
            <Text style={styles.exploreButtonText}>Explorar Artistas</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.primary || '#7E57C2']}
                tintColor={colors.primary || '#7E57C2'}
              />
            }
          >
            {favorites.map((artist, index) => (
              <TouchableOpacity
                key={artist.uid || artist.id || index}
                style={[styles.cardHorizontal, { 
                  backgroundColor: colors.cardBg, 
                  borderColor: colors.border, 
                  borderWidth: isDark ? 1 : 0 
                }]}
                onPress={() => handleViewArtistProfile(artist)}
                activeOpacity={0.7}
              >
                <View style={styles.imageContainer}>
                  {renderArtistImage(artist)}
                  <TouchableOpacity 
                    style={styles.heartIcon}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(artist.uid || artist.id, artist.name);
                    }}
                  >
                    <Ionicons name="heart" size={18} color="#FF0000" />
                  </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                  <Text style={[styles.artistName, { color: colors.text }]}>
                    {artist.name || 'Artista'}
                  </Text>
                  
                  <Text style={[styles.artistStyles, { color: colors.subText }]}>
                    {artist.styles || 
                    (Array.isArray(artist.tags) ? 
                      artist.tags.slice(0, 3).map(tag => `#${tag}`).join(', ') : 
                      'Estilos variados')}
                  </Text>
                  
                  <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <Ionicons 
                        key={s} 
                        name="star" 
                        size={14} 
                        color={s <= (artist.rating || 5) ? "#FFD700" : "#CCC"} 
                      />
                    ))}
                    <Text style={[styles.ratingNumber, { color: colors.text }]}>
                      {artist.rating || '5.0'}
                    </Text>
                  </View>

                  <TouchableOpacity 
                    style={styles.budgetButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleRequestBudget(artist);
                    }}
                  >
                    <MaterialCommunityIcons name="feather" size={18} color="#7E57C2" />
                    <Text style={styles.budgetText}>Solicitar Orçamento</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.footerInfo}>
            <Text style={[styles.footerText, { color: colors.subText }]}>
              Arraste para baixo para atualizar
            </Text>
          </View>
        </>
      )}

      <BottomTabs currentRoute="Favorites" navigation={navigation} />
    </SafeAreaView>
  );
}