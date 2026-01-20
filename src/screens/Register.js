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
  ActivityIndicator,
  FlatList
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { auth, db } from "../../firebase";
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
  const [telefone, setTelefone] = useState('');
  const [foto, setFoto] = useState('');
  const [endereco, setEndereco] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Função para adicionar uma tag
  const addTag = () => {
    if (!currentTag.trim()) return;
    
    const tagTrimmed = currentTag.trim().toLowerCase();
    
    // Verificar se a tag já existe
    if (tags.includes(tagTrimmed)) {
      Alert.alert('Aviso', 'Esta tag já foi adicionada');
      setCurrentTag('');
      return;
    }
    
    // Limitar o número de tags
    if (tags.length >= 10) {
      Alert.alert('Limite', 'Máximo de 10 tags permitidas');
      return;
    }
    
    setTags([...tags, tagTrimmed]);
    setCurrentTag('');
  };

  // Função para remover uma tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Função para adicionar tag ao pressionar Enter
  const handleTagInputSubmit = () => {
    addTag();
  };

  // Função para adicionar múltiplas tags separadas por vírgula
  const addMultipleTags = () => {
    if (!currentTag.trim()) return;
    
    const tagsArray = currentTag
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);
    
    const uniqueTags = [...new Set(tagsArray)];
    const availableSlots = 10 - tags.length;
    
    if (uniqueTags.length > availableSlots) {
      Alert.alert('Limite', `Você pode adicionar apenas mais ${availableSlots} tags`);
      return;
    }
    
    // Filtrar tags que não estão na lista atual
    const newTags = uniqueTags.filter(tag => !tags.includes(tag));
    
    if (newTags.length === 0) {
      Alert.alert('Aviso', 'Todas as tags já foram adicionadas');
      setCurrentTag('');
      return;
    }
    
    setTags([...tags, ...newTags]);
    setCurrentTag('');
  };

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

    // Validação específica para Tattoo Artist
    if (role === 'Tattoo Artist') {
      if (!endereco.trim()) {
        Alert.alert('Erro', 'Por favor, insira seu endereço');
        return;
      }
      
      if (tags.length === 0) {
        Alert.alert('Erro', 'Por favor, adicione pelo menos uma tag (estilo de tatuagem)');
        return;
      }
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      try {
        const userData = { 
          uid: userCredential.user.uid,
          email, 
          name, 
          role, 
          telefone, 
          foto, 
          favoritos: [],
          createdAt: new Date().toISOString() 
        };

        if (role === 'Tattoo Artist') {
          userData.endereco = endereco;
          userData.tags = tags;
          userData.flashes = [];
          userData.posts = [];
        }

        await set(ref(db, `users/${user.uid}`), userData);
      } catch (dbErr) {
        console.warn('Erro ao salvar no Realtime DB:', dbErr);
        Alert.alert('Aviso', 'Conta criada, mas houve um erro ao salvar informações adicionais');
      }

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      let errorMessage = 'Erro ao criar conta';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este e-mail já está em uso';
          break;
        case 'auth/invalid-email':
          errorMessage = 'E-mail inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'Senha muito fraca';
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderTagItem = ({ item }) => (
    <View style={styles.tagItem}>
      <Text style={styles.tagText}>{item}</Text>
      <TouchableOpacity onPress={() => removeTag(item)}>
        <Ionicons name="close-circle" size={18} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

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
                placeholder="Nome Completo"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                editable={!isLoading}
              />

              <TextInput
                style={styles.input}
                placeholder="Telefone"
                placeholderTextColor="#999"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
                editable={!isLoading}
              />

              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />

              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />

              <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={styles.input}
                enabled={!isLoading}
              >
                <Picker.Item label="Cliente" value="Cliente" />
                <Picker.Item label="Tattoo Artist" value="Tattoo Artist" />
              </Picker>

              {role === 'Tattoo Artist' && (
                <View style={styles.additionalInfoContainer}>
                  
                  <TextInput
                    style={styles.input}
                    placeholder="Endereço do estúdio"
                    placeholderTextColor="#999"
                    value={endereco}
                    onChangeText={setEndereco}
                    editable={!isLoading}
                  />

                  {/* Área de Tags */}
                  <View style={{ marginBottom: 15 }}>
                    <Text style={{ 
                      color: '#5D1010', 
                      marginBottom: 8, 
                      fontWeight: 'bold',
                      fontSize: 14 
                    }}>
                      Estilos de Tatuagem (Tags):
                    </Text>
                    
                    {/* Input para adicionar tags */}
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                      <TextInput
                        style={[styles.input, { flex: 1, marginRight: 10, marginBottom: 0 }]}
                        placeholder="Adicionar tag (ex: tradicional, realismo, geométrica)"
                        placeholderTextColor="#999"
                        value={currentTag}
                        onChangeText={setCurrentTag}
                        onSubmitEditing={handleTagInputSubmit}
                        editable={!isLoading}
                        returnKeyType="done"
                      />
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#5D1010',
                          padding: 12,
                          borderRadius: 8,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        onPress={addTag}
                        disabled={isLoading}
                      >
                        <Ionicons name="add" size={24} color="#FFF" />
                      </TouchableOpacity>
                    </View>

                    {/* Botão para adicionar múltiplas tags */}
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#8B0000',
                        padding: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginBottom: 15
                      }}
                      onPress={addMultipleTags}
                      disabled={isLoading}
                    >
                      <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
                        Adicionar múltiplas tags (separadas por vírgula)
                      </Text>
                    </TouchableOpacity>

                    {/* Lista de tags */}
                    {tags.length > 0 ? (
                      <View style={{ marginBottom: 15 }}>
                        <Text style={{ 
                          color: '#666', 
                          marginBottom: 8,
                          fontSize: 12 
                        }}>
                          {tags.length} tag(s) adicionada(s) - {10 - tags.length} restante(s)
                        </Text>
                        
                        <FlatList
                          data={tags}
                          renderItem={renderTagItem}
                          keyExtractor={(item, index) => index.toString()}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={{ maxHeight: 40 }}
                          contentContainerStyle={{ paddingRight: 10 }}
                        />
                      </View>
                    ) : (
                      <Text style={{ 
                        color: '#999', 
                        fontStyle: 'italic',
                        textAlign: 'center',
                        marginBottom: 15
                      }}>
                        Nenhuma tag adicionada ainda
                      </Text>
                    )}

                   
                  </View>
                </View>
              )}

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
                disabled={isLoading}
              >
                <Text style={styles.signupText}>JÁ TENHO CONTA - LOGIN</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.bottomSpacer} />

          </KeyboardAvoidingView>
        </ScrollView>

        {/* Loading Overlay */}
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
                Criando sua Conta...
              </Text>
            </View>
          </View>
        )}

      </SafeAreaView>
    </LinearGradient>
  );
}