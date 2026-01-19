import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // IMPORT CORRETO
import { Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { artistProfileViewStyles as styles } from '../../styles/ArtistProfileViewStyles';
import { IMAGES } from '../../constants/images';
import { PortfolioCard } from '../../components/PortfolioCard';
import { FlashCard } from '../../components/FlashCard';
import { BackButton } from '../../components/BackButton';

export default function ArtistProfileView() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <LinearGradient
          colors={['#4A148C', '#8B0000', '#5D2510']}
          style={styles.headerGradient}
        >
          <View style={styles.backButtonContainer}>
            <BackButton />
          </View>
        </LinearGradient>

        <View style={styles.profileContent}>
          {/* Top Row: Avatar + Localização */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: -60, paddingHorizontal: 20 }}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: IMAGES.ANA_SILVA }} style={styles.avatar} />
            </View>

            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={18} color="#333" />
              <Text style={styles.locationText}>Quixadá, Ceará</Text>
            </View>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            {/* Nome e botão de edição */}
            <View style={styles.nameRow}>
              <Text style={styles.artistName}>Ana Silva</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ArtistEditProfile')}>
                <MaterialCommunityIcons name="pencil-outline" size={24} color="#5D1010" />
              </TouchableOpacity>
            </View>

            <Text style={styles.handle}>@ana.silva_</Text>

            {/* Redes sociais */}
            <View style={styles.socialRow}>
              <FontAwesome5 name="whatsapp" size={32} color="#333" />
              <FontAwesome5 name="instagram" size={32} color="#333" />
              <FontAwesome5 name="behance" size={32} color="#333" />
            </View>

            <Text style={styles.stylesLabel}>Estilos com que trabalha:</Text>
            <Text style={styles.stylesList}>
              #cybertribal #minimalista #blackwork #cybersigilism
            </Text>

            {/* PORTFÓLIO */}
            <Text style={styles.sectionTitle}>Portfólio</Text>
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 5 }}
            >
              <PortfolioCard imageUri={IMAGES.OCTOPUS_BLACKWORK} target="ArtistPortfolioDetail" />
              <PortfolioCard imageUri={IMAGES.GEOMETRIC_TATTOO} target="ArtistPortfolioDetail" />
            </ScrollView>

            {/* DISPONÍVEIS */}
            <Text style={styles.sectionTitle}>Disponíveis</Text>
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 5 }}
            >
              <FlashCard imageUri={IMAGES.FLASH_SNAKE} target="ArtistFlashDetail" />
              <FlashCard imageUri={IMAGES.FLASH_SKULL} target="ArtistFlashDetail" />
            </ScrollView>

            {/* AVALIAÇÕES */}
            <Text style={styles.sectionTitle}>Avaliações</Text>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.reviewCard}>
                <View style={styles.userAvatar}>
                  <FontAwesome name="user" size={24} color="#FFF" />
                </View>
                <View style={styles.reviewContent}>
                  <Text style={styles.reviewerName}>Fulano de tal</Text>
                  <Text style={styles.reviewText}>
                    Muito boa, vou fazer com ela mais vezes com certeza!!
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}