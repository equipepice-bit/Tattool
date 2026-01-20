import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { profileStyles as styles } from '../styles/ProfileStyles';

export const PortfolioCard = ({ 
  imageUri, 
  target = 'ArtistPortfolioDetail', 
  postData,
  artistId,
  artistName
}) => {
  const navigation = useNavigation();

  const getPreviewTags = () => {
    if (!postData?.tags || postData.tags.length === 0) return '';
    return postData.tags.slice(0, 2).map(tag => `#${tag}`).join(' ');
  };

  const handlePress = () => {
    // Se tiver artistId e artistName, navega para a tela de detalhes do artista
    if (postData && artistId && artistName) {
      navigation.navigate('ArtistPortfolioDetail', {
        postData,
        artistId,
        artistName
      });
    } 
    // Se não, mantém o comportamento original
    else {
      navigation.navigate(target, { post: postData });
    }
  };

  return (
    <TouchableOpacity 
      style={styles.portfolioCard}
      onPress={handlePress}
    >
      <Image source={{ uri: imageUri || postData?.foto }} style={styles.portfolioImage} />
      {postData?.tags && postData.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsText} numberOfLines={1}>
            {getPreviewTags()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};