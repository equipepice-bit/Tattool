import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { portfolioStyles as styles } from '../../styles/PortfolioStyles';
import { IMAGES } from '../../constants/images';
import { BackButton } from '../../components/BackButton';
import { Tag } from '../../components/Tag';
import { useTheme } from '../../context/ThemeContext'; // <--- IMPORTAÇÃO

export default function PortfolioDetail() {
  const route = useRoute();
  const { imageUri } = route.params || { imageUri: IMAGES.OCTOPUS_BLACKWORK };
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />
      
      <View style={{ position: 'absolute', left: 20, top: 40, zIndex: 10 }}>
        <BackButton color="#000" backgroundColor="rgba(255,255,255,0.7)" />
      </View>
      
      <Text style={[styles.mainTitle, { color: colors.text }]}>Trabalho Realizado</Text>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUri }} 
          style={styles.image} 
          resizeMode="cover"
        />
      </View>

      <View style={[styles.content, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Tags do Projeto</Text>
        <View style={styles.tagsRow}>
          <Tag label="Arte Autoral" />
          <Tag label="Finalizado" />
          <Tag label="Blackwork" />
        </View>
        
        <Text style={[styles.description, { color: colors.subText }]}>
          Esta peça foi desenvolvida exclusivamente para o cliente com base em referências geométricas.
        </Text>
      </View>
    </SafeAreaView>
  );
}