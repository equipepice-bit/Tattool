// ArtistFlashDetail.js
import React from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { flashStyles as styles } from '../../styles/FlashStyles';
import { IMAGES } from '../../constants/images';
import { BackButton } from '../../components/BackButton';
import { Tag } from '../../components/Tag';
import { useTheme } from '../../context/ThemeContext';

export default function FlashDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { flashData, artistId, artistName } = route.params || {};
  
  const { colors, isDark } = useTheme();

  // Usar dados REAIS do flash ou padrão
  const imageUri = flashData?.foto || IMAGES.FLASH_SNAKE;
  const title = 'Flash Disponível'; // Título fixo ou pode ser dinâmico
  const size = flashData?.tamanho || 'Tamanho não informado'; // Usar campo real
  const valor = flashData?.valor || 0; // Usar campo real
  const tags = flashData?.tags || ['Disponível']; // Usar tags reais
  const description = flashData?.description || 'Flash exclusivo disponível para tatuagem imediata.';

  // Formatar o valor para R$
  const formatPrice = () => {
    const valorNum = parseFloat(valor) || 0;
    return `R$ ${valorNum.toFixed(2).replace('.', ',')}`;
  };

  const handleReserve = () => {
    navigation.navigate('Budget', { 
      artistId,
      artistName,
      flashTitle: title,
      flashImage: imageUri,
      flashPrice: valor
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#8B0000" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BackButton backgroundColor="transparent" color={isDark ? colors.text : "#FFF"} />
          <Text style={[styles.headerTitle, { color: "#FFF" }]}>{title}</Text>
        </View>

      </View>

      {/* Container da imagem - CENTRALIZADA */}
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image 
            source={{ uri: imageUri }} 
            style={styles.flashImage} 
            resizeMode="contain" 
          />
        </View>
      </View>

      {artistName && (
        <View style={styles.artistInfo}>
          <Text style={[styles.artistText, { color: colors.text }]}>
            Flash do artista: {artistName}
          </Text>
        </View>
      )}

      <View style={[styles.infoSection, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>Detalhes do Flash</Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.detailsLeft}>
            <Text style={[styles.detailLabel, { color: colors.subText }]}>Tamanho:</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{size}</Text>
            
            <Text style={[styles.detailLabel, { color: colors.subText, marginTop: 10 }]}>Preço:</Text>
            <Text style={[styles.price, { color: colors.text }]}>{formatPrice()}</Text>
          </View>

          <View style={styles.detailsRight}>
            {/* Tags reais do flash */}
            {tags && tags.length > 0 ? (
              tags.map((tag, index) => (
                <Tag key={index} label={tag} />
              ))
            ) : (
              <Tag label="Disponível" />
            )}
          </View>
        </View>

        <Text style={[styles.description, { color: colors.subText }]}>
          {description}
        </Text>

      
      </View>
    </SafeAreaView>
  );
}