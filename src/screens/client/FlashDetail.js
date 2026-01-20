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

export default function ArtistFlashDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { flashData, artistId, artistName } = route.params || {};
  
  const { colors, isDark } = useTheme();

  // Use dados do flash ou padrão
  const imageUri = flashData?.foto || IMAGES.FLASH_SNAKE;
  const title = flashData?.title || 'Flash Disponível';
  const size = flashData?.size || 'Aprox. 15-20cm';
  const price = flashData?.price || 'R$ 300,00';
  const tags = flashData?.tags || ['Disponível', 'Preço Fixo'];
  const description = flashData?.description || 'Flash exclusivo disponível para tatuagem imediata.';

  const handleReserve = () => {
    navigation.navigate('Budget', { 
      artistId,
      artistName,
      flashTitle: title,
      flashImage: imageUri
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
        <View style={styles.headerIcons}>
          <Feather name="instagram" size={22} color="#FFF" style={{marginRight: 15}} />
          <Ionicons name="ellipsis-vertical" size={22} color="#FFF" />
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.flashImage} resizeMode="contain" />
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
            <Text style={[styles.detailLabel, { color: colors.subText }]}>Tamanho Sugerido:</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{size}</Text>
            
            <Text style={[styles.detailLabel, { color: colors.subText, marginTop: 10 }]}>Preço:</Text>
            <Text style={[styles.price, { color: colors.text }]}>{price}</Text>
          </View>

          <View style={styles.detailsRight}>
            {tags.map((tag, index) => (
              <Tag key={index} label={tag} />
            ))}
          </View>
        </View>

        <Text style={[styles.description, { color: colors.subText }]}>
          {description}
        </Text>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleReserve}
        >
          <Text style={styles.actionButtonText}>Reservar este Flash</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}