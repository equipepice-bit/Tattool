import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { budgetStyles as styles } from '../../styles/BudgetStyles';
import { useTheme } from '../../context/ThemeContext'; // <--- IMPORTAÇÃO

// Configuração para português (Mantida igual)
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function Budget() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('20:00');
  const timeSlots = ['08:00', '10:00', '14:00', '16:00', '18:00', '20:00'];
  
  // Cores do Tema
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBarStyle} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          {/* Título adaptável */}
          <Text style={[styles.title, { color: isDark ? '#FFF' : '#4A0404' }]}>Orçamento</Text>
        </View>

        {/* Aqui você teria os inputs (lembre de adicionar style={{color: colors.text}} neles) */}

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Agenda</Text>
        
        {/* Calendário Adaptado */}
        <View style={[styles.calendarCard, { backgroundColor: colors.cardBg }]}>
          <Calendar
            onDayPress={day => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: '#8B0000' }
            }}
            theme={{
              backgroundColor: isDark ? '#1E1E1E' : '#ffffff',
              calendarBackground: isDark ? '#1E1E1E' : '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#8B0000',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#8B0000',
              dayTextColor: isDark ? '#ffffff' : '#2d4150', // Dias mudam para branco no dark
              arrowColor: '#8B0000',
              monthTextColor: isDark ? '#ffffff' : '#5D2510', // Mês muda para branco no dark
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14
            }}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Horários</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map((time) => (
            <TouchableOpacity 
              key={time} 
              // Slot muda de cor no dark
              style={[
                styles.timeSlot, 
                { backgroundColor: isDark ? '#333' : '#FFF', borderColor: colors.border },
                selectedTime === time && styles.selectedTimeSlot
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[
                styles.timeText, 
                { color: colors.text }, // Texto muda de cor
                selectedTime === time && styles.selectedTimeText
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Agendar {selectedDate ? `para ${selectedDate}` : ''}</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}