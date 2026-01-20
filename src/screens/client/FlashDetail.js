import React from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { flashStyles as styles } from '../../styles/FlashStyles';
import { IMAGES } from '../../constants/images';
import { BackButton } from '../../components/BackButton';
import { Tag } from '../../components/Tag';
import { useTheme } from '../../context/ThemeContext'; // <--- IMPORTAÇÃO

export default function FlashDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUri } = route.params || { imageUri: IMAGES.FLASH_SNAKE };
  
  const { colors, isDark } = useTheme(); // <--- TEMA

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#8B0000" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BackButton backgroundColor="transparent" color={isDark ? colors.text : "#FFF"} />
          {/* Se o header tiver fundo escuro fixo (vermelho), o texto deve ser branco. Se for transparente, use colors.text */}
          <Text style={[styles.headerTitle, { color: "#FFF" }]}>Flash Disponível</Text>
        </View>
        <View style={styles.headerIcons}>
          <Feather name="instagram" size={22} color="#FFF" style={{marginRight: 15}} />
          <Ionicons name="ellipsis-vertical" size={22} color="#FFF" />
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.flashImage} resizeMode="contain" />
      </View>

      {/* Seção de Info com fundo adaptável */}
      <View style={[styles.infoSection, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>Detalhes do Flash</Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.detailsLeft}>
            <Text style={[styles.detailLabel, { color: colors.subText }]}>Tamanho Sugerido:</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>Aprox. 15-20cm</Text>
          </View>

          <View style={styles.detailsRight}>
            <Tag label="Disponível" />
            <Tag label="Preço Fixo" />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Budget')}
        >
          <Text style={styles.actionButtonText}>Reservar este Flash</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}