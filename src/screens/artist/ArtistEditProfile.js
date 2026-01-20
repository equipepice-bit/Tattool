import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { settingsStyles as styles } from '../../styles/SettingsStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ArtistEditProfile() {
  const navigation = useNavigation();
  
  // Estados para os campos (depois ligaremos ao banco)
  const [name, setName] = useState('Ana Silva');
  const [bio, setBio] = useState('Tatuadora especializada em traços finos e botânica.');
  const [specialties, setSpecialties] = useState('Fineline, Blackwork');

  return (
    <View style={[styles.container, { backgroundColor: '#F9F7FF' }]}>
      {/* Header Reutilizando estilo das Settings */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Foto de Perfil */}
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1594069811326-0be65746369c?q=80&w=200' }} 
            style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#4A148C' }} 
          />
          <TouchableOpacity style={{ marginTop: 10 }}>
            <Text style={{ color: '#4A148C', fontWeight: 'bold' }}>Alterar Foto</Text>
          </TouchableOpacity>
        </View>

        {/* Inputs */}
        <View style={{ gap: 20 }}>
          <View>
            <Text style={{ color: '#4A0404', fontWeight: 'bold', marginBottom: 8 }}>Nome Profissional</Text>
            <TextInput 
              style={{ backgroundColor: '#FFF', borderRadius: 10, padding: 15, borderWidth: 1, borderColor: '#DDD' }}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View>
            <Text style={{ color: '#4A0404', fontWeight: 'bold', marginBottom: 8 }}>Bio / Descrição</Text>
            <TextInput 
              style={{ backgroundColor: '#FFF', borderRadius: 10, padding: 15, borderWidth: 1, borderColor: '#DDD', height: 100 }}
              multiline
              value={bio}
              onChangeText={setBio}
            />
          </View>

          <View>
            <Text style={{ color: '#4A0404', fontWeight: 'bold', marginBottom: 8 }}>Estilos (separados por vírgula)</Text>
            <TextInput 
              style={{ backgroundColor: '#FFF', borderRadius: 10, padding: 15, borderWidth: 1, borderColor: '#DDD' }}
              value={specialties}
              onChangeText={setSpecialties}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={{ backgroundColor: '#4A148C', borderRadius: 25, padding: 18, alignItems: 'center', marginTop: 40 }}
          onPress={() => {
            alert('Perfil atualizado!');
            navigation.goBack();
          }}
        >
          <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}