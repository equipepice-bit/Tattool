import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { artistHomeStyles as styles } from '../../styles/ArtistHomeStyles';
import { BackButton } from '../../components/BackButton';

export default function ArtistReviews() {
  const reviews = [
    { id: 1, autor: 'Juliana', nota: 5, comentario: 'Trabalho impecável, voltarei com certeza!' },
    { id: 2, autor: 'Roberto', nota: 4, comentario: 'Muito talentosa, traço bem firme.' },
  ];

  return (
    <View style={styles.container}>
      {/* Botão Voltar igual ao cliente */}
      <View style={{ marginTop: 50, marginBottom: 10 }}>
        <BackButton />
      </View>

      <Text style={[styles.artistName, { marginBottom: 20 }]}>Avaliações</Text>
      
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {reviews.map(rev => (
          <View key={rev.id} style={{ backgroundColor: '#FFF', padding: 15, borderRadius: 20, marginBottom: 15, borderWidth: 1, borderColor: '#D1C4E9' }}>
            <Text style={{ fontWeight: 'bold', color: '#4A148C' }}>{rev.autor}</Text>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              {[...Array(5)].map((_, i) => (
                <FontAwesome key={i} name="star" size={14} color={i < rev.nota ? "#FFD700" : "#CCC"} />
              ))}
            </View>
            <Text style={{ color: '#444' }}>{rev.comentario}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}