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
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,               // Distância do fundo igual ao cliente
          left: 20,
          right: 20,
          backgroundColor: '#F3EFFF', // Lilás claro do cliente
          height: 70,                 // Altura padrão que você usou
          borderRadius: 35,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          paddingBottom: 0, 
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={ArtistHome} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={32} 
              color="#5D0000" 
              style={{ marginTop: 0 }} 
            />
          )
        }}
      />
      <Tab.Screen 
        name="Schedules" 
        component={ArtistSchedules} 
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons 
              name="feather" 
              size={32} 
              color="#5D0000" 
              style={{ marginTop: 0 }}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}