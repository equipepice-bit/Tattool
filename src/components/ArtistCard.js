import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { homeStyles as styles } from '../styles/HomeStyles';
import { getUserData } from '../utils/storage';

export const ArtistCard = ({ artist, onToggleFavorite }) => {
  const navigation = useNavigation();

  const handleFavoritePress = async () => {
    const userData = await getUserData();
    if (!userData || !userData.uid) {
      Alert.alert(
        'Login necessário',
        'Faça login para favoritar artistas',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Fazer login', onPress: () => navigation.navigate('Login') }
        ]
      );
      return;
    }

    try {
      if (onToggleFavorite) {
        await onToggleFavorite(artist.id);
      }
    } catch (error) {
      console.error('Erro ao favoritar:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os favoritos');
    }
  };

  const formatTags = () => {
    if (!artist.tags || artist.tags.length === 0) return 'Estilos variados';
    const limitedTags = artist.tags.slice(0, 3);
    return limitedTags.map(tag => `#${tag}`).join(', ');
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <View style={styles.ratingContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesome 
            key={`full-${i}`} 
            name="star" 
            size={12} 
            color="#FFD700" 
          />
        ))}
        
        {hasHalfStar && (
          <FontAwesome 
            name="star-half-full" 
            size={12} 
            color="#FFD700" 
          />
        )}
        
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <FontAwesome 
            key={`empty-${i}`} 
            name="star-o" 
            size={12} 
            color="#CCC" 
          />
        ))}
      </View>
    );
  };

  return (
    <TouchableOpacity 
      style={styles.cardContainer} 
      onPress={() => navigation.navigate('ArtistProfile', { 
        artistId: artist.id, 
        artist 
      })}
    >
      <View style={styles.cardImageContainer}>
        <Image 
          source={{ uri: artist.foto }} 
          style={styles.cardImage} 
        />
        
        <TouchableOpacity 
          style={styles.favoriteBadge} 
          onPress={handleFavoritePress}
        >
          <Ionicons 
            name={artist.isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color={artist.isFavorite ? "#FF0000" : "#8B0000"} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.artistName} numberOfLines={1}>{artist.name}</Text>
        <Text style={styles.artistStyle} numberOfLines={2}>{formatTags()}</Text>
      </View>
    </TouchableOpacity>
  );
};