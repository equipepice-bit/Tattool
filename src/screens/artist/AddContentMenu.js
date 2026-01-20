import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddContentMenu = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <LinearGradient
        colors={['#4A148C', '#8B0000', '#5D2510']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Adicionar Conteúdo</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.subtitle}>O que você deseja adicionar?</Text>
        
        <View style={styles.buttonsContainer}>
          {/* Botão para Adicionar Flash */}
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('AddFlash')}
          >
            <LinearGradient
              colors={['#8B0000', '#5D1010']}
              style={styles.cardGradient}
            >
              <MaterialIcons name="flash-on" size={50} color="#FFF" />
              <Text style={styles.cardTitle}>Adicionar Flash</Text>
              <Text style={styles.cardDescription}>
                Tatuagens prontas para escolha rápida
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Botão para Adicionar Post */}
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('AddPost')}
          >
            <LinearGradient
              colors={['#4A148C', '#5D1010']}
              style={styles.cardGradient}
            >
              <Ionicons name="images" size={50} color="#FFF" />
              <Text style={styles.cardTitle}>Adicionar ao Portfólio</Text>
              <Text style={styles.cardDescription}>
                Mostre seu trabalho no portfólio
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Botão Voltar */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#5D1010" />
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 180,
    marginBottom: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5D1010',
    width: '60%',
  },
  backButtonText: {
    fontSize: 16,
    color: '#5D1010',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AddContentMenu;