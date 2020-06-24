import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, StatusBar } from 'react-native';

import Routes from './src/Routes';
import AppProvider from './src/hooks';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#121212"
        translucent
      />

      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#121212' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
