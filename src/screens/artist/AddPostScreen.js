import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  StatusBar,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { AuthContext } from '../../context/AuthContext';
import { addPost } from '../../services/firebaseContentService';

import { getUserData } from '../../utils/storage';

const AddPostScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const loadUserData = async () => {
    const userData = await getUserData();
    if (userData) {
      setUser(userData);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  
  const [postData, setPostData] = useState({
    foto: '',
    descricao: '',
    tags: [],
  });

  // Selecionar foto (mesma função do Flash)
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setPostData({ ...postData, foto: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Erro ao escolher imagem:', error);
      Alert.alert('Erro', 'Não foi possível escolher a imagem');
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setPostData({ ...postData, foto: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Alert.alert('Erro', 'Não foi possível tirar a foto');
    }
  };

  const handleUpdatePhoto = () => {
    Alert.alert(
      'Selecionar Foto',
      'Escolha uma opção:',
      [
        { text: 'Tirar Foto', onPress: takePhoto },
        { text: 'Escolher da Galeria', onPress: pickImage },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  // Gerenciar tags (mesma função do Flash)
  const addTag = () => {
    if (!currentTag.trim()) return;
    
    const tagTrimmed = currentTag.trim().toLowerCase();
    
    if (postData.tags.includes(tagTrimmed)) {
      Alert.alert('Aviso', 'Esta tag já foi adicionada');
      setCurrentTag('');
      return;
    }
    
    if (postData.tags.length >= 10) {
      Alert.alert('Limite', 'Máximo de 10 tags permitidas');
      return;
    }
    
    setPostData({
      ...postData,
      tags: [...postData.tags, tagTrimmed],
    });
    setCurrentTag('');
  };

  const removeTag = (tagToRemove) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const addMultipleTags = () => {
    if (!currentTag.trim()) return;
    
    const tagsArray = currentTag
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);
    
    const uniqueTags = [...new Set(tagsArray)];
    const availableSlots = 10 - postData.tags.length;
    
    if (uniqueTags.length > availableSlots) {
      Alert.alert('Limite', `Você pode adicionar apenas mais ${availableSlots} tags`);
      return;
    }
    
    const newTags = uniqueTags.filter(tag => !postData.tags.includes(tag));
    
    if (newTags.length === 0) {
      Alert.alert('Aviso', 'Todas as tags já foram adicionadas');
      setCurrentTag('');
      return;
    }
    
    setPostData({
      ...postData,
      tags: [...postData.tags, ...newTags],
    });
    setCurrentTag('');
  };

  // Validar e salvar
  const validateForm = () => {
    if (!postData.foto) {
      Alert.alert('Erro', 'Por favor, selecione uma foto');
      return false;
    }
    
    if (!postData.descricao.trim()) {
      Alert.alert('Erro', 'Por favor, adicione uma descrição');
      return false;
    }
    
    if (postData.tags.length === 0) {
      Alert.alert('Erro', 'Por favor, adicione pelo menos uma tag');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    if (!user?.uid) {
      Alert.alert('Erro', 'Usuário não identificado');
      return;
    }

    try {
      setLoading(true);
      
      await addPost(postData, user.uid);
      
      Alert.alert(
        '✅ Sucesso!',
        'Post adicionado ao portfólio!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
      
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      Alert.alert('❌ Erro', 'Não foi possível salvar o post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <LinearGradient
        colors={['#4A148C', '#8B0000', '#5D1010']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Post</Text>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Seção da Foto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Foto do Trabalho *</Text>
          <Text style={styles.sectionSubtitle}>
            Mostre o resultado final da tatuagem
          </Text>
          
          <TouchableOpacity 
            style={styles.photoContainer}
            onPress={handleUpdatePhoto}
            disabled={uploadingImage}
          >
            {postData.foto ? (
              <Image source={{ uri: postData.foto }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <MaterialIcons name="add-a-photo" size={50} color="#5D1010" />
                <Text style={styles.photoPlaceholderText}>
                  {uploadingImage ? 'Enviando...' : 'Toque para adicionar foto'}
                </Text>
              </View>
            )}
            {uploadingImage && (
              <View style={styles.uploadingOverlay}>
                <ActivityIndicator size="large" color="#FFF" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Seção de Descrição */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição *</Text>
          <Text style={styles.sectionSubtitle}>
            Conte um pouco sobre este trabalho
          </Text>
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ex: Tatuagem feita para cliente X, inspirada em..."
            value={postData.descricao}
            onChangeText={(text) => setPostData({ ...postData, descricao: text })}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* Seção de Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags (Estilos) *</Text>
          <Text style={styles.sectionSubtitle}>
            Adicione palavras-chave que descrevem o estilo
          </Text>
          
          <View style={styles.tagInputContainer}>
            <TextInput
              style={styles.tagInput}
              placeholder="Ex: tradicional, realismo, oriental"
              value={currentTag}
              onChangeText={setCurrentTag}
              onSubmitEditing={addTag}
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.addTagButton} onPress={addTag}>
              <Ionicons name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.multipleTagsButton}
            onPress={addMultipleTags}
          >
            <Text style={styles.multipleTagsText}>
              Adicionar múltiplas tags (separadas por vírgula)
            </Text>
          </TouchableOpacity>
          
          {/* Lista de Tags */}
          {postData.tags.length > 0 ? (
            <View style={styles.tagsContainer}>
              <Text style={styles.tagsCount}>
                {postData.tags.length} tag(s) - {10 - postData.tags.length} restante(s)
              </Text>
              <View style={styles.tagsList}>
                {postData.tags.map((tag, index) => (
                  <View key={index} style={styles.tagItem}>
                    <Text style={styles.tagText}>#{tag}</Text>
                    <TouchableOpacity onPress={() => removeTag(tag)}>
                      <Ionicons name="close-circle" size={18} color="#5D1010" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <Text style={styles.noTagsText}>
              Nenhuma tag adicionada ainda
            </Text>
          )}
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitButtonText}>PUBLICAR NO PORTFÓLIO</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos (podem ser os mesmos do AddFlashScreen com pequenas alterações)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'serif',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  photoContainer: {
    height: 250,
    backgroundColor: '#FFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    marginTop: 10,
    color: '#5D1010',
    fontSize: 14,
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  tagInputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tagInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    fontSize: 16,
  },
  addTagButton: {
    backgroundColor: '#5D1010',
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  multipleTagsButton: {
    backgroundColor: '#8B0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  multipleTagsText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  tagsContainer: {
    marginTop: 10,
  },
  tagsCount: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5D1010',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#FFF',
    marginRight: 5,
    fontSize: 12,
  },
  noTagsText: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#5D1010',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    height: 50,
  },
});

export default AddPostScreen;