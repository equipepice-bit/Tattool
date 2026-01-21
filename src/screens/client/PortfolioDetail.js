// ArtistPortfolioDetail.js - USANDO VIEW NORMAL
import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StatusBar, 
  TouchableOpacity,
  Platform 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { portfolioStyles as styles } from '../../styles/PortfolioStyles';
import { IMAGES } from '../../constants/images';
import { BackButton } from '../../components/BackButton';
import { Tag } from '../../components/Tag';
import { useTheme } from '../../context/ThemeContext';

export default function PortfolioDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { postData, artistId, artistName } = route.params || {};
  
  const { colors, isDark } = useTheme();

  // Usar dados REAIS do portfólio
  const imageUri = postData?.foto || IMAGES.OCTOPUS_BLACKWORK;
  const title = postData?.title || 'Trabalho Realizado';
  const technique = postData?.technique || 'Técnica não informada';
  const size = postData?.size || 'Tamanho não informado';
  const tags = postData?.tags || ['Arte Autoral', 'Finalizado'];
  const description = postData?.descricao || 'Esta peça foi desenvolvida exclusivamente para o cliente com base em referências pessoais.';
  const date = postData?.createdAt ? new Date(postData.createdAt).toLocaleDateString('pt-BR') : 'Data não informada';

  const handleContact = () => {
    navigation.navigate('Contact', { 
      artistId,
      artistName,
      portfolioTitle: title,
      portfolioImage: imageUri
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#8B0000" />
      
      {/* Espaço para status bar do iOS */}
      {Platform.OS === 'ios' && <View style={{ height: 44 }} />}
      
      {/* Espaço para status bar do Android */}
      {Platform.OS === 'android' && <View style={{ height: 24 }} />}
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BackButton backgroundColor="transparent" color={isDark ? colors.text : "#FFF"} />
          <Text style={[styles.headerTitle, { color: "#FFF" }]}>{title}</Text>
        </View>
      
      </View>

      {/* Container da imagem - CENTRALIZADA HORIZONTALMENTE */}
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image 
            source={{ uri: imageUri }} 
            style={styles.portfolioImage} 
            resizeMode="contain" 
          />
        </View>
      </View>

      {artistName && (
        <View style={styles.artistInfo}>
          <Text style={[styles.artistText, { color: colors.text }]}>
            Trabalho realizado por: {artistName}
          </Text>
        </View>
      )}

      <View style={[styles.infoSection, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>Detalhes do Trabalho</Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.detailsLeft}>
           
             
            <Text style={[styles.detailLabel, { color: colors.subText, marginTop: 10 }]}>Data:</Text>
            <Text style={[styles.date, { color: colors.text }]}>{date}</Text>
          </View>

          <View style={styles.detailsRight}>
            {/* Tags reais do portfólio */}
            {tags && tags.length > 0 ? (
              tags.map((tag, index) => (
                <Tag key={index} label={tag} />
              ))
            ) : (
              <Text style={[styles.noTagsText, { color: colors.subText }]}>
                Nenhuma tag
              </Text>
            )}
          </View>
        </View>

        <Text style={[styles.description, { color: colors.subText }]}>
          {description}
        </Text>

      </View>
    </View>
  );
}