import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { artistFlashDetailStyles as styles } from '../../styles/ArtistFlashDetailStyles';
import { BackButton } from '../../components/BackButton';

export default function ArtistFlashDetail() {
  const route = useRoute();
  const { imageUri } = route.params || {};

  // Estados para edição
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    estilo: '#blackwork',
    tamanho: '20cm',
    valor: 'R$ 500,00'
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton color="#FFF" backgroundColor="#8B0000" />
        <Text style={styles.headerTitle}>Flash{"\n"}Disponível</Text>
      </View>

      {/* Imagem com profundidade */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUri }} style={styles.mainImage} resizeMode="contain" />
        <View style={styles.galleryIcon}>
          <FontAwesome name="image" size={24} color="#5D1010" />
        </View>
      </View>

      {/* Seção Informações */}
      <View style={styles.infoSection}>
        <View style={styles.labelRow}>
          <Text style={styles.infoTitle}>Informações</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <MaterialCommunityIcons 
              name={isEditing ? "check-circle" : "pencil-outline"} 
              size={26} 
              color={isEditing ? "#27ae60" : "#4A148C"} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.chipsContainer}>
          {/* Chip Estilo */}
          <View style={styles.chip}>
            <Text style={styles.chipLabel}>Estilo:</Text>
            {isEditing ? (
              <TextInput 
                style={styles.input} 
                value={details.estilo} 
                onChangeText={(t) => setDetails({...details, estilo: t})}
              />
            ) : (
              <Text style={styles.chipValue}>{details.estilo}</Text>
            )}
          </View>

          {/* Chip Tamanho */}
          <View style={styles.chip}>
            <Text style={styles.chipLabel}>Tamanho:</Text>
            {isEditing ? (
              <TextInput 
                style={styles.input} 
                value={details.tamanho} 
                onChangeText={(t) => setDetails({...details, tamanho: t})}
              />
            ) : (
              <Text style={styles.chipValue}>{details.tamanho}</Text>
            )}
          </View>

          {/* Chip Valor */}
          <View style={styles.chip}>
            <Text style={styles.chipLabel}>Valor:</Text>
            {isEditing ? (
              <TextInput 
                style={styles.input} 
                value={details.valor} 
                onChangeText={(t) => setDetails({...details, valor: t})}
              />
            ) : (
              <Text style={styles.chipValue}>{details.valor}</Text>
            )}
          </View>
        </View>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}