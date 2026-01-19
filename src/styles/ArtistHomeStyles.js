import { StyleSheet, Dimensions, Platform } from 'react-native';

export const artistHomeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F7FF',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20, // Esta é a margem de referência (20)
    paddingTop: 60,
    paddingBottom: 140, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  profilePic: {
    width: 65,
    height: 65,
    borderRadius: 35,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  artistRole: {
    fontSize: 14,
    color: '#777',
  },
  statusBadge: {
    backgroundColor: '#4DB6AC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
  },
  statusText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#5D1010',
    borderRadius: 30,
    paddingVertical: 14,
    marginBottom: 30,
  },
  reviewButtonText: {
    marginLeft: 10,
    color: '#4A148C',
    fontWeight: '700',
    fontSize: 16,
  },
  calendarCard: {
    borderWidth: 1.5,
    borderColor: '#5D1010',
    borderRadius: 25,
    padding: 20,
    backgroundColor: '#FFF',
    // O calendário agora define a largura que a barra deve seguir
  },
  selectDateLabel: { fontSize: 14, color: '#888' },
  dateHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },

  // --- SOLUÇÃO DA BARRA ---
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 20,        
    right: 20,    
    height: 70,
    backgroundColor: 'transparent', 
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  bottomNavPill: {
    flexDirection: 'row',
    backgroundColor: '#F3F1FF', 
    width: '100%',   
    height: '100%',    
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    // Sombra limpa para Android
    elevation: 4, 
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  navItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});