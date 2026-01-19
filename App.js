import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Contextos
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext'; // <--- 1. IMPORTAR O THEME

// Stacks de Navegação
import AuthStack from './src/navigation/AuthStack';
import ArtistStack from './src/navigation/ArtistStack';

// Telas do Cliente
import Home from './src/screens/client/Home';
import Favorites from './src/screens/client/Favorites';
import ArtistProfile from './src/screens/client/ArtistProfile';
import PortfolioDetail from './src/screens/client/PortfolioDetail';
import FlashDetail from './src/screens/client/FlashDetail';
import Budget from './src/screens/client/Budget';
import Settings from './src/screens/client/Settings';

const Stack = createStackNavigator();

function ClientStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="ArtistProfile" component={ArtistProfile} />
      <Stack.Screen name="PortfolioDetail" component={PortfolioDetail} />
      <Stack.Screen name="FlashDetail" component={FlashDetail} />
      <Stack.Screen name="Budget" component={Budget} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function RootNavigation() {
  const { userType } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!userType ? (
        <AuthStack />
      ) : userType === 'client' ? (
        <ClientStack />
      ) : (
        <ArtistStack />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        {/* 2. ENVOLVER TUDO COM O THEMEPROVIDER */}
        <ThemeProvider> 
          <RootNavigation />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}