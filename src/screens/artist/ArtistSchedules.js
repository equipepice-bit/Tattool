import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { artistHomeStyles as styles } from '../../styles/ArtistHomeStyles';

export default function ArtistSchedules() {
  const navigation = useNavigation();
  
  const agendamentos = [
    { id: 1, nome: 'Carlos Souza', data: '18 Out - 14:00', estilo: 'Old School', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, nome: 'Marina Lima', data: '20 Out - 09:30', estilo: 'Fineline', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9F7FF' }}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        
        {/* HEADER COMPLETO IGUAL À HOME */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1594069811326-0be65746369c?q=80&w=200' }} 
            style={styles.profilePic} 
          />
          <View style={styles.headerInfo}>
            <Text style={styles.artistName}>Ana Silva</Text>
            <Text style={styles.artistRole}>Tatuadora Profissional</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Disponível</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ArtistSettings')}>
            <Ionicons name="settings-outline" size={28} color="#4A148C" />
          </TouchableOpacity>
        </View>

        {/* SETA E TÍTULO */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={[styles.artistName, { marginLeft: 15 }]}>Meus Agendamentos</Text>
        </View>

        {/* LISTA DE CARDS */}
        {agendamentos.map(item => (
          <View key={item.id} style={localStyles.card}>
            <Image source={{ uri: item.img }} style={localStyles.img} />
            <View>
              <Text style={localStyles.nome}>{item.nome}</Text>
              <Text style={localStyles.info}>{item.data} • {item.estilo}</Text>
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  card: { 
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 20, 
    marginBottom: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1.5, 
    borderColor: '#D1C4E9',
    elevation: 2,
    shadowColor: '#4A148C',
    shadowOpacity: 0.1,
  },
  img: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#4A148C' },
  info: { color: '#666', fontSize: 13 }
});