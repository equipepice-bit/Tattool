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
import { MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ref, update } from 'firebase/database';
import { artistFlashDetailStyles as styles } from '../../styles/ArtistFlashDetailStyles';
import { BackButton } from '../../components/BackButton';
import { db } from '../../../firebase';

export default function ArtistFlashDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { flash } = route.params || {};
  
  // Estados para edição
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    tags: flash?.tags || [],
    tamanho: flash?.tamanho || '',
    valor: flash?.valor || 0,
    currentTag: '',
  });

  // Função para salvar alterações
  const handleSave = async () => {
    if (!flash?.id || !flash?.userId) {
      Alert.alert('Erro', 'Dados do flash incompletos');
      return;
    }

    try {
      setLoading(true);
      
      // Atualizar no Firebase
      const flashRef = ref(db, `flashes/${flash.userId}/${flash.id}`);
      await update(flashRef, {
        tags: details.tags,
        tamanho: details.tamanho,
        valor: parseFloat(details.valor) || 0,
        updatedAt: new Date().toISOString(),
      });

      Alert.alert('✅ Sucesso!', 'Flash atualizado com sucesso!');
      setIsEditing(false);
      
    } catch (error) {
      console.error('Erro ao atualizar flash:', error);
      Alert.alert('❌ Erro', 'Não foi possível atualizar o flash');
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

  // Formatar valor
  const formatValue = () => {
    const valor = parseFloat(details.valor);
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };

  if (!flash) {
    return (
      <View style={styles.container}>
        <BackButton />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Flash não encontrado</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton color="#FFF" backgroundColor="#8B0000" />
        <Text style={styles.headerTitle}>Flash{"\n"}Disponível</Text>
      </View>

      {/* Imagem com profundidade */}
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: flash.foto }} 
          style={styles.mainImage} 
          resizeMode="contain" 
        />
        <View style={styles.galleryIcon}>
          <FontAwesome name="image" size={24} color="#5D1010" />
        </View>
      </View>

      {/* Seção Informações */}
      <View style={styles.infoSection}>
        <View style={styles.labelRow}>
          <Text style={styles.infoTitle}>Informações do Flash</Text>
          <TouchableOpacity 
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#5D1010" />
            ) : (
              <MaterialCommunityIcons 
                name={isEditing ? "check-circle" : "pencil-outline"} 
                size={26} 
                color={isEditing ? "#27ae60" : "#4A148C"} 
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tags (Estilos)</Text>
          
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
          
          {/* Lista de Tags */}
          <View style={styles.tagsList}>
            {details.tags.length > 0 ? (
              details.tags.map((tag, index) => (
                <View key={index} style={styles.tagItem}>
                  <Text style={styles.tagText}>#{tag}</Text>
                  {isEditing && (
                    <TouchableOpacity onPress={() => removeTag(tag)}>
                      <Ionicons name="close-circle" size={18} color="#5D1010" />
                    </TouchableOpacity>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.noTagsText}>Nenhuma tag adicionada</Text>
            )}
          </View>
        </View>

        {/* Tamanho */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tamanho</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={details.tamanho}
              onChangeText={(text) => setDetails({...details, tamanho: text})}
              placeholder="Ex: 10x10 cm, médio, pequeno"
            />
          ) : (
            <Text style={styles.valueText}>{details.tamanho || 'Não informado'}</Text>
          )}
        </View>

        {/* Valor */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Valor</Text>
          {isEditing ? (
            <View style={styles.valueContainer}>
              <Text style={styles.currencySymbol}>R$</Text>
              <TextInput
                style={[styles.input, styles.valueInput]}
                value={details.valor.toString()}
                onChangeText={(text) => setDetails({...details, valor: text})}
                placeholder="0,00"
                keyboardType="decimal-pad"
              />
            </View>
          ) : (
            <Text style={styles.valueText}>{formatValue()}</Text>
          )}
        </View>

        {/* Informações do Sistema */}
        <View style={styles.systemInfo}>
          <Text style={styles.systemInfoText}>
            Criado em: {formatDate(flash.createdAt)}
          </Text>
          {flash.updatedAt && (
            <Text style={styles.systemInfoText}>
              Atualizado em: {formatDate(flash.updatedAt)}
            </Text>
          )}
          <Text style={styles.systemInfoText}>
            ID: {flash.id.substring(0, 8)}...
          </Text>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => Alert.alert(
              'Excluir Flash',
              'Tem certeza que deseja excluir este flash?',
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