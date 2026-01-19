import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const BackButton = ({ color = "#FFF", backgroundColor = 'rgba(139, 0, 0, 0.8)' }) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor }]} 
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-undo" size={20} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  }
});