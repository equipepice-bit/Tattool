import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ArtistCard } from '../../components/ArtistCard';
import { IMAGES } from '../../constants/images';
import { homeStyles as styles } from '../../styles/HomeStyles';
import { COLORS } from '../../theme/colors';
import BottomTabs from '../../components/BottomTabs';
import { useTheme } from '../../context/ThemeContext'; // <--- CONEXÃO COM O TEMA

const ARTISTS = [
  {
    id: 1,
    name: 'Ana Silva',
    styles: 'Minimalistas, Old School',
    rating: 5,
    image: IMAGES.ANA_SILVA,
  },
  {
    id: 2,
    name: 'Luan Pereira',
    styles: 'Realismo, Retratos',
    rating: 4,
    image: IMAGES.LUAN_PEREIRA,
  },
  {
    id: 3,
    name: 'Renata Alves',
    styles: 'Blackwork, Geek',
    rating: 5,
    image: IMAGES.RENATA_ALVES,
  },
  {
    id: 4,
    name: 'Francisco Cents',
    styles: 'Geek, New School',
    rating: 4,
    image: IMAGES.FRANCISCO_CENTS,
  },
];

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const [searchText, setSearchText] = useState('');

  // Pegamos as cores do tema
  const { colors, isDark } = useTheme();

  const filteredArtists = ARTISTS.filter((artist) => {
    const nameMatch = artist.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const styleMatch = artist.styles
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return nameMatch || styleMatch;
  });

  return (
    // Fundo da tela muda conforme o tema
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colors.statusBarStyle}
        backgroundColor={colors.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={[
                styles.logo,
                {
                  width: 45, // Define o novo tamanho maior aqui
                  height: 45, // Define o novo tamanho maior aqui
                  tintColor: isDark ? '#FFF' : undefined, // Mantém a sua lógica de cor original
                },
              ]}
              resizeMode="contain"
            />
            {/* Cor do Texto Tattool */}
            <Text
              style={[
                styles.logoText,
                { color: isDark ? '#FFF' : styles.logoText.color },
              ]}>
              Tattool
            </Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Settings')}>
              {/* Ícone de configurações muda para branco no escuro */}
              <Ionicons
                name="settings-outline"
                size={24}
                color={isDark ? '#FFF' : COLORS.logoText}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Busca (Fundo e Texto adaptáveis) */}
        <View
          style={[styles.searchContainer, { backgroundColor: colors.cardBg }]}>
          <Ionicons name="search-outline" size={20} color={colors.subText} />
          <TextInput
            placeholder="Buscar tatuadores ou estilos"
            placeholderTextColor={colors.subText}
            style={[styles.searchInput, { color: colors.text }]}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Grid de Artistas */}
        <View style={styles.gridContainer}>
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </View>
      </ScrollView>

      {/* Navegação Inferior */}
      <BottomTabs currentRoute={route.name} navigation={navigation} />
    </SafeAreaView>
  );
}
