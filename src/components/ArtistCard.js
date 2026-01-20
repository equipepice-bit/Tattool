import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { homeStyles as styles } from '../styles/HomeStyles';

export const ArtistCard = ({ artist, onToggleFavorite }) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(artist.isFavorite || false);

  const handleFavoritePress = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (onToggleFavorite) {
      onToggleFavorite(artist.id);
    }
  };

  // Formatar tags para mostrar
  const formatTags = () => {
    if (!artist.tags || artist.tags.length === 0) return 'Estilos variados';
    
    // Pegar apenas as 3 primeiras tags
    const limitedTags = artist.tags.slice(0, 3);
    return limitedTags.map(tag => `#${tag}`).join(', ');
  };

  // Calcular rating médio (você pode implementar sistema de avaliações depois)
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
      onPress={() => navigation.navigate('ArtistProfile', { artistId: artist.id, artist })}
    >
      <View style={styles.cardImageContainer}>
        <Image 
          source={{ uri: artist.foto }} 
          style={styles.cardImage} 
          
        />
        
        {/* Badge de localização */}
        {artist.endereco && (
          <View style={styles.locationBadge}>
            <Ionicons name="location-sharp" size={12} color="#FFF" />
            <Text style={styles.locationText} numberOfLines={1}>
              {artist.endereco.split(',')[0]}
            </Text>
          </View>
        )}
        
        {/* Botão do Coração */}
        <TouchableOpacity 
          style={styles.favoriteBadge} 
          onPress={handleFavoritePress}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color={isFavorite ? "#FF0000" : "#8B0000"} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.artistName} numberOfLines={1}>{artist.name}</Text>
        <Text style={styles.artistStyle} numberOfLines={2}>{formatTags()}</Text>
        {renderStars(artist.rating || 4.5)}
      </View>
    </TouchableOpacity>
  );
};