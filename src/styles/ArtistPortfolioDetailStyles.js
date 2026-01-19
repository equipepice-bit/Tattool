import { StyleSheet } from 'react-native';

export const artistPortfolioDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    marginBottom: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: '#5D1010',
    marginRight: 40, // Compensar o botão de voltar para centralizar
  },
  imageWrapper: {
    alignSelf: 'center',
    width: '85%',
    height: 350,
    borderRadius: 30,
    backgroundColor: '#FFF',
    padding: 10,
    // Efeito de borda/sombra vermelha sólida da imagem
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderColor: '#8B0000',
    marginBottom: 30,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  galleryIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 5,
    borderRadius: 5,
  },
  contentSection: {
    paddingHorizontal: 30,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  tagsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A148C',
    textAlign: 'center',
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  tagChip: {
    borderWidth: 1.5,
    borderColor: '#4A148C',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: '#FFF',
  },
  tagText: {
    color: '#4A148C',
    fontWeight: '600',
  }
});