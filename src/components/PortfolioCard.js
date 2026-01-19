import React from 'react';
import { TouchableOpacity, Image } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { profileStyles as styles } from '../styles/ProfileStyles';

export const PortfolioCard = ({ imageUri, target = 'PortfolioDetail' }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(target, { imageUri })}>
      <Image source={{ uri: imageUri }} style={styles.portfolioImage} />
    </TouchableOpacity>
  );
};