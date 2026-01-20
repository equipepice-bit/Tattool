import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { profileStyles as styles } from '../../styles/ProfileStyles';
import { IMAGES } from '../../constants/images';
import { BackButton } from '../../components/BackButton';
import { PortfolioCard } from '../../components/PortfolioCard';
import { FlashCard } from '../../components/FlashCard';
import { useTheme } from '../../context/ThemeContext'; // <--- IMPORTAÇÃO

export default function ArtistProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { artist } = route.params || {};
  
  // Pegamos as cores do tema
  const { colors, isDark } = useTheme();

  return (
    // Fundo dinâmico
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" translucent />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <LinearGradient colors={['#E8C5B0', '#8B0000', '#4A148C']} style={styles.gradientHeader}>
            <View style={{ marginLeft: 20, marginTop: 40 }}>
              <BackButton backgroundColor="rgba(0,0,0,0.3)" />
            </View>
          </LinearGradient>
        </View>

        <View style={styles.profileInfoContainer}>
          <View style={[styles.profileImageBorder, { borderColor: colors.cardBg }]}> 
            <Image source={{ uri: artist?.image || IMAGES.ANA_SILVA }} style={styles.profileImage} />
          </View>
          
          {/* Textos dinâmicos */}
          <Text style={[styles.name, { color: colors.text }]}>{artist?.name || 'Artista'}</Text>
          <Text style={[styles.tagsText, { color: colors.subText }]}>{artist?.styles}</Text>

          <TouchableOpacity 
            style={styles.budgetButton}
            onPress={() => navigation.navigate('Budget', { artistName: artist?.name })}
          >
            <Text style={styles.budgetBtnText}>Solicitar Orçamento</Text>
          </TouchableOpacity>
        </View>

        {/* Títulos das Seções dinâmicos */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Portfólio</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.portfolioScroll}>
            <PortfolioCard imageUri={IMAGES.OCTOPUS_BLACKWORK} />
            <PortfolioCard imageUri={IMAGES.GEOMETRIC_TATTOO} />
        </ScrollView>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Flashs Disponíveis</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.flashScroll}>
            <FlashCard imageUri={IMAGES.FLASH_SNAKE} />
            <FlashCard imageUri={IMAGES.FLASH_SKULL} />
        </ScrollView>
        
        <View style={{ height: 30 }} />

      </ScrollView>
    </View>
  );
}