import { StyleSheet } from 'react-native';

export const artistFlashDetailStyles = StyleSheet.create({
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
    marginRight: 40,
    lineHeight: 35, // Ajuste para o título quebrado em duas linhas
  },
  imageWrapper: {
    alignSelf: 'center',
    width: '85%',
    height: 380,
    borderRadius: 30,
    backgroundColor: '#FFF',
    padding: 10,
    // Borda sólida para profundidade
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderColor: '#8B0000',
    marginBottom: 30,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  galleryIcon: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  infoSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 25,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
  },
  chip: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#4A148C',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    minWidth: 100,
  },
  chipLabel: {
    fontSize: 14,
    color: '#8B0000',
    fontWeight: '400',
  },
  chipValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    padding: 0,
    minWidth: 60,
  }
});