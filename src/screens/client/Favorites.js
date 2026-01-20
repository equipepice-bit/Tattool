import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import BottomTabs from '../../components/BottomTabs';
import { favoritesStyles as styles } from '../../styles/FavoritesStyles';
import { IMAGES } from '../../constants/images';
import { useTheme } from '../../context/ThemeContext'; // <--- IMPORTAÇÃO

const FAVORITOS = [
  { id: 1, name: 'Ana Silva', styles: 'Minimalistas, Old School', rating: 5, image: IMAGES.ANA_SILVA },
  { id: 3, name: 'Renata Alves', styles: 'Blackwork, Geek', rating: 5, image: IMAGES.RENATA_ALVES },
];

export default function Favorites() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors, isDark } = useTheme(); // <--- TEMA

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      
      <View style={styles.favHeader}>
        <Text style={[styles.favTitle, { color: colors.text }]}>Favoritos</Text>
      </View>

      <View style={styles.onlyBackButton}>
        <BackButton color="#FFF" backgroundColor="#5D1A0E" />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FAVORITOS.map(artist => (
          <View key={artist.id} style={[styles.cardHorizontal, { backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: isDark ? 1 : 0 }]}>
            
            <View style={styles.imageContainer}>
              <Image source={artist.image} style={styles.artistImage} />
              <View style={styles.heartIcon}>
                <Ionicons name="heart" size={18} color="#4A148C" />
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.artistName, { color: colors.text }]}>{artist.name}</Text>
              <Text style={[styles.artistStyles, { color: colors.subText }]}>{artist.styles}</Text>
              
              <View style={styles.starsContainer}>
                {[1,2,3,4,5].map(s => (
                  <Ionicons key={s} name="star" size={14} color="#FFD700" />
                ))}
                <Text style={[styles.ratingNumber, { color: colors.text }]}>5</Text>
              </View>

              <TouchableOpacity style={styles.budgetButton}>
                <MaterialCommunityIcons name="feather" size={18} color="#7E57C2" />
                <Text style={styles.budgetText}>Orçamento</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* BottomTabs precisa receber as cores se ele não estiver adaptado internamente. 
          Se BottomTabs for um componente seu, verifique se ele precisa de ajustes. 
          Normalmente ele fica sobre o fundo, então ok. */}
      <BottomTabs currentRoute={route.name} navigation={navigation} />
    </SafeAreaView>
  );
}