import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { profileStyles as styles } from '../styles/ProfileStyles';

export const FlashCard = ({ imageUri, target = 'FlashDetail' }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(target, { imageUri })}>
      <Image source={{ uri: imageUri }} style={styles.flashImage} />
    </TouchableOpacity>
  );
};