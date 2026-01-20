import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { profileStyles as styles } from '../styles/ProfileStyles';

export const PortfolioCard = ({ imageUri, target = 'ArtistPortfolioDetail', postData }) => {
  const navigation = useNavigation();

  // Obter algumas tags para mostrar no card
  const getPreviewTags = () => {
    if (!postData?.tags || postData.tags.length === 0) return '';
    return postData.tags.slice(0, 2).map(tag => `#${tag}`).join(' ');
  };

  return (
    <TouchableOpacity 
      style={styles.portfolioCard}
      onPress={() => navigation.navigate(target, { post: postData })}
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