// FlashCard2.js - Nova versão sem conflitos
import React from 'react';
import { 
  TouchableOpacity, 
  Image, 
  View, 
  Text,
  StyleSheet 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const FlashCard2 = ({ 
  imageUri, 
  target = 'ArtistFlashDetail', 
  flashData,
  artistId,
  artistName,
  onPress, // Prop opcional para controle manual
  style, // Estilo personalizado
  imageStyle, // Estilo personalizado para a imagem
  showInfo = true // Controla se mostra as informações de tamanho e valor
}) => {
  const navigation = useNavigation();

  const formatValue = () => {
    if (!flashData?.valor) return 'R$ 0,00';
    const valor = parseFloat(flashData.valor);
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };

  const handlePress = () => {
    // Se tiver onPress personalizado, usa ele
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
      navigation.navigate(target, { 
        flash: flashData || { 
          foto: imageUri,
          ...flashData 
        } 
      });
    }
  };

  // Se não tiver imagem, não renderiza o card
  if (!imageUri && (!flashData || !flashData.foto)) {
    return (
      <View style={[styles.flashCard, styles.emptyCard, style]}>
        <Text style={styles.emptyText}>Sem imagem</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity 
      style={[styles.flashCard, style]}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: imageUri || flashData?.foto }} 
        style={[styles.flashImage, imageStyle]}
        resizeMode="cover"
      />
      
      {showInfo && flashData && (
        <View style={styles.flashInfoContainer}>
          {flashData?.tamanho && (
            <Text style={styles.flashSize} numberOfLines={1}>
              {flashData.tamanho}
            </Text>
          )}
          {flashData?.valor && (
            <Text style={styles.flashValue} numberOfLines={1}>
              {formatValue()}
            </Text>
          )}
        </View>
      )}
      
      {/* Indicador de favorito (opcional) */}
      {flashData?.isFavorite && (
        <View style={styles.favoriteIndicator}>
          <Text style={styles.favoriteText}>♥</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Estilos locais para maior flexibilidade
const styles = StyleSheet.create({
  flashCard: {
    width: 120,
    height: 150,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  flashImage: {
    width: '100%',
    height: '100%',
  },
  flashInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flashSize: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  flashValue: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  emptyCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  emptyText: {
    color: '#999',
    fontSize: 12,
    fontStyle: 'italic',
  },
  favoriteIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteText: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

// Componente wrapper para compatibilidade com o estilo antigo
export const FlashCardCompatible = (props) => {
  return <FlashCard2 {...props} />;
};