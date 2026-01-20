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
  },
  // Estilos comuns para ambas as telas:

section: {
  marginBottom: 20,
},

sectionLabel: {
  fontSize: 16,
  fontWeight: '600',
  color: '#4A148C',
  marginBottom: 8,
},

tagInputContainer: {
  flexDirection: 'row',
  marginBottom: 10,
},

tagInput: {
  flex: 1,
  backgroundColor: '#FFF',
  borderWidth: 1,
  borderColor: '#E0E0E0',
  borderRadius: 8,
  paddingHorizontal: 15,
  paddingVertical: 12,
  marginRight: 10,
  fontSize: 16,
},

addTagButton: {
  backgroundColor: '#5D1010',
  width: 50,
  height: 50,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
},

multipleTagsButton: {
  backgroundColor: '#8B0000',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginBottom: 15,
},

multipleTagsText: {
  color: '#FFF',
  fontWeight: 'bold',
  fontSize: 14,
},

tagsList: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 10,
},

tagItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#5D1010',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
  marginRight: 8,
  marginBottom: 8,
},

tagText: {
  color: '#FFF',
  marginRight: 5,
  fontSize: 12,
},

noTagsText: {
  color: '#999',
  fontStyle: 'italic',
  fontSize: 14,
},

input: {
  backgroundColor: '#FFF',
  borderWidth: 1,
  borderColor: '#E0E0E0',
  borderRadius: 8,
  paddingHorizontal: 15,
  paddingVertical: 12,
  fontSize: 16,
},

valueContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},

currencySymbol: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
  marginRight: 10,
},

valueInput: {
  flex: 1,
},

valueText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
},

systemInfo: {
  backgroundColor: '#F5F5F5',
  padding: 15,
  borderRadius: 10,
  marginTop: 20,
  marginBottom: 20,
},

systemInfoText: {
  fontSize: 12,
  color: '#666',
  marginBottom: 4,
},

actionButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
},

actionButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 8,
  flex: 1,
  marginHorizontal: 5,
},

deleteButton: {
  backgroundColor: '#FF6B6B',
},

shareButton: {
  backgroundColor: '#4A148C',
},

actionButtonText: {
  color: '#FFF',
  fontWeight: 'bold',
  marginLeft: 8,
},
});