// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  } catch (error) {
    console.error('Erro ao recuperar dados do usuário:', error);
    return null;
  }
};

export const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
    throw error;
  }
};

// Opcional: função para atualizar campos específicos
export const updateUserField = async (field, value) => {
  try {
    const userData = await getUserData();
    if (userData) {
      userData[field] = value;
      await saveUserData(userData);
    }
    return true;
  } catch (error) {
    console.error(`Erro ao atualizar campo ${field}:`, error);
    throw error;
  }
};