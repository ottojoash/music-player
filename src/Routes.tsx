import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Main from './pages/Main';
import Player from './pages/Player';

const AppStack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5',
          },
        }}
      >
        <AppStack.Screen name="Main" component={Main} />
        <AppStack.Screen name="Player" component={Player} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
