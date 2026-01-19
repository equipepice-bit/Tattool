import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar,
  Dimensions
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

export default function ArtistHome() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F7FF" />
      
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1594069811326-0be65746369c?q=80&w=200' }} 
            style={styles.profilePic} 
          />
          <View style={styles.headerInfo}>
            <Text style={styles.artistName}>Débora</Text>
            <Text style={styles.artistRole}>Tatuadora Profissional</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Disponível</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ArtistSettings')}>
            <Ionicons name="settings-outline" size={28} color="#4A148C" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.reviewButton}>
          <FontAwesome name="star" size={18} color="#FFD700" />
          <Text style={styles.reviewButtonText}>ver avaliações</Text>
        </TouchableOpacity>

        <View style={styles.calendarCard}>
          <Text style={styles.selectDateLabel}>Selecione a data</Text>
          <View style={styles.dateHeaderRow}>
            <Text style={styles.dateTitle}>Seg, Ago 17</Text>
            <MaterialIcons name="edit" size={24} color="#333" />
          </View>

          <Calendar
            onDayPress={day => setSelected(day.dateString)}
            markedDates={{ [selected]: {selected: true, selectedColor: '#5D1010'} }}
            theme={{ 
              todayTextColor: '#4A148C', 
              arrowColor: '#333', 
              textDayFontWeight: 'bold',
              calendarBackground: 'transparent'
            }}
          />
        </View>
      </ScrollView>

    
    </View>
  );
}