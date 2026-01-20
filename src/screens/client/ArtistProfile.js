import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { artistProfileViewStyles as styles } from '../../styles/ArtistProfileViewStyles';
import { IMAGES } from '../../constants/images';
import { PortfolioCard } from '../../components/PortfolioCard';
import { FlashCard } from '../../components/FlashCard';
import { BackButton } from '../../components/BackButton';
import { db } from '../../../firebase';

export default function ArtistProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { artistId, artist: initialArtistData } = route.params || {};
  
  const [artist, setArtist] = useState(initialArtistData || null);
  const [posts, setPosts] = useState([]);
  const [flashes, setFlashes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(!initialArtistData);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const loadArtistData = useCallback(async () => {
    try {
      if (!artistId) {
        Alert.alert('Erro', 'ID do artista não fornecido');
        navigation.goBack();
        return;
      }

      if (!initialArtistData) {
        setLoading(true);
        const artistRef = ref(db, `users/${artistId}`);
        const artistSnapshot = await get(artistRef);
        
        if (artistSnapshot.exists()) {
          const artistData = artistSnapshot.val();
          setArtist({
            id: artistId,
            ...artistData
          });
        } else {
          Alert.alert('Erro', 'Artista não encontrado');
          navigation.goBack();
          return;
        }
      }

      await loadArtistContent(artistId);
      
    } catch (error) {
      console.error('Erro ao carregar dados do artista:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do artista');
    } finally {
      setLoading(false);
      setLoadingPosts(false);
    }
  }, [artistId, initialArtistData, navigation]);

  const loadArtistContent = async (userId) => {
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
        setReviews([]);
      }
      
    } catch (error) {
      console.error('Erro ao carregar conteúdo do artista:', error);
      setPosts([]);
      setFlashes([]);
      setReviews([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (artistId) {
        loadArtistData();
      }
    }, [artistId, loadArtistData])
  );

  useEffect(() => {
    if (artistId) {
      loadArtistData();
    }
  }, [artistId, loadArtistData]);

  const openWhatsApp = () => {
    if (!artist?.telefone) {
      Alert.alert('Sem contato', 'Telefone do artista não disponível');
      return;
    }

    const phoneNumber = artist.telefone.replace(/\D/g, '');
    
    if (phoneNumber.length < 11) {
      Alert.alert('Número inválido', 'O número do artista parece estar incompleto');
      return;
    }

    const defaultMessage = `Olá ${artist.name}! Vi seu perfil no Tattool e gostaria de conversar sobre um trabalho.`;
    const whatsappUrl = `https://wa.me/55${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    
    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert(
        'Erro', 
        'Não foi possível abrir o WhatsApp. Verifique se o aplicativo está instalado.',
        [{ text: 'OK' }]
      );
    });
  };

  const formatTags = () => {
    if (!artist?.tags || !Array.isArray(artist.tags) || artist.tags.length === 0) {
      return '#tattoo #artist';
    }
    
    const limitedTags = artist.tags.slice(0, 5);
    return limitedTags.map(tag => `#${tag}`).join(' ');
  };

  const getArtistImage = () => {
    if (artist?.foto && artist.foto.trim() !== '') {
      return { uri: artist.foto };
    }
    return IMAGES.ANA_SILVA;
  };

  const getFormattedAddress = () => {
    if (!artist?.endereco) return 'Local não definido';
    
    const parts = artist.endereco.split(',');
    return parts[0].trim();
  };

  const renderStars = (rating) => {
    const starRating = rating || 0;
    return (
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesome
            key={star}
            name={star <= starRating ? "star" : "star-o"}
            size={14}
            color="#FFD700"
            style={{ marginRight: 2 }}
          />
        ))}
      </View>
    );
  };

  const handleBudgetRequest = () => {
    navigation.navigate('Budget', { 
      artistId: artistId,
      artistName: artist?.name 
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5D1010" />
          <Text style={{ marginTop: 10, color: '#5D1010' }}>Carregando artista...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!artist) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#5D1010' }}>Artista não encontrado</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#8B0000', marginTop: 20 }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <LinearGradient
          colors={['#4A148C', '#8B0000', '#5D2510']}
          style={styles.headerGradient}
        >
          <View style={styles.backButtonContainer}>
            <BackButton />
          </View>
        </LinearGradient>

        <View style={styles.profileContent}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: -60, paddingHorizontal: 20 }}>
            <View style={styles.avatarContainer}>
              <Image 
                source={getArtistImage()} 
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
            <View style={styles.nameRow}>
              <Text style={styles.artistName}>{artist?.name || 'Artista'}</Text>
              
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity onPress={openWhatsApp}>
                <FontAwesome5 name="whatsapp" size={32} color="#25D366" />
              </TouchableOpacity>
            </View>

            <Text style={styles.stylesLabel}>Estilos com que trabalha:</Text>
            <Text style={styles.stylesList}>
              {formatTags()}
            </Text>

            <TouchableOpacity 
              style={styles.budgetButton}
              onPress={handleBudgetRequest}
            >
              <Text style={styles.budgetBtnText}>Solicitar Orçamento</Text>
            </TouchableOpacity>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Portfólio</Text>
              {posts.length > 3 && (
                <TouchableOpacity onPress={() => navigation.navigate('ArtistPortfolio', { 
                  artistId: artistId,
                  posts: posts,
                  artistName: artist.name 
                })}>
                  <Text style={styles.viewAllText}>Ver tudo</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {loadingPosts ? (
              <ActivityIndicator size="small" color="#5D1010" />
            ) : posts.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 5 }}
              >
                {posts.slice(0, 3).map((post) => (
                  <PortfolioCard 
                    key={post.id}
                    imageUri={post.foto || IMAGES.OCTOPUS_BLACKWORK}
                    postData={post}
                    artistId={artistId}
                    artistName={artist.name}
                  />
                ))}
              </ScrollView>
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="images-outline" size={40} color="#CCC" />
                <Text style={styles.emptyText}>Nenhum trabalho no portfólio</Text>
              </View>
            )}

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Flash</Text>
              {flashes.length > 3 && (
                <TouchableOpacity onPress={() => navigation.navigate('ArtistFlashes', { 
                  artistId: artistId,
                  flashes: flashes,
                  artistName: artist.name 
                })}>
                  <Text style={styles.viewAllText}>Ver tudo</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {loadingPosts ? (
              <ActivityIndicator size="small" color="#5D1010" />
            ) : flashes.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 5 }}
              >
                {flashes.slice(0, 3).map((flash) => (
                  <FlashCard 
                    key={flash.id}
                    imageUri={flash.foto || IMAGES.FLASH_SNAKE}
                    flashData={flash}
                    artistId={artistId}
                    artistName={artist.name}
                  />
                ))}
              </ScrollView>
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="flash-outline" size={40} color="#CCC" />
                <Text style={styles.emptyText}>Nenhum flash disponível</Text>
              </View>
            )}

            {reviews.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Avaliações</Text>
                  {reviews.length > 3 && (
                    <TouchableOpacity onPress={() => navigation.navigate('ArtistReviews', { 
                      artistId: artistId,
                      reviews: reviews,
                      artistName: artist.name 
                    })}>
                      <Text style={styles.viewAllText}>Ver tudo</Text>
                    </TouchableOpacity>
                  )}
                </View>
                {reviews.slice(0, 3).map((review) => (
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
                ))}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}