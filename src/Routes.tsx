import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Main from './pages/Main';
import Player from './pages/Player';

const AppStack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <AppStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#121212',
        },
      }}
    >
      <AppStack.Screen name="Main" component={Main} />
      <AppStack.Screen name="Player" component={Player} />
    </AppStack.Navigator>
  );
};

export default Routes;
