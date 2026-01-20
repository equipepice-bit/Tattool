import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importação dos estilos
import { settingsStyles as styles } from '../../styles/SettingsStyles';

// Importação dos Contextos
import { useTheme } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext'; // <--- Importando o Auth

export default function Settings() {
  const navigation = useNavigation();

  // 1. Pegamos o tema
  const { isDark, toggleTheme, colors } = useTheme();

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (logout) {
      logout(); // Isso reseta o userType para null e volta pra tela de Login
    } else {
      console.log('Erro: Função logout não encontrada');
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-undo" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          Configurações
        </Text>
      </View>

      {/* Seção do Usuário */}
      <TouchableOpacity
        style={[
          styles.userCardContainer,
          {
            backgroundColor: isDark ? colors.cardBg : '#F3E5F5',
            borderColor: colors.border,
          },
        ]}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          }}
          style={styles.userImage}
        />
        <Text style={[styles.userName, { color: isDark ? '#FFF' : '#30009C' }]}>
          Carolina
        </Text>
        <Ionicons name="caret-down" size={16} color={colors.text} />
      </TouchableOpacity>

      {/* Espaçador */}
      <View style={styles.spacer} />

      {/* Menu Inferior */}
      <View style={[styles.bottomMenu, { backgroundColor: colors.cardBg }]}>
        {/* Switch de Tema */}
        <View style={styles.menuItem}>
          <Text style={[styles.menuText, { color: colors.text }]}>
            Modo Escuro
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#8B0000' }}
            thumbColor={isDark ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Botão Sair - Agora chama handleLogout */}
        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <Text style={[styles.menuText, { color: colors.text }]}>Sair...</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
