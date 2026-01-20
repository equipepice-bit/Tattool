import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context'; // adicionar em todas as páginas

import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { loginStyles as styles } from '../styles/LoginStyles';
import { AuthContext } from '../context/AuthContext';

import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();
  const [userRole, setUserRole] = useState('');
  const { loginAsClient, loginAsArtist } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Autenticar usuário
      console.log('Autenticando usuário...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuário autenticado:', user.uid);
      
      // 2. Buscar o papel (role) do usuário no Realtime Database
      console.log('Buscando role do usuário no database...');
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);
      
      if (!snapshot.exists()) {
        console.log('Usuário não encontrado no database');
        Alert.alert('Erro', 'Usuário não encontrado no banco de dados');
        return;
      }
      
      const userData = snapshot.val();

      try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        console.log('Dados do usuário salvos no AsyncStorage');
      } catch (storageError) {
        console.error('Erro ao salvar no AsyncStorage:', storageError);
      }

      const userRole = userData.role;
      console.log('Role encontrado:', userRole);
      
      // 3. Atualizar o contexto com o role
      if (setUserRole) {
        setUserRole(userRole);
      }
      
      // 4. Redirecionar para a tela correta baseada no role
      console.log('Redirecionando baseado no role:', userRole);
      
      // Normaliza o role para comparação
      const normalizedRole = userRole?.toLowerCase() || '';
      
      if (normalizedRole.includes('cliente') || normalizedRole.includes('client')) {
        loginAsClient()
      } else if (normalizedRole.includes('tattoo') || normalizedRole.includes('artist')) {
        loginAsArtist();
      } else {
        // Se não reconhecer o role, vai para uma tela genérica
        console.warn('Role não reconhecido:', userRole);
        navigation.navigate('Home');
      }
      
    } catch (error) {
      console.error('Erro no login:', error);
      
      let errorMessage = 'Erro ao fazer login';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuário não encontrado';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Senha incorreta';
          break;
        case 'auth/invalid-email':
          errorMessage = 'E-mail inválido';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Erro de conexão. Verifique sua internet';
          break;
        default:
          errorMessage = error.message || 'Erro desconhecido';
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#4A148C', '#43000a', '#5D2510']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.contentContainer}
        >

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
  
            <Text style={styles.title}>Tattool</Text>
          </View>

          {/* Card do Formulário */}
          <View style={styles.card}>

            <TextInput
              style={[styles.input, isLoading && { opacity: 0.7 }]}
              placeholder="E-mail"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />

            <TextInput
              style={[styles.input, isLoading && { opacity: 0.7 }]}
              placeholder="Senha"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />

            {/* Botão de Login */}
            <TouchableOpacity
              style={[
                styles.loginButton, 
                isLoading && styles.disabledButton,
                { marginTop: 20 }
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>ENTRAR</Text>
              )}
            </TouchableOpacity>
   

            {/* Cadastro */}
            <TouchableOpacity 
              onPress={() => navigation.navigate('Register')}
              style={{ marginTop: 15 }}
              disabled={isLoading}
            >
              <Text style={styles.signupText}>
                Não tem uma conta? <Text style={styles.signupLink}>CADASTRE-SE</Text>
              </Text>
            </TouchableOpacity>

          </View>

          {/* Divisor
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OU</Text>
            <View style={styles.divider} />
          </View> */}

          {/* Login com Google
          <TouchableOpacity 
            style={[styles.googleButton, isLoading && styles.disabledButton]}
            disabled={isLoading}
          >
            <AntDesign name="google" size={20} color="#FFF" />
            <Text style={styles.googleText}>Login com Google</Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacer} /> */}

        </KeyboardAvoidingView>
        {isLoading && (
                  <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                  }}>
                    <View style={{
                      backgroundColor: '#FFF',
                      padding: 30,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <ActivityIndicator size="large" color="#5D1010" />
                      <Text style={{ marginTop: 15, fontSize: 16, color: '#5D1010' }}>
                        Fazendo Login...
                      </Text>
                    </View>
                  </View>
                )}
      </SafeAreaView>
    </LinearGradient>
  );
}