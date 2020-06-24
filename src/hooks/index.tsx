import React from 'react';

import { PlaylistProvider } from './Playlist';

const AppProvider: React.FC = ({ children }) => (
  <PlaylistProvider>{children}</PlaylistProvider>
);

export default AppProvider;
