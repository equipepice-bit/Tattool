import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Tag = ({ label }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  tag: {
    borderWidth: 1.5,
    borderColor: '#4A148C',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 8,
  },
  tagText: {
    color: '#4A148C',
    fontWeight: '600',
    fontSize: 13,
  }
});