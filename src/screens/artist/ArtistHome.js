import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { 
  Ionicons, 
  FontAwesome, 
  MaterialIcons, 
  MaterialCommunityIcons 
} from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Imports Internos
import { artistHomeStyles as styles } from '../../styles/ArtistHomeStyles';
import { getUserData } from '../../utils/storage';
import { useTheme } from '../../context/ThemeContext';

// Configuração do Calendário para PT-BR
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function ArtistHome() {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme(); // Hook do Tema
  
  const [selectedDate, setSelectedDate] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- DADOS MOCKADOS (Exemplo) ---
  const agendamentos = [
    { id: 1, nome: 'Carlos Souza' },
    { id: 2, nome: 'Marina Lima' },
    { id: 3, nome: 'Roberto Alves' },
  ];
  
  const totalAgendamentos = agendamentos.length;
  const mediaAvaliacoes = 4.8;

  // --- CARREGAMENTO DE DADOS ---
  const loadUserData = async () => {
    try {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Erro ao carregar usuário", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  // --- RENDER ---
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]} 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 }]} 
        showsVerticalScrollIndicator={false}
      >
        {/* === HEADER DO PERFIL === */}
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <TouchableOpacity onPress={() => navigation.navigate('ArtistProfileView')}>
            <Image 
              source={{ uri: user?.foto || 'https://images.unsplash.com/photo-1594069811326-0be65746369c?q=80&w=200' }} 
              style={[styles.profilePic, { borderColor: colors.primary, borderWidth: 1 }]} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ flex: 1, paddingHorizontal: 10 }} 
            onPress={() => navigation.navigate('ArtistProfileView')}
          >
            <View style={styles.headerInfo}>
              <Text style={[styles.artistName, { color: colors.text }]}>
                {user?.name || 'Artista'}
              </Text>
              <Text style={[styles.artistRole, { color: colors.subText }]}>
                Tatuador(a) Profissional
              </Text>
            </View>
          </TouchableOpacity>
          
          {/* Badge de Status */}
          <View style={[
            styles.statusBadge, 
            { 
              backgroundColor: isDark ? 'rgba(76, 175, 80, 0.2)' : '#E8F5E9',
              borderColor: isDark ? '#4CAF50' : 'transparent',
              borderWidth: isDark ? 1 : 0
            }
          ]}>
            <Text style={[styles.statusText, { color: isDark ? '#81C784' : '#2E7D32' }]}>
              Disponível
            </Text>
          </View>
          
          {/* Botão Configurações */}
          <TouchableOpacity 
            style={{ marginLeft: 15 }} 
            onPress={() => navigation.navigate('ArtistSettings')}
          >
            <Ionicons name="settings-outline" size={26} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* === ESTATÍSTICAS === */}
        <View style={localStyles.statsContainer}>
          {/* Card Agendamentos */}
          <View style={[
            localStyles.statCard, 
            { backgroundColor: colors.cardBg, borderColor: colors.border }
          ]}>
            <View style={localStyles.statIconContainer}>
              <MaterialCommunityIcons 
                name="calendar-clock" 
                size={28} 
                color={isDark ? '#BB86FC' : '#4A148C'} 
              />
            </View>
            <View style={localStyles.statContent}>
              <Text style={[localStyles.statNumber, { color: colors.text }]}>
                {totalAgendamentos.toString().padStart(2, '0')}
              </Text>
              <Text style={[localStyles.statLabel, { color: colors.subText }]}>
                Agendamentos
              </Text>
            </View>
          </View>

          {/* Card Avaliação */}
          <View style={[
            localStyles.statCard, 
            { backgroundColor: colors.cardBg, borderColor: colors.border }
          ]}>
            <View style={localStyles.statIconContainer}>
              <FontAwesome name="star" size={28} color="#FFD700" />
            </View>
            <View style={localStyles.statContent}>
              <Text style={[localStyles.statNumber, { color: colors.text }]}>
                {mediaAvaliacoes.toFixed(1)}
              </Text>
              <Text style={[localStyles.statLabel, { color: colors.subText }]}>
                Avaliação Média
              </Text>
              
              {/* Estrelinhas */}
              <View style={localStyles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesome
                    key={star}
                    name="star"
                    size={12}
                    color="#FFD700"
                    style={{ marginRight: 2 }}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* === CALENDÁRIO === */}
        <View style={[
          styles.calendarCard, 
          { 
            backgroundColor: colors.cardBg, 
            borderColor: colors.border,
            borderWidth: 1,
            marginTop: 10
          }
        ]}>
          <View style={localStyles.calendarHeader}>
            <Text style={[styles.selectDateLabel, { color: colors.text }]}>
              Sua Agenda
            </Text>
            <MaterialIcons name="event" size={24} color={colors.subText} />
          </View>
          
          <Calendar
            onDayPress={day => setSelectedDate(day.dateString)}
            markedDates={{ 
              [selectedDate]: {
                selected: true, 
                selectedColor: colors.primary, // Cor vinho/roxo definida no tema
                selectedTextColor: '#FFF'
              }
            }}
            theme={{ 
              // Cores adaptativas
              calendarBackground: 'transparent',
              textSectionTitleColor: isDark ? '#BB86FC' : '#4A148C',
              selectedDayBackgroundColor: '#BB86FC',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#ffffff',
              dayTextColor: '#ceb9b9',
              textDisabledColor: colors.border,
              dotColor: colors.primary,
              selectedDotColor: '#ffffff',
              arrowColor: isDark ? '#FFF' : '#4A148C',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: colors.text,
              indicatorColor: colors.primary,
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'bold',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 13
            }}
          />
        </View>
        
        {/* Espaço extra no final já que não tem barra inferior */}
        <View style={{ height: 30 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos locais apenas para layout (cores vêm do style inline)
const localStyles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    elevation: 2, // Sombra Android
    shadowOpacity: 0.1, // Sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  ratingStars: {
    flexDirection: 'row',
    marginTop: 4,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  }
});