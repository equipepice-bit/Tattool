import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { artistPortfolioDetailStyles as styles } from '../../styles/ArtistPortfolioDetailStyles';
import { BackButton } from '../../components/BackButton';

export default function ArtistPortfolioDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUri } = route.params || {};

  // Estados para edição
  const [description, setDescription] = useState('Lula em blackwork, com sombreamento denso e direção de luz marcada');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton color="#FFF" backgroundColor="#8B0000" />
        <Text style={styles.headerTitle}>Portfólio</Text>
      </View>

      {/* Imagem com moldura estilizada */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUri }} style={styles.mainImage} resizeMode="cover" />
        <View style={styles.galleryIcon}>
          <Ionicons name="images" size={20} color="#333" />
        </View>
      </View>

      {/* Seção Descrição */}
      <View style={styles.contentSection}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Descrição do trabalho</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <MaterialCommunityIcons 
              name={isEditing ? "check-circle" : "pencil-outline"} 
              size={24} 
              color={isEditing ? "#27ae60" : "#4A148C"} 
            />
          </TouchableOpacity>
        </View>

        {isEditing ? (
          <TextInput
            style={[styles.descriptionText, { borderBottomWidth: 1, borderColor: '#4A148C', paddingBottom: 5 }]}
            value={description}
            onChangeText={setDescription}
            multiline
            autoFocus
          />
        ) : (
          <Text style={styles.descriptionText}>{description}</Text>
        )}

        {/* Seção Tags */}
        <Text style={styles.tagsTitle}>Tags</Text>
        <View style={styles.tagsContainer}>
          <TouchableOpacity style={styles.tagChip}>
            <Text style={styles.tagText}>Blackwork</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tagChip}>
            <Text style={styles.tagText}>Arte autoral</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}