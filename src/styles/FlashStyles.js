import { StyleSheet } from 'react-native';

export const flashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#8B0000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  flashBanner: {
    backgroundColor: '#5D2510',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  idCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  idText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  flashTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageCardContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  
  /* Container da imagem - Centralizado apenas horizontalmente */
  imageContainer: {
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: '#FFF',
    paddingVertical: 20,
    marginTop: 10,
  },
  
  /* Wrapper para imagem */
  imageWrapper: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#8B0000',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center', // Centraliza a imagem dentro do wrapper
  },
  
  /* Imagem - Centralizada horizontalmente */
  flashImage: {
    width: 300, // Largura fixa
    height: 300, // Altura fixa
    borderRadius: 8,
    alignSelf: 'center', // Garante centralização horizontal
  },
  
  infoSection: {
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsLeft: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B0000',
    marginTop: 5,
  },
  detailsRight: {
    alignItems: 'flex-end',
  },
  tag: {
    borderWidth: 1.5,
    borderColor: '#4A148C',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  tagText: {
    color: '#4A148C',
    fontSize: 14,
    fontWeight: '600',
  },
  priceBadge: {
    borderBottomWidth: 2,
    borderBottomColor: '#4A148C',
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingBottom: 2,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 25,
  },
  actionButton: {
    backgroundColor: '#8B0000',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  artistInfo: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  artistText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});