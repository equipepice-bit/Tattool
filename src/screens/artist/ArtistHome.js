import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar,
  StyleSheet
} from 'react-native';
import { 
  Ionicons, 
  FontAwesome, 
  MaterialIcons, 
  MaterialCommunityIcons 
} from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { artistHomeStyles as styles } from '../../styles/ArtistHomeStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserData } from '../../utils/storage';

export default function ArtistHome() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [user, setUser] = useState(null);

  // Dados de exemplo para agendamentos
  const agendamentos = [
    { id: 1, nome: 'Carlos Souza', data: '18 Out - 14:00', estilo: 'Old School', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, nome: 'Marina Lima', data: '20 Out - 09:30', estilo: 'Fineline', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, nome: 'Roberto Alves', data: '21 Out - 16:00', estilo: 'Tribal', img: 'https://randomuser.me/api/portraits/men/65.jpg' },
  ];

  // Dados de exemplo para avaliações
  const avaliacoes = [
    { id: 1, nome: 'João Silva', rating: 5, data: '2 dias atrás', comentario: 'Excelente trabalho! Atencioso e detalhista.', img: 'https://randomuser.me/api/portraits/men/22.jpg' },
    { id: 2, nome: 'Maria Santos', rating: 4, data: '1 semana atrás', comentario: 'Adorei o resultado final, superou minhas expectativas!', img: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { id: 3, nome: 'Pedro Costa', rating: 5, data: '3 semanas atrás', comentario: 'Profissional incrível! Recomendo para todos.', img: 'https://randomuser.me/api/portraits/men/55.jpg' },
  ];

  const loadUserData = async () => {
    const userData = await getUserData();
    if (userData) {
      setUser(userData);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  // Cálculo das estatísticas
  const totalAgendamentos = agendamentos.length;
  const mediaAvaliacoes = 4.8; // Pode calcular dinamicamente se tiver os dados

  // Função para renderizar estrelas de avaliação
  const renderStars = (rating) => {
    return (
      <View style={localStyles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesome
            key={star}
            name={star <= rating ? "star" : "star-o"}
            size={16}
            color="#FFD700"
            style={localStyles.starIcon}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F7FF" />
      
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 }]} 
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('ArtistProfileView')}>
            <Image 
              source={{ uri: user?.foto || 'https://images.unsplash.com/photo-1594069811326-0be65746369c?q=80&w=200' }} 
              style={styles.profilePic} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ flex: 1 }} 
            onPress={() => navigation.navigate('ArtistProfileView')}
          >
            <View style={styles.headerInfo}>
              <Text style={styles.artistName}>{user?.name || 'Ana Silva'}</Text>
              <Text style={styles.artistRole}>Tatuador(a) Profissional</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Disponível</Text>
          </View>
          
          <TouchableOpacity onPress={() => navigation.navigate('ArtistSettings')}>
            <Ionicons name="settings-outline" size={28} color="#4A148C" />
          </TouchableOpacity>
        </View>

        {/* ESTATÍSTICAS - AGENDAMENTOS E AVALIAÇÃO MÉDIA */}
        <View style={localStyles.statsContainer}>
          {/* CARD DE AGENDAMENTOS */}
          <View style={localStyles.statCard}>
            <View style={localStyles.statIconContainer}>
              <MaterialCommunityIcons name="calendar-clock" size={28} color="#4A148C" />
            </View>
            <View style={localStyles.statContent}>
              <Text style={localStyles.statNumber}>{totalAgendamentos.toString().padStart(2, '0')}</Text>
              <Text style={localStyles.statLabel}>Agendamentos</Text>
            </View>
          </View>

          {/* CARD DE AVALIAÇÃO MÉDIA */}
          <View style={localStyles.statCard}>
            <View style={localStyles.statIconContainer}>
              <FontAwesome name="star" size={28} color="#FFD700" />
            </View>
            <View style={localStyles.statContent}>
              <Text style={localStyles.statNumber}>{mediaAvaliacoes.toFixed(1)}</Text>
              <Text style={localStyles.statLabel}>Avaliação Média</Text>
              <View style={localStyles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesome
                    key={star}
                    name="star"
                    size={14}
                    color="#FFD700"
                    style={{ marginHorizontal: 1 }}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* SEÇÃO DE AGENDAMENTOS */}
        

        {/* CALENDÁRIO */}
        <View style={styles.calendarCard}>
          <View style={localStyles.calendarHeader}>
            <Text style={styles.selectDateLabel}>Calendário</Text>
            <MaterialIcons name="edit" size={24} color="#333" />
          </View>
          
          <Text style={localStyles.calendarDate}>Outubro 2024</Text>

          <Calendar
            onDayPress={day => setSelected(day.dateString)}
            markedDates={{ 
              [selected]: {
                selected: true, 
                selectedColor: '#5D1010',
                selectedTextColor: '#FFF'
              }
            }}
            theme={{ 
              todayTextColor: '#4A148C', 
              arrowColor: '#333', 
              textDayFontWeight: 'bold',
              calendarBackground: 'transparent',
              textSectionTitleColor: '#4A148C',
              monthTextColor: '#4A148C',
              dayTextColor: '#333',
              textDisabledColor: '#999',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }
              }
            }}
          />
        </View>

      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  // ESTATÍSTICAS
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: '#D1C4E9',
    elevation: 3,
    shadowColor: '#4A148C',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    marginRight: 15,
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  ratingStars: {
    flexDirection: 'row',
    marginTop: 4,
  },
  
  // SEÇÕES
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
    flex: 1,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#4A148C',
    fontSize: 14,
    fontWeight: '500',
  },
  cardsContainer: {
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1.5,
    borderColor: '#D1C4E9',
    elevation: 2,
    shadowColor: '#4A148C',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 5,
  },
  info: {
    color: '#666',
    fontSize: 13,
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  comentario: {
    color: '#555',
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  starIcon: {
    marginRight: 2,
  },
  
  // CALENDÁRIO
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  calendarDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 15,
    textAlign: 'center',
  },
  
  // BOTÕES DE AÇÃO
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4A148C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  secondaryButton: {
    backgroundColor: '#F0EBFF',
    borderWidth: 2,
    borderColor: '#4A148C',
  },
  secondaryButtonText: {
    color: '#4A148C',
  },
});