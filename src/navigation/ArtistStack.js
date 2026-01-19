import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ArtistTabs from './ArtistTabs';
import ArtistSettings from '../screens/artist/ArtistSettings';
import ArtistPortfolio from '../screens/artist/ArtistPortfolio';
import ArtistEditProfile from '../screens/artist/ArtistEditProfile';
import ArtistReviews from '../screens/artist/ArtistReviews';
import ArtistProfileView from '../screens/artist/ArtistProfileView';
import ArtistPortfolioDetail from '../screens/artist/ArtistPortfolioDetail';
import ArtistFlashDetail from '../screens/artist/ArtistFlashDetail';

const Stack = createStackNavigator();

export default function ArtistStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={ArtistTabs} />
      <Stack.Screen name="ArtistSettings" component={ArtistSettings} />
      <Stack.Screen name="ArtistPortfolio" component={ArtistPortfolio} />
      <Stack.Screen name="ArtistEditProfile" component={ArtistEditProfile} />
      <Stack.Screen name="Reviews" component={ArtistReviews} />
      <Stack.Screen name="ArtistProfileView" component={ArtistProfileView} /> 
      <Stack.Screen name="ArtistPortfolioDetail" component={ArtistPortfolioDetail} />
      <Stack.Screen name="ArtistFlashDetail" component={ArtistFlashDetail} />
    </Stack.Navigator>
  );
}