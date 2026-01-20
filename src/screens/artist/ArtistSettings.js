import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Importação dos estilos e contexto
import { settingsStyles as styles } from '../../styles/SettingsStyles';
import { AuthContext } from '../../context/AuthContext';
import { IMAGES } from '../../constants/images';

export default function ArtistSettings() {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  
  // Estado para o tema (apenas visual por enquanto)
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-undo" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: 'serif' }]}>Configurações</Text>
      </View>

      <TouchableOpacity style={styles.userCardContainer} activeOpacity={0.7}>
        <Image 
          source={{ uri: IMAGES.ANA_SILVA }} 
          style={styles.userImage} 
        />
        <Text style={[styles.userName, { color: '#4A148C' }]}>Ana Silva</Text>
        <Ionicons name="caret-down" size={18} color="#333" />
      </TouchableOpacity>

      {/* Espaçador para empurrar o menu para o rodapé */}
      <View style={{ flex: 1 }} />

      {/* 3. Menu Inferior Estilizado (Card Branco) */}
      <View style={styles.bottomMenu}>
        
        {/* Item: Tema */}
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => setIsDarkMode(!isDarkMode)}
        >
          <Text style={styles.menuText}>Tema</Text>
          <Ionicons 
            name={isDarkMode ? "moon" : "moon-outline"} 
            size={24} 
            color="#000" 
          />
        </TouchableOpacity>
        
        {/* Linha Divisória */}
        <View style={styles.divider} />
        
        {/* Item: Sair */}
        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <Text style={styles.menuText}>Sair...</Text>
        </TouchableOpacity>
      </View>
      
      {/* Espaço extra no final para não colar na borda física */}
      <View style={{ height: 20 }} />
    </SafeAreaView>
  );
}