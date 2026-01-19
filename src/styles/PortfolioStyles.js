import { StyleSheet } from 'react-native';

export const portfolioStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7FB',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    backgroundColor: '#8B0000',
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  mainTitle: {
    fontSize: 32,
    fontFamily: 'serif', // Ou a fonte que está a usar nas imagens
    fontWeight: 'bold',
    color: '#5D2510',
    marginTop: 60,
    marginBottom: 30,
  },
  imageContainer: {
    width: '90%',
    height: 380,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#3498db', // Borda azul como na imagem
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    width: '90%',
    marginTop: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 10,
    marginTop: 15,
  },
  description: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 15,
  },
  tag: {
    borderWidth: 1.5,
    borderColor: '#4A148C',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  tagText: {
    color: '#4A148C',
    fontWeight: '600',
  }
});