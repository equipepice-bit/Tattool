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
  ActivityIndicator,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ref as dbRef, update } from 'firebase/database';

// Importação dos estilos e contextos
import { settingsStyles as styles } from '../../styles/SettingsStyles';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { db } from '../../../firebase';
import { getUserData, saveUserData } from '../../utils/storage';
import { uploadPhotoToCloudinary } from '../../services/cloudinaryApi';

export default function Settings() {
  const navigation = useNavigation();
  const { logout, user: contextUser, updateUserData } = useContext(AuthContext);
  const { isDark, toggleTheme, colors } = useTheme();
  
  // Estados
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [user, setUser] = useState({
    name: '',
    email: '',
    telefone: '',
    endereco: '',
    foto: '',
    userId: '',
  });

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
      
      Alert.alert('Upload', 'Enviando foto...', [], { cancelable: false });
      
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
      
      Alert.alert('✅ Sucesso!', 'Foto atualizada com sucesso!');
      
    } catch (error) {
      console.error('Erro no upload:', error);
      
      // Fallback: Salva localmente se Cloudinary falhar
      Alert.alert(
        '⚠️ Upload falhou',
        'Salvando foto localmente...',
        [{ text: 'OK' }]
      );
      
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

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      console.log('Erro: Função logout não encontrada');
      Alert.alert('Erro', 'Não foi possível fazer logout');
    }
  };

  if (loading && !isEditing && !dropdownOpen) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={isDark ? '#FFF' : '#5D1010'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-undo" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
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
          style={[styles.userCardContainer, { 
            backgroundColor: isDark ? colors.cardBg : '#F3E5F5',
            borderColor: colors.border 
          }]} 
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
              <View style={[styles.defaultAvatar, { backgroundColor: colors.primary }]}>
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
            <Text style={[styles.userName, { 
              color: isDark ? '#FFF' : '#5D1010' 
            }]}>
              {user.name || 'Nome não definido'}
            </Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
              {user.email || 'E-mail não definido'}
            </Text>
          </View>
          
          <Ionicons 
            name={dropdownOpen ? "caret-up" : "caret-down"} 
            size={24} 
            color={colors.primary || '#5D1010'} 
          />
        </TouchableOpacity>

        {/* Dropdown Content */}
        {dropdownOpen && (
          <View style={[styles.dropdownContainer, { 
            backgroundColor: colors.cardBg,
            borderColor: colors.border 
          }]}>
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
                  <Ionicons name="create-outline" size={18} color={colors.primary || '#5D1010'} />
                  <Text style={[styles.editButtonText, { color: colors.primary || '#5D1010' }]}>
                    Editar
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {isEditing ? (
              <View style={styles.editFormContainer}>
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>Nome Completo</Text>
                  <TextInput
                    style={[styles.input, { 
                      backgroundColor: colors.inputBg,
                      color: colors.text,
                      borderColor: colors.border 
                    }]}
                    value={user.name}
                    onChangeText={(text) => setUser({...user, name: text})}
                    placeholder="Digite seu nome"
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>E-mail</Text>
                  <TextInput
                    style={[styles.input, { 
                      backgroundColor: colors.inputBg,
                      color: colors.text,
                      borderColor: colors.border 
                    }]}
                    value={user.email}
                    onChangeText={(text) => setUser({...user, email: text})}
                    placeholder="seu@email.com"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={false}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>Telefone</Text>
                  <TextInput
                    style={[styles.input, { 
                      backgroundColor: colors.inputBg,
                      color: colors.text,
                      borderColor: colors.border 
                    }]}
                    value={user.telefone}
                    onChangeText={(text) => setUser({...user, telefone: text})}
                    placeholder="(00) 00000-0000"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>Endereço</Text>
                  <TextInput
                    style={[styles.input, styles.textArea, { 
                      backgroundColor: colors.inputBg,
                      color: colors.text,
                      borderColor: colors.border 
                    }]}
                    value={user.endereco}
                    onChangeText={(text) => setUser({...user, endereco: text})}
                    placeholder="Digite seu endereço completo"
                    placeholderTextColor={colors.textSecondary}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>

                <TouchableOpacity 
                  style={[styles.photoButton, { borderColor: colors.primary || '#5D1010' }]}
                  onPress={handleUpdatePhoto}
                  disabled={uploadingPhoto}
                >
                  {uploadingPhoto ? (
                    <ActivityIndicator size="small" color={colors.primary || '#5D1010'} />
                  ) : (
                    <>
                      <Ionicons name="camera" size={20} color={colors.primary || '#5D1010'} />
                      <Text style={[styles.photoButtonText, { color: colors.primary || '#5D1010' }]}>
                        Alterar Foto
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Ionicons name="person-outline" size={20} color={colors.primary || '#5D1010'} />
                  <Text style={[styles.infoLabel, { color: colors.text }]}>Nome:</Text>
                  <Text style={[styles.infoText, { color: colors.text }]}>
                    {user.name || 'Não definido'}
                  </Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="mail-outline" size={20} color={colors.primary || '#5D1010'} />
                  <Text style={[styles.infoLabel, { color: colors.text }]}>E-mail:</Text>
                  <Text style={[styles.infoText, { color: colors.text }]}>
                    {user.email || 'Não definido'}
                  </Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="call-outline" size={20} color={colors.primary || '#5D1010'} />
                  <Text style={[styles.infoLabel, { color: colors.text }]}>Telefone:</Text>
                  <Text style={[styles.infoText, { color: colors.text }]}>
                    {user.telefone || 'Não definido'}
                  </Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={20} color={colors.primary || '#5D1010'} />
                  <Text style={[styles.infoLabel, { color: colors.text }]}>Endereço:</Text>
                  <Text style={[styles.infoText, { color: colors.text }]}>
                    {user.endereco || 'Não definido'}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        <View style={{ flex: 1 }} />
      </ScrollView>

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
            trackColor={{ false: '#767577', true: colors.primary || '#5D1010' }}
            thumbColor={isDark ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
        
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        {/* Botão Sair */}
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={[styles.menuText, { color: colors.text }]}>Sair...</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ height: 20 }} />
    </SafeAreaView>
  );
}