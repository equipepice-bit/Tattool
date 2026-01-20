import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StatusBar, 
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ref as dbRef, update } from 'firebase/database';

// Importação dos estilos e contexto
import { settingsStyles as styles } from '../../styles/SettingsStyles';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../../firebase';
import { getUserData, saveUserData } from '../../utils/storage';

import { uploadPhotoToCloudinary } from '../../services/cloudinaryApi';

export default function ArtistSettings() {
  const navigation = useNavigation();
  const { logout, user: contextUser, updateUserData } = useContext(AuthContext);
  
  // Estados
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    telefone: '',
    endereco: '',
    foto: '',
    userId: '',
  });
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Carregar dados do usuário
  useEffect(() => {
    loadUserData();
  }, []);

  // Atualizar quando contexto mudar
  useEffect(() => {
    if (contextUser) {
      setUser(prev => ({
        ...prev,
        name: contextUser.name || '',
        email: contextUser.email || '',
        telefone: contextUser.telefone || '',
        endereco: contextUser.endereco || '',
        foto: contextUser.foto || '',
        userId: contextUser.uid || '',
      }));
    }
  }, [contextUser]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const userData = await getUserData();
      if (userData) {
        setUser({
          name: userData.name || '',
          email: userData.email || '',
          telefone: userData.telefone || '',
          endereco: userData.endereco || '',
          foto: userData.foto || '',
          userId: userData.uid || '',
        });
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para escolher foto
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        await handlePhotoSelect(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao escolher imagem:', error);
      Alert.alert('Erro', 'Não foi possível escolher a imagem');
    }
  };

  // Função para tirar foto
  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        await handlePhotoSelect(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Alert.alert('Erro', 'Não foi possível tirar a foto');
    }
  };

  // Função para lidar com a foto selecionada
  const handlePhotoSelect = async (imageUri) => {
  if (!user.userId) {
    Alert.alert('Erro', 'Usuário não identificado');
    return;
  }

  try {
    setUploadingPhoto(true);
    
    Alert.alert('Upload', 'Enviando para Cloudinary...', [], { cancelable: false });
    
    // 1. Fazer upload para Cloudinary
    const cloudinaryResult = await uploadPhotoToCloudinary(imageUri, user.userId);
    
    // 2. Atualizar estado local com a URL do Cloudinary
    const updatedUser = { 
      ...user, 
      foto: cloudinaryResult.url 
    };
    setUser(updatedUser);
    
    // 3. Salvar no Firebase
    const userRef = dbRef(db, `users/${user.userId}`);
    await update(userRef, {
      foto: cloudinaryResult.url,
      fotoPublicId: cloudinaryResult.publicId,
      fotoUpdatedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    // 4. Atualizar storage local
    await saveUserData(updatedUser);
    
    // 5. Atualizar contexto
    if (updateUserData) {
      await updateUserData({ 
        foto: cloudinaryResult.url,
        fotoPublicId: cloudinaryResult.publicId,
      });
    }
    
    Alert.alert('✅ Sucesso!', 'Foto salva no Cloudinary!');
    
  } catch (error) {
    console.error('Erro no upload:', error);
    
    // Fallback: Salva localmente se Cloudinary falhar
    Alert.alert(
      '⚠️ Cloudinary falhou',
      'Salvando foto localmente...',
      [{ text: 'OK' }]
    );
    
    // Fallback para local
    const updatedUser = { ...user, foto: imageUri };
    setUser(updatedUser);
    
    const userRef = dbRef(db, `users/${user.userId}`);
    await update(userRef, {
      fotoLocalURI: imageUri,
      photoUpdatedAt: new Date().toISOString(),
    });
    
    await saveUserData(updatedUser);
    
    if (updateUserData) {
      await updateUserData({ foto: imageUri });
    }
    
  } finally {
    setUploadingPhoto(false);
  }
};

  const handleUpdatePhoto = () => {
    Alert.alert(
      'Alterar Foto',
      'Escolha uma opção:',
      [
        { 
          text: 'Tirar Foto', 
          onPress: takePhoto 
        },
        { 
          text: 'Escolher da Galeria', 
          onPress: pickImage 
        },
        { 
          text: 'Cancelar', 
          style: 'cancel' 
        }
      ]
    );
  };

  const handleSave = async () => {
    if (!user.name.trim() || !user.email.trim()) {
      Alert.alert('Erro', 'Nome e e-mail são obrigatórios');
      return;
    }

    try {
      setLoading(true);
      
      // Atualizar no Firebase
      if (user.userId) {
        const userRef = dbRef(db, `users/${user.userId}`);
        
        const updates = {
          name: user.name,
          email: user.email,
          telefone: user.telefone || '',
          endereco: user.endereco || '',
          updatedAt: new Date().toISOString(),
        };
        
        await update(userRef, updates);
      }
      
      // Atualizar AsyncStorage
      await saveUserData(user);
      
      // Atualizar contexto
      if (updateUserData) {
        await updateUserData(user);
      }
      
      Alert.alert('✅ Sucesso', 'Dados atualizados com sucesso!');
      setDropdownOpen(false);
      setIsEditing(false);
      
    } catch (error) {
      console.error('Erro ao salvar:', error);
      Alert.alert('❌ Erro', 'Não foi possível salvar as alterações');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    loadUserData();
    setDropdownOpen(false);
    setIsEditing(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    if (dropdownOpen) {
      setIsEditing(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  if (loading && !isEditing && !dropdownOpen) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#5D1010" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-undo" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: 'serif' }]}>
          Configurações
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card do Usuário */}
        <TouchableOpacity 
          style={styles.userCardContainer} 
          activeOpacity={0.7}
          onPress={toggleDropdown}
        >
          <View style={styles.userImageContainer}>
            {user.foto ? (
              <Image 
                source={{ uri: user.foto }} 
                style={styles.userImage} 
              />
            ) : (
              <View style={styles.defaultAvatar}>
                <Ionicons name="person" size={40} color="#FFF" />
              </View>
            )}
            {uploadingPhoto && (
              <View style={styles.uploadingOverlay}>
                <ActivityIndicator size="small" color="#FFF" />
              </View>
            )}
          </View>
          
          <View style={styles.userInfoContainer}>
            <Text style={[styles.userName, { color: '#5D1010' }]}>
              {user.name || 'Nome não definido'}
            </Text>
            <Text style={styles.userEmail}>
              {user.email || 'E-mail não definido'}
            </Text>
          </View>
          
          <Ionicons 
            name={dropdownOpen ? "caret-up" : "caret-down"} 
            size={24} 
            color="#5D1010" 
          />
        </TouchableOpacity>

        {/* Dropdown Content */}
        {dropdownOpen && (
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdownHeader}>
              {isEditing ? (
                <>
                  <TouchableOpacity 
                    style={[styles.dropdownButton, styles.cancelButton]} 
                    onPress={handleCancel}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.dropdownButton, styles.saveButton]} 
                    onPress={handleSave}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <Text style={styles.saveButtonText}>Salvar</Text>
                    )}
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity 
                  style={[styles.dropdownButton, styles.editButton]} 
                  onPress={toggleEditMode}
                >
                  <Ionicons name="create-outline" size={18} color="#5D1010" />
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
              )}
            </View>

            {isEditing ? (
              <View style={styles.editFormContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Nome Completo</Text>
                  <TextInput
                    style={styles.input}
                    value={user.name}
                    onChangeText={(text) => setUser({...user, name: text})}
                    placeholder="Digite seu nome"
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>E-mail</Text>
                  <TextInput
                    style={styles.input}
                    value={user.email}
                    onChangeText={(text) => setUser({...user, email: text})}
                    placeholder="seu@email.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={false}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Telefone</Text>
                  <TextInput
                    style={styles.input}
                    value={user.telefone}
                    onChangeText={(text) => setUser({...user, telefone: text})}
                    placeholder="(00) 00000-0000"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Endereço</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={user.endereco}
                    onChangeText={(text) => setUser({...user, endereco: text})}
                    placeholder="Digite seu endereço completo"
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>

                <TouchableOpacity 
                  style={styles.photoButton}
                  onPress={handleUpdatePhoto}
                  disabled={uploadingPhoto}
                >
                  {uploadingPhoto ? (
                    <ActivityIndicator size="small" color="#5D1010" />
                  ) : (
                    <>
                      <Ionicons name="camera" size={20} color="#5D1010" />
                      <Text style={styles.photoButtonText}>Alterar Foto</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Ionicons name="person-outline" size={20} color="#5D1010" />
                  <Text style={styles.infoLabel}>Nome:</Text>
                  <Text style={styles.infoText}>{user.name || 'Não definido'}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="mail-outline" size={20} color="#5D1010" />
                  <Text style={styles.infoLabel}>E-mail:</Text>
                  <Text style={styles.infoText}>{user.email || 'Não definido'}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="call-outline" size={20} color="#5D1010" />
                  <Text style={styles.infoLabel}>Telefone:</Text>
                  <Text style={styles.infoText}>{user.telefone || 'Não definido'}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={20} color="#5D1010" />
                  <Text style={styles.infoLabel}>Endereço:</Text>
                  <Text style={styles.infoText}>{user.endereco || 'Não definido'}</Text>
                </View>
              </View>
            )}
          </View>
        )}

        <View style={{ flex: 1 }} />
      </ScrollView>

      {/* Menu Inferior */}
      <View style={styles.bottomMenu}>
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
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <Text style={styles.menuText}>Sair...</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ height: 20 }} />
    </SafeAreaView>
  );
}