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