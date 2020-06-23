import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/Routes';

const App: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#121212"
        translucent
      />
      <Routes />
    </>
  );
};

export default App;
