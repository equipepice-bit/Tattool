import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { homeStyles as styles } from '../styles/HomeStyles';

export const ArtistCard = ({ artist }) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <TouchableOpacity 
      style={styles.cardContainer} 
      onPress={() => navigation.navigate('ArtistProfile', { artist })}
    >
      <View>
        <Image source={{ uri: artist.image }} style={styles.cardImage} />
        
        {/* Botão do Coração */}
        <TouchableOpacity 
          style={styles.favoriteBadge} 
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={18} 
            color={isFavorite ? "#FF0000" : "#8B0000"} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.artistStyle} numberOfLines={1}>{artist.styles}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome 
              key={i} 
              name="star" 
              size={12} 
              color={i < artist.rating ? "#FFD700" : "#CCC"} 
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};