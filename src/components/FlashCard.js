// FlashCard.js - Versão compatível
import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { profileStyles as styles } from '../styles/ProfileStyles';

export const FlashCard = ({ 
  imageUri, 
  target = 'ArtistFlashDetail', 
  flashData,
  artistId,
  artistName,
  onPress // Prop opcional para controle manual
}) => {
  const navigation = useNavigation();

  const formatValue = () => {
    if (!flashData?.valor) return 'R$ 0,00';
    const valor = parseFloat(flashData.valor);
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };

  const handlePress = () => {
    // Se tiver onPress personalizado, usa ele
    if (onPress) {
      onPress();
      return;
    }
    
    // Se tiver dados do artista, navega para a tela detalhada
    if (flashData && artistId && artistName) {
      navigation.navigate('ArtistFlashDetail', {
        flashData,
        artistId,
        artistName
      });
    } 
    // Se não, mantém o comportamento original
    else {
      navigation.navigate(target, { flash: flashData || { foto: imageUri } });
    }
  };

  return (
    <TouchableOpacity 
      style={styles.flashCard}
      onPress={handlePress}
    >
      <Image source={{ uri: imageUri || flashData?.foto }} style={styles.flashImage} />
      <View style={styles.flashInfoContainer}>
        {flashData?.tamanho && (
          <Text style={styles.flashSize}>{flashData.tamanho}</Text>
        )}
        {flashData?.valor && (
          <Text style={styles.flashValue}>{formatValue()}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};