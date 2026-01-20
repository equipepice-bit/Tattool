import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB', // Fundo lilás bem clarinho
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  // Cabeçalho (Botão Voltar + Título)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B0000', // Vinho escuro/Marrom avermelhado
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'serif', // Fonte serifada igual ao logo
    fontWeight: 'bold',
    color: '#4A0404', // Tom Vinho/Marrom do design
    marginLeft: 15,
  },
  
  // Card do Usuário (Estilo Pílula)
  userCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF', // Fundo branco puro ou levemente roxo
    borderRadius: 50, // Pílula
    borderWidth: 1.5,
    borderColor: '#5D1010', // Borda vinho fina
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingRight: 20, // Espaço para o ícone de seta
    marginBottom: 20,
    // Sombra leve para destacar a pílula
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  userImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },
  userName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D1010', // Roxo profundo para combinar com a identidade visual
  },
  
  // Espaçador para empurrar o menu para baixo
  spacer: {
    flex: 1,
  },

  // Menu Inferior (Card Branco Flutuante)
  bottomMenu: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: 40,
    // Sombra conforme a imagem
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
   scrollContainer: {
    flex: 1,
    width: '100%',
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  userCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  userImageContainer: {
    marginRight: 15,
  },

  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#5D1010',
  },

  defaultAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5D1010',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },

  userInfoContainer: {
    flex: 1,
  },

  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },

  userEmail: {
    fontSize: 14,
    color: '#666',
  },

  dropdownContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },

  editButton: {
    borderWidth: 1,
    borderColor: '#5D1010',
    backgroundColor: 'transparent',
  },

  editButtonText: {
    color: '#5D1010',
    fontWeight: '600',
    marginLeft: 5,
  },

  saveButton: {
    backgroundColor: '#5D1010',
  },

  saveButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },

  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },

  editFormContainer: {
    width: '100%',
  },

  inputContainer: {
    marginBottom: 15,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5D1010',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },

  textArea: {
    minHeight: 80,
  },

  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 10,
  },

  photoButtonText: {
    color: '#5D1010',
    fontWeight: '600',
    marginLeft: 8,
  },

  infoContainer: {
    width: '100%',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 80,
    marginLeft: 12,
  },

  infoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },

  // Menu inferior (mantenha seus estilos existentes)
  bottomMenu: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  menuText: {
    fontSize: 16,
    color: '#333',
  },

  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 20,
  },
});