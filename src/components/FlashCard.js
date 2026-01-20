import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { profileStyles as styles } from '../styles/ProfileStyles';

export const FlashCard = ({ imageUri, target = 'ArtistFlashDetail', flashData }) => {
  const navigation = useNavigation();

  // Formatar valor
  const formatValue = () => {
    if (!flashData?.valor) return 'R$ 0,00';
    const valor = parseFloat(flashData.valor);
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };

  return (
    <TouchableOpacity 
      style={styles.flashCard}
      onPress={() => navigation.navigate(target, { flash: flashData })}
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