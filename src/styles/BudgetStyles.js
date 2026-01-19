import { StyleSheet } from 'react-native';

export const budgetStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7FB',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#8B0000',
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D2510',
    flex: 1,
    textAlign: 'center',
    marginRight: 35, // Compensar o botão de voltar
    fontFamily: 'serif', // Estilo similar à imagem
  },
  inputGroup: {
    width: '100%',
    gap: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#8B0000',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 45,
    backgroundColor: '#FFF',
  },
  label: {
    color: '#8B0000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  valueText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  unitText: {
    marginLeft: 10,
    color: '#8B0000',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D2510',
    marginTop: 25,
    marginBottom: 15,
    fontFamily: 'serif',
  },
  calendarContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    elevation: 4,
    shadowColor: '#8B0000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  timeSlot: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#8B0000',
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  selectedTimeSlot: {
    backgroundColor: '#4A0000',
  },
  timeText: {
    color: '#4A0000',
    fontWeight: 'bold',
  },
  selectedTimeText: {
    color: '#FFF',
  },
  confirmButton: {
    backgroundColor: '#E6E0F8',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#8B0000',
  },
  confirmButtonText: {
    color: '#4A0000',
    fontSize: 18,
    fontWeight: 'bold',
  }
});