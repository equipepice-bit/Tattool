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
  Switch // <--- Adicionei o Switch se quiser usar igual ao do cliente, ou manter o botão
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ref as dbRef, update } from 'firebase/database';

// Importação dos estilos e contexto
import { settingsStyles as styles } from '../../styles/SettingsStyles';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext'; // <--- 1. IMPORTAR TEMA
import { db } from '../../../firebase'; // Ajuste o caminho conforme sua estrutura
import { getUserData, saveUserData } from '../../utils/storage';
import { uploadPhotoToCloudinary } from '../../services/cloudinaryApi';

export default function ArtistSettings() {
  const navigation = useNavigation();
  const { logout, user: contextUser, updateUserData } = useContext(AuthContext);
  
  // 2. USAR O TEMA GLOBAL
  const { isDark, toggleTheme, colors } = useTheme(); 
  
  // Estados (Removi o isDarkMode local)
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
    console.log('ArtistSettings - Dados carregados:', userData);
    
    if (userData) {
      setUser({
        name: userData.name || '',
        email: userData.email || '',
        telefone: userData.telefone || '',
        endereco: userData.endereco || '',
        foto: userData.foto || '',
        userId: userData.uid || '', // 🔥 USA uid DO userData
        role: userData.role || ''
      });
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    Alert.alert('Erro', 'Não foi possível carregar dados do usuário');
  } finally {
    setLoading(false);
  }
};

  // ... (MANTIVE AS FUNÇÕES DE FOTO E UPLOAD IGUAIS PARA NÃO QUEBRAR A LÓGICA) ...
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
      console.error(error);
    }
  };

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
      console.error(error);
    }
  };

  const handlePhotoSelect = async (imageUri) => {
    if (!user.userId) { Alert.alert('Erro', 'Usuário não identificado'); return; }
    try {
      setUploadingPhoto(true);
      Alert.alert('Upload', 'Enviando para Cloudinary...', [], { cancelable: false });
      
      const cloudinaryResult = await uploadPhotoToCloudinary(imageUri, user.userId);
      const updatedUser = { ...user, foto: cloudinaryResult.url };
      setUser(updatedUser);
      
      const userRef = dbRef(db, `users/${user.userId}`);
      await update(userRef, {
        foto: cloudinaryResult.url,
        fotoPublicId: cloudinaryResult.publicId,
        fotoUpdatedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      
      await saveUserData(updatedUser);
      if (updateUserData) await updateUserData({ foto: cloudinaryResult.url });
      Alert.alert('✅ Sucesso!', 'Foto salva!');
    } catch (error) {
      console.error('Erro no upload:', error);
      Alert.alert('⚠️ Erro', 'Salvando localmente...');
      const updatedUser = { ...user, foto: imageUri };
      setUser(updatedUser);
      await saveUserData(updatedUser);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleUpdatePhoto = () => {
    Alert.alert('Alterar Foto', 'Escolha uma opção:', [
      { text: 'Tirar Foto', onPress: takePhoto },
      { text: 'Escolher da Galeria', onPress: pickImage },
      { text: 'Cancelar', style: 'cancel' }
    ]);
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
    
    // 🔥 ATUALIZAR AsyncStorage CORRETAMENTE
    const userData = await getUserData(); // Pega dados atuais
    const updatedUserData = {
      ...userData, // Mantém todos os dados existentes
      uid: user.userId, // Garante que uid está presente
      name: user.name,
      email: user.email,
      telefone: user.telefone || '',
      endereco: user.endereco || '',
      foto: user.foto || '',
      // Mantém outros campos como role, etc.
    };
    
    await saveUserData(updatedUserData);
    
    // Atualizar contexto se existir
    if (updateUserData) await updateUserData(updatedUserData);
    
    Alert.alert('✅ Sucesso', 'Dados atualizados!', [
      { 
        text: 'OK',
        onPress: () => {
          setDropdownOpen(false);
          setIsEditing(false);
          // 🔥 Recarrega os dados para garantir sincronização
          loadUserData();
        }
      }
    ]);
    
  } catch (error) {
    console.error('Erro ao salvar:', error);
    Alert.alert('❌ Erro', 'Não foi possível salvar');
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
    if (dropdownOpen) setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  if (loading && !isEditing && !dropdownOpen) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.text} />
      </SafeAreaView>
    );
  }

  // --- RENDERIZAÇÃO ---
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />

      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-undo" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text, fontFamily: 'serif' }]}>
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
          style={[
            styles.userCardContainer, 
            { 
              backgroundColor: isDark ? colors.cardBg : '#F3E5F5', 
              borderColor: colors.border,
              borderWidth: isDark ? 1 : 0
            }
          ]} 
          activeOpacity={0.7}
          onPress={toggleDropdown}
        >
          <View style={styles.userImageContainer}>
            {user.foto ? (
              <Image source={{ uri: user.foto }} style={styles.userImage} />
            ) : (
              <View style={[styles.defaultAvatar, { backgroundColor: isDark ? '#444' : '#CCC' }]}>
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
            <Text style={[styles.userName, { color: isDark ? '#FFF' : '#5D1010' }]}>
              {user.name || 'Nome não definido'}
            </Text>
            <Text style={[styles.userEmail, { color: isDark ? '#CCC' : '#666' }]}>
              {user.email || 'E-mail não definido'}
            </Text>
          </View>
          
          <Ionicons 
            name={dropdownOpen ? "caret-up" : "caret-down"} 
            size={24} 
            color={colors.text} 
          />
        </TouchableOpacity>

        {/* Dropdown Content */}
        {dropdownOpen && (
          <View style={[
            styles.dropdownContainer, 
            { backgroundColor: isDark ? colors.cardBg : '#FFF', padding: 15, borderRadius: 10, marginTop: 10 }
          ]}>
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
                  style={[styles.dropdownButton, styles.editButton, { borderColor: colors.border }]} 
                  onPress={toggleEditMode}
                >
                  <Ionicons name="create-outline" size={18} color={colors.text} />
                  <Text style={[styles.editButtonText, { color: colors.text }]}>Editar</Text>
                </TouchableOpacity>
              )}
            </View>

            {isEditing ? (
              <View style={styles.editFormContainer}>
                {/* Campos de Edição Adaptados ao Dark Mode */}
                {[
                  { label: 'Nome Completo', val: user.name, key: 'name', ph: 'Digite seu nome' },
                  { label: 'E-mail', val: user.email, key: 'email', ph: 'seu@email.com', locked: true },
                  { label: 'Telefone', val: user.telefone, key: 'telefone', ph: '(00) 00000-0000', type: 'phone-pad' },
                ].map((field) => (
                  <View key={field.key} style={styles.inputContainer}>
                    <Text style={[styles.inputLabel, { color: colors.text }]}>{field.label}</Text>
                    <TextInput
                      style={[
                        styles.input, 
                        { 
                          backgroundColor: isDark ? '#333' : '#FFF', 
                          color: colors.text,
                          borderColor: colors.border,
                          borderWidth: 1
                        }
                      ]}
                      value={field.val}
                      onChangeText={(text) => setUser({...user, [field.key]: text})}
                      placeholder={field.ph}
                      placeholderTextColor={colors.subText}
                      keyboardType={field.type || 'default'}
                      autoCapitalize="none"
                      editable={!field.locked}
                    />
                  </View>
                ))}

                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>Endereço</Text>
                  <TextInput
                    style={[
                      styles.input, 
                      styles.textArea,
                      { 
                        backgroundColor: isDark ? '#333' : '#FFF', 
                        color: colors.text,
                        borderColor: colors.border,
                        borderWidth: 1
                      }
                    ]}
                    value={user.endereco}
                    onChangeText={(text) => setUser({...user, endereco: text})}
                    placeholder="Digite seu endereço completo"
                    placeholderTextColor={colors.subText}
                    multiline
                    numberOfLines={3}
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
                {/* Visualização de Info Adaptada */}
                {[
                  { icon: "person-outline", label: "Nome:", val: user.name },
                  { icon: "mail-outline", label: "E-mail:", val: user.email },
                  { icon: "call-outline", label: "Telefone:", val: user.telefone },
                  { icon: "location-outline", label: "Endereço:", val: user.endereco },
                ].map((item, index) => (
                  <View key={index} style={styles.infoRow}>
                    <Ionicons name={item.icon} size={20} color={colors.text} />
                    <Text style={[styles.infoLabel, { color: colors.text }]}>{item.label}</Text>
                    <Text style={[styles.infoText, { color: colors.subText }]}>{item.val || 'Não definido'}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        <View style={{ flex: 1 }} />
      </ScrollView>

      {/* Menu Inferior */}
      <View style={[styles.bottomMenu, { backgroundColor: colors.cardBg }]}>
        <View style={styles.menuItem}>
          <Text style={[styles.menuText, { color: colors.text }]}>Modo Escuro</Text>
          {/* Agora usamos o toggleTheme global */}
          <Switch 
            value={isDark} 
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: "#8B0000" }}
            thumbColor={isDark ? "#f4f3f4" : "#f4f3f4"}
          />
        </View>
        
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <Text style={[styles.menuText, { color: colors.text }]}>Sair...</Text>
          <Ionicons name="log-out-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={{ height: 20 }} />
    </SafeAreaView>
  );
}