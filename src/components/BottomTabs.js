import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones padrão do Expo

const BottomTabs = ({ currentRoute, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        
        {/* Botão Home */}
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons 
            name={currentRoute === 'Home' ? "home" : "home-outline"} 
            size={32} 
            color="#5D0000" // Cor aproximada do vinho da logo
          />
        </TouchableOpacity>

        {/* Botão Favoritos */}
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => navigation.navigate('Favorites')}
        >
          <Ionicons 
            name={currentRoute === 'Favorites' ? "heart" : "heart-outline"} 
            size={32} 
            color="#5D0000"
          />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30, // Levanta um pouco da borda inferior como no design
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#F3EFFF', // Tom lilás bem claro do fundo da barra
    width: '100%',
    height: 70,
    borderRadius: 35, // Deixa as pontas totalmente arredondadas
    justifyContent: 'space-around',
    alignItems: 'center',
    // Sombra para dar profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tabButton: {
    padding: 10,
  }
});

export default BottomTabs;