import { StyleSheet, Platform } from 'react-native';

export const favoritesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7FF', // Fundo levemente arroxeado frio
  },
  favHeader: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30, // Ajuste para a barra de status
    paddingBottom: 10,
  },
  favTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5D1A0E', // Marrom avermelhado do logo
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif', 
    letterSpacing: 1,
  },
  onlyBackButton: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: -10, // Aproxima o botão do título como no design
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120, // Espaço para a BottomTab flutuante
  },
  // Card Horizontal Estilizado
  cardHorizontal: {
    flexDirection: 'row',
    backgroundColor: '#FFFCF5', // Bege clarinho do interior do card
    borderRadius: 25, // Bordas mais arredondadas conforme imagem
    padding: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#D1C4E9', // Borda lilás/roxa
    // Sombra sólida (Neumorfismo/Pop Art style)
    shadowColor: '#7E57C2',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  artistImage: {
    width: 130, // Um pouco maior para destaque
    height: 130,
    borderRadius: 20,
  },
  heartIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 6,
    // Sombra no mini círculo do coração
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  artistName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C', // Roxo escuro
    marginBottom: 2,
  },
  artistStyles: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingNumber: {
    marginLeft: 6,
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  budgetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#7E57C2',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  budgetText: {
    color: '#7E57C2',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 6,
  },
  emptyContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});