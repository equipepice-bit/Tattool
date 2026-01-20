import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ref, get } from 'firebase/database';

import { artistProfileViewStyles as styles } from '../../styles/ArtistProfileViewStyles';
import { IMAGES } from '../../constants/images';
import { PortfolioCard } from '../../components/PortfolioCard';
import { FlashCard } from '../../components/FlashCard';
import { BackButton } from '../../components/BackButton';
import { getUserData } from '../../utils/storage';
import { db } from '../../../firebase';

export default function ArtistProfileView() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [flashes, setFlashes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar todos os dados
  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // Carregar dados do usuário
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
        
        // Carregar posts
        if (userData.uid) {
          await loadUserPosts(userData.uid);
          await loadUserFlashes(userData.uid);
          await loadUserReviews(userData.uid);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do perfil');
    } finally {
      setLoading(false);
    }
  };

  // Carregar posts do usuário
  const loadUserPosts = async (userId) => {
    try {
      const postsRef = ref(db, `posts/${userId}`);
      const postsSnapshot = await get(postsRef);
      
      if (postsSnapshot.exists()) {
        const postsData = postsSnapshot.val();
        const postsArray = Object.keys(postsData).map(key => ({
          id: key,
          ...postsData[key],
          type: 'post'
        }));
        setPosts(postsArray);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      setPosts([]);
    }
  };

  // Carregar flashes do usuário
  const loadUserFlashes = async (userId) => {
    try {
      const flashesRef = ref(db, `flashes/${userId}`);
      const flashesSnapshot = await get(flashesRef);
      
      if (flashesSnapshot.exists()) {
        const flashesData = flashesSnapshot.val();
        const flashesArray = Object.keys(flashesData).map(key => ({
          id: key,
          ...flashesData[key],
          type: 'flash'
        }));
        setFlashes(flashesArray);
      } else {
        setFlashes([]);
      }
    } catch (error) {
      console.error('Erro ao carregar flashes:', error);
      setFlashes([]);
    }
  };

  // Carregar avaliações (opcional - pode ser implementado depois)
  const loadUserReviews = async (userId) => {
    try {
      // Exemplo de estrutura de reviews (se você tiver)
      const reviewsRef = ref(db, `reviews/${userId}`);
      const reviewsSnapshot = await get(reviewsRef);
      
      if (reviewsSnapshot.exists()) {
        const reviewsData = reviewsSnapshot.val();
        const reviewsArray = Object.keys(reviewsData).map(key => ({
          id: key,
          ...reviewsData[key]
        }));
        setReviews(reviewsArray);
      } else {
        // Dados de exemplo caso não tenha avaliações reais
        setReviews([
          { id: '1', userName: 'Carlos Silva', comment: 'Excelente trabalho!', rating: 5 },
          { id: '2', userName: 'Maria Santos', comment: 'Profissional muito talentoso!', rating: 4 },
        ]);
      }
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
      setReviews([]);
    }
  };

  // Atualizar quando a tela receber foco
  useFocusEffect(
    React.useCallback(() => {
      loadAllData();
      return () => {};
    }, [])
  );

  useEffect(() => {
    loadAllData();
  }, []);

  // Função para formatar as tags
  const formatTags = (tags) => {
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return '#tattoo #artist';
    }
    
    // Limitar a 5 tags para não ficar muito longo
    const limitedTags = tags.slice(0, 5);
    return limitedTags.map(tag => `#${tag}`).join(' ');
  };

  // Função para obter a foto do usuário ou imagem padrão
  const getUserImage = () => {
    if (user?.foto && user.foto.trim() !== '') {
      return { uri: user.foto };
    }
    return IMAGES.ANA_SILVA;
  };

  // Função para obter o endereço formatado
  const getFormattedAddress = () => {
    if (!user?.endereco) return 'Local não definido';
    
    // Pegar apenas a primeira parte do endereço (geralmente a rua)
    const parts = user.endereco.split(',');
    return parts[0].trim();
  };

  // Função para renderizar estrelas
  const renderStars = (rating) => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesome
            key={star}
            name={star <= rating ? "star" : "star-o"}
            size={14}
            color="#FFD700"
            style={{ marginRight: 2 }}
          />
        ))}
      </View>
    );
  };

  // Componente vazio quando não há conteúdo
  const EmptyContent = ({ type }) => (
    <View style={styles.emptyContainer}>
      <MaterialIcons 
        name={type === 'post' ? "photo-library" : "flash-on"} 
        size={50} 
        color="#CCC" 
      />
      <Text style={styles.emptyText}>
        {type === 'post' ? 'Nenhum post no portfólio' : 'Nenhum flash disponível'}
      </Text>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate(type === 'post' ? 'AddPost' : 'AddFlash')}
      >
        <Text style={styles.addButtonText}>
          Adicionar {type === 'post' ? 'Post' : 'Flash'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5D1010" />
          <Text style={{ marginTop: 10, color: '#5D1010' }}>Carregando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <LinearGradient
          colors={['#4A148C', '#8B0000', '#5D2510']}
          style={styles.headerGradient}
        >
          
        </LinearGradient>

        <View style={styles.profileContent}>
          {/* Top Row: Avatar + Localização */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: -60, paddingHorizontal: 20 }}>
            <View style={styles.avatarContainer}>
              <Image 
                source={getUserImage()} 
                style={styles.avatar} 
              />
            </View>

            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={18} color="#333" />
              <Text style={styles.locationText}>
                {getFormattedAddress()}
              </Text>
            </View>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            {/* Nome e botão de edição */}
            <View style={styles.nameRow}>
              <Text style={styles.artistName}>{user?.name || 'Nome não definido'}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ArtistSettings')}>
                <MaterialCommunityIcons name="pencil-outline" size={24} color="#5D1010" />
              </TouchableOpacity>
            </View>

            {/* Redes sociais */}
            <View style={styles.socialRow}>
              <TouchableOpacity onPress={() => {
                if (user?.telefone) {
                  Alert.alert(
                    'WhatsApp',
                    `Abrir conversa no WhatsApp com ${user.telefone}?`,
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      { 
                        text: 'Abrir', 
                        onPress: () => {
                          // Implementar abertura do WhatsApp
                          Alert.alert('Em desenvolvimento', 'Funcionalidade do WhatsApp em breve!');
                        }
                      }
                    ]
                  );
                } else {
                  Alert.alert('Sem contato', 'Telefone não disponível');
                }
              }}>
                <FontAwesome5 name="whatsapp" size={32} color="#333" />
              </TouchableOpacity>
              {/* Adicione outras redes sociais se o usuário tiver */}
              {/* <FontAwesome5 name="instagram" size={32} color="#333" />
              <FontAwesome5 name="behance" size={32} color="#333" /> */}
            </View>

            {/* Tags do usuário */}
            <Text style={styles.stylesLabel}>Estilos com que trabalha:</Text>
            <Text style={styles.stylesList}>
              {formatTags(user?.tags || [])}
            </Text>

            {/* PORTFÓLIO */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Portfólio</Text>
              
            </View>
            
            {posts.length > 0 ? (
              <ScrollView
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 5 }}
              >
                {posts.slice(0, 3).map((post) => (
                  <PortfolioCard 
                    key={post.id}
                    imageUri={post.foto || IMAGES.OCTOPUS_BLACKWORK}
                    target="ArtistPortfolioDetail"
                    postData={post}
                  />
                ))}
              </ScrollView>
            ) : (
              <EmptyContent type="post" />
            )}

            {/* FLASHES DISPONÍVEIS */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Flash</Text>
              
            </View>
            
            {flashes.length > 0 ? (
              <ScrollView
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 5 }}
              >
                {flashes.slice(0, 3).map((flash) => (
                  <FlashCard 
                    key={flash.id}
                    imageUri={flash.foto || IMAGES.FLASH_SNAKE}
                    target="ArtistFlashDetail"
                    flashData={flash}
                  />
                ))}
              </ScrollView>
            ) : (
              <EmptyContent type="flash" />
            )}

            {/* AVALIAÇÕES */}
            {/* <Text style={styles.sectionTitle}>Avaliações</Text>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.userAvatar}>
                    <FontAwesome name="user" size={24} color="#FFF" />
                  </View>
                  <View style={styles.reviewContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.reviewerName}>{review.userName || 'Anônimo'}</Text>
                      {review.rating && renderStars(review.rating)}
                    </View>
                    <Text style={styles.reviewText}>
                      {review.comment || 'Avaliação sem comentário'}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyReview}>
                <Text style={styles.emptyReviewText}>Nenhuma avaliação ainda</Text>
              </View>
            )} */}
          </View>
        </View>
      </ScrollView>

      {/* Botões flutuantes */}
      <View style={styles.floatingButtons}>
        <TouchableOpacity
          style={[styles.floatingButton, styles.flashButton]}
          onPress={() => navigation.navigate('AddFlash')}
        >
          <MaterialIcons name="flash-on" size={24} color="#FFF" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.floatingButton, styles.postButton]}
          onPress={() => navigation.navigate('AddPost')}
        >
          <MaterialIcons name="add-a-photo" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}