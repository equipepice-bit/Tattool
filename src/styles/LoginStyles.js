import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  // Logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },

  // Card
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  input: {
    height: 52,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 18,
    fontSize: 15,
    marginBottom: 12,
  },

  // Seleção de perfil
  roleButtonsContainer: {
    gap: 12,
    marginTop: 10,
    marginBottom: 20,
  },

  roleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#5D1010',
  },

  roleButtonActive: {
    backgroundColor: '#5D1010',
  },

  roleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5D1010',
    letterSpacing: 0.6,
  },

  roleButtonTextActive: {
    color: '#FFF',
  },

  roleButtonIcon: {
    marginRight: 8,
  },

  signupText: {
    textAlign: 'center',
    color: '#5D1010',
    fontWeight: 'bold',
    marginTop: 10,
  },

  // Google
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#FFF',
    marginTop: 10,
  },

  googleText: {
    color: '#FFF',
    marginLeft: 8,
    fontWeight: '600',
  },

  bottomSpacer: {
    height: 30,
  },

  loginButtonText:{
    color: '#5D1010',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Adicione no final do seu arquivo LoginStyles.js

// Estilo para o loader overlay (opcional)
loaderOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
},
loaderContainer: {
  backgroundColor: '#FFF',
  padding: 30,
  borderRadius: 15,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
loaderText: {
  marginTop: 15,
  fontSize: 16,
  color: '#5D1010',
  fontWeight: '500',
},
tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5D1010',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  tagText: {
    color: '#FFF',
    marginRight: 5,
    fontSize: 12,
  },
});
