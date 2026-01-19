import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { auth,db } from "../../firebase";
import { ref, set } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { loginStyles as styles } from '../styles/LoginStyles';

import { Picker } from '@react-native-picker/picker';

export default function Register() {
  const navigation = useNavigation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Cliente');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {  
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu nome');
      return;
    }
    
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail');
      return;
    }
    
    if (!password || password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      try {
        await set(ref(db, `users/${user.uid}`), { email, name, role });
      } catch (dbErr) {
        console.warn('Erro ao salvar no Realtime DB:', dbErr);
      }

      Alert.alert('Sucesso', 'Usuário registrado');
      navigation.navigate('Login')
    } catch (error) {
      Alert.alert('Erro', error.message);
      
    }finally{
       setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#4A148C', '#8B0000', '#5D2510']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.contentContainer}
          >
            
            {/* Botão Voltar */}
            <TouchableOpacity 
              style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 10 }}
              onPress={() => navigation.goBack()}
              disabled={isLoading}
            >
              <Ionicons name="arrow-back" size={30} color="#FFF" />
            </TouchableOpacity>

            {/* Título */}
            <View style={[styles.logoContainer, { marginBottom: 20 }]}>
              <Text style={[styles.title, { fontSize: 32 }]}>Criar Conta</Text>
            </View>

            {/* Card do Formulário */}
            <View style={styles.card}>
              
              <TextInput
                style={styles.input}
                placeholder="Nome Completo:"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />

              <TextInput
                style={styles.input}
                placeholder="E-mail:"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Senha:"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={styles.input}
              >
                <Picker.Item label="Cliente" value="Cliente" />
                <Picker.Item label="Tattoo Artist" value="Tattoo Artist" />
              </Picker>

              <TouchableOpacity
                style={[
                  styles.loginButton, 
                  isLoading && { opacity: 0.7 }
                ]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.loginButtonText}>CADASTRAR</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{ marginTop: 15 }}
              >
                <Text style={styles.signupText}>JÁ TENHO CONTA - LOGIN</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.bottomSpacer} />

          </KeyboardAvoidingView>
        </ScrollView>
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
              Criando sua conta...
            </Text>
          </View>
        </View>
      )}
      </SafeAreaView>

    </LinearGradient>
  );
}