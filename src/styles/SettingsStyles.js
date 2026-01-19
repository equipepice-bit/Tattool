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
    color: '#4A148C', // Roxo profundo para combinar com a identidade visual
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
});