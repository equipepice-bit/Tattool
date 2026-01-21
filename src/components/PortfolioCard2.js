// PortfolioCard2.js - Nova versão sem conflitos
import React from 'react';
import { 
  TouchableOpacity, 
  Image, 
  View, 
  Text,
  StyleSheet 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const PortfolioCard2 = ({ 
  imageUri, 
  target = 'PortfolioDetail', 
  postData,
  artistId,
  artistName,
  style, // Estilo personalizado
  imageStyle, // Estilo personalizado para a imagem
  showTags = true, // Controla se mostra as tags
  maxTags = 2, // Número máximo de tags a mostrar
  fallbackImage // Imagem de fallback
}) => {
  const navigation = useNavigation();

  const getPreviewTags = () => {
    if (!postData?.tags || !Array.isArray(postData.tags) || postData.tags.length === 0) {
      return '';
    }
    
    const tagsToShow = postData.tags.slice(0, maxTags);
    return tagsToShow.map(tag => `#${tag}`).join(' ');
  };

  // PortfolioCard2.js - Função handlePress completa
const handlePress = () => {
  // Se tiver dados do post e do artista, navega para a tela de detalhes
  if (postData && artistId && artistName) {
    navigation.navigate('PortfolioDetail', {
      postData: postData,           // Dados completos do post/portfólio
      artistId: artistId,           // ID do artista
      artistName: artistName        // Nome do artista
    });
  } 
  // Se não tiver dados do artista, navega apenas com os dados do post
  else if (postData) {
    navigation.navigate(target, { 
      post: postData || { 
        foto: imageUri,
        ...postData 
      } 
    });
  }
  // Se não tiver dados, mostra alerta
  else {
    console.warn('PortfolioCard2: Dados insuficientes para navegação');
  }
};

  // Determina a fonte da imagem
  const imageSource = imageUri || postData?.foto;

  // Se não tiver imagem, mostra um fallback
  if (!imageSource) {
    return (
      <TouchableOpacity 
        style={[styles.portfolioCard, styles.emptyCard, style]}
        activeOpacity={0.7}
      >
        <View style={[styles.portfolioImage, styles.emptyImage, imageStyle]}>
          <Text style={styles.emptyText}>Sem imagem</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const tags = getPreviewTags();

  return (
    <TouchableOpacity 
      style={[styles.portfolioCard, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: imageSource }} 
        style={[styles.portfolioImage, imageStyle]}
        resizeMode="cover"
        defaultSource={fallbackImage}
        onError={(e) => {
          console.log('Erro ao carregar imagem do portfólio:', e.nativeEvent.error);
        }}
      />
      
      {showTags && tags !== '' && (
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsText} numberOfLines={1}>
            {tags}
          </Text>
        </View>
      )}
      
      {/* Indicador de favorito (opcional) */}
      {postData?.isFavorite && (
        <View style={styles.favoriteBadge}>
          <Text style={styles.favoriteIcon}>♥</Text>
        </View>
      )}
      
      {/* Indicador de popularidade (opcional) */}
      {postData?.likesCount > 0 && (
        <View style={styles.likesContainer}>
          <Text style={styles.likesText}>♥ {postData.likesCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Estilos locais para maior flexibilidade
const styles = StyleSheet.create({
  portfolioCard: {
    width: 140,
    height: 180,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  portfolioImage: {
    width: '100%',
    height: '100%',
  },
  tagsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  tagsText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  emptyCard: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteIcon: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  likesContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

// Componente wrapper para compatibilidade com o estilo antigo
export const PortfolioCardCompatible = (props) => {
  return <PortfolioCard2 {...props} />;
};