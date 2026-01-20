import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert,
  ActivityIndicator 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ref, update } from 'firebase/database';
import { artistPortfolioDetailStyles as styles } from '../../styles/ArtistPortfolioDetailStyles';
import { BackButton } from '../../components/BackButton';
import { db } from '../../../firebase';

export default function ArtistPortfolioDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { post } = route.params || {};
  
  // Estados para edição
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    descricao: post?.descricao || '',
    tags: post?.tags || [],
    currentTag: '',
  });

  // Função para salvar alterações
  const handleSave = async () => {
    if (!post?.id || !post?.userId) {
      Alert.alert('Erro', 'Dados do post incompletos');
      return;
    }

    try {
      setLoading(true);
      
      // Atualizar no Firebase
      const postRef = ref(db, `posts/${post.userId}/${post.id}`);
      await update(postRef, {
        descricao: details.descricao,
        tags: details.tags,
        updatedAt: new Date().toISOString(),
      });

      Alert.alert('✅ Sucesso!', 'Post atualizado com sucesso!');
      setIsEditing(false);
      
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      Alert.alert('❌ Erro', 'Não foi possível atualizar o post');
    } finally {
      setLoading(false);
    }
  };

  // Funções para gerenciar tags
  const addTag = () => {
    if (!details.currentTag.trim()) return;
    
    const tagTrimmed = details.currentTag.trim().toLowerCase();
    
    if (details.tags.includes(tagTrimmed)) {
      Alert.alert('Aviso', 'Esta tag já foi adicionada');
      setDetails({...details, currentTag: ''});
      return;
    }
    
    if (details.tags.length >= 10) {
      Alert.alert('Limite', 'Máximo de 10 tags permitidas');
      return;
    }
    
    setDetails({
      ...details,
      tags: [...details.tags, tagTrimmed],
      currentTag: ''
    });
  };

  const removeTag = (tagToRemove) => {
    setDetails({
      ...details,
      tags: details.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const addMultipleTags = () => {
    if (!details.currentTag.trim()) return;
    
    const tagsArray = details.currentTag
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);
    
    const uniqueTags = [...new Set(tagsArray)];
    const availableSlots = 10 - details.tags.length;
    
    if (uniqueTags.length > availableSlots) {
      Alert.alert('Limite', `Você pode adicionar apenas mais ${availableSlots} tags`);
      return;
    }
    
    const newTags = uniqueTags.filter(tag => !details.tags.includes(tag));
    
    if (newTags.length === 0) {
      Alert.alert('Aviso', 'Todas as tags já foram adicionadas');
      setDetails({...details, currentTag: ''});
      return;
    }
    
    setDetails({
      ...details,
      tags: [...details.tags, ...newTags],
      currentTag: ''
    });
  };

  // Formatar data
  const formatDate = (dateString) => {
    if (!dateString) return 'Data não informada';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (!post) {
    return (
      <View style={styles.container}>
        <BackButton />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Post não encontrado</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton color="#FFF" backgroundColor="#8B0000" />
        <Text style={styles.headerTitle}>Portfólio</Text>
      </View>

      {/* Imagem com moldura estilizada */}
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: post.foto }} 
          style={styles.mainImage} 
          resizeMode="cover" 
        />
        <View style={styles.galleryIcon}>
          <Ionicons name="images" size={20} color="#333" />
        </View>
      </View>

      {/* Seção Descrição */}
      <View style={styles.contentSection}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Descrição do trabalho</Text>
          <TouchableOpacity 
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#5D1010" />
            ) : (
              <MaterialCommunityIcons 
                name={isEditing ? "check-circle" : "pencil-outline"} 
                size={24} 
                color={isEditing ? "#27ae60" : "#4A148C"} 
              />
            )}
          </TouchableOpacity>
        </View>

        {isEditing ? (
          <TextInput
            style={[styles.descriptionInput]}
            value={details.descricao}
            onChangeText={(text) => setDetails({...details, descricao: text})}
            multiline
            numberOfLines={4}
            placeholder="Descreva este trabalho..."
            autoFocus
          />
        ) : (
          <Text style={styles.descriptionText}>
            {details.descricao || 'Sem descrição'}
          </Text>
        )}

        {/* Seção Tags */}
        <View style={styles.tagsSection}>
          <View style={styles.tagsHeader}>
            <Text style={styles.tagsTitle}>Tags</Text>
            {isEditing && (
              <Text style={styles.tagsCount}>
                {details.tags.length}/10 tags
              </Text>
            )}
          </View>
          
          {isEditing ? (
            <>
              <View style={styles.tagInputContainer}>
                <TextInput
                  style={styles.tagInput}
                  placeholder="Adicionar tag..."
                  value={details.currentTag}
                  onChangeText={(text) => setDetails({...details, currentTag: text})}
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
            </>
          ) : null}
          
          <View style={styles.tagsContainer}>
            {details.tags.length > 0 ? (
              details.tags.map((tag, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.tagChip}
                  onPress={() => {
                    if (isEditing) {
                      removeTag(tag);
                    }
                  }}
                >
                  <Text style={styles.tagText}>#{tag}</Text>
                  {isEditing && (
                    <Ionicons name="close-circle" size={16} color="#5D1010" style={{ marginLeft: 5 }} />
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noTagsText}>
                {isEditing ? 'Adicione tags para categorizar este trabalho' : 'Sem tags'}
              </Text>
            )}
          </View>
        </View>

        {/* Informações do Sistema */}
        <View style={styles.systemInfo}>
          <Text style={styles.systemInfoText}>
            Postado em: {formatDate(post.createdAt)}
          </Text>
          {post.updatedAt && (
            <Text style={styles.systemInfoText}>
              Atualizado em: {formatDate(post.updatedAt)}
            </Text>
          )}
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => Alert.alert(
              'Excluir Post',
              'Tem certeza que deseja excluir este post do portfólio?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { 
                  text: 'Excluir', 
                  style: 'destructive',
                  onPress: () => Alert.alert('Em desenvolvimento', 'Funcionalidade de exclusão em breve!')
                }
              ]
            )}
          >
            <MaterialCommunityIcons name="delete" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Excluir</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.shareButton]}
            onPress={() => Alert.alert('Compartilhar', 'Funcionalidade de compartilhamento em breve!')}
          >
            <MaterialCommunityIcons name="share-variant" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Compartilhar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}