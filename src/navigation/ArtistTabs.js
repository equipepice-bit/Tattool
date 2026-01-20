import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ArtistHome from '../screens/artist/ArtistHome';
import ArtistSchedules from '../screens/artist/ArtistSchedules';

const Tab = createBottomTabNavigator();

export default function ArtistTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#5D0000',
        tabBarInactiveTintColor: '#5D0000',
        // AJUSTE PARA CENTRALIZAR OS ÍCONES:
        tabBarItemStyle: {
          justifyContent: 'center', // Centraliza verticalmente dentro da barra
          height: 70,               // Mesma altura da barra
        },
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={ArtistHome} 
      />
    </Tab.Navigator>
  );
}