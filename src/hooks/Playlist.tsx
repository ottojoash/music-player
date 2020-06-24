import React, { createContext, useState, useContext, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import { Playback } from '../pages/Main/model/Playback';
import playbackListMock from '../services/playbackListMock';

interface PlaylistContextData {
  playlist: Playback[];
}

const PlaylistContext = createContext<PlaylistContextData>(
  {} as PlaylistContextData,
);

const APP_STORAGE = '@MusicPlayer:playlist';

const PlaylistProvider: React.FC = ({ children }) => {
  const [playlist, setPlaylist] = useState<Playback[]>([]);

  useEffect(() => {
    const loadStorageData = async (): Promise<void> => {
      const storagedPlaylist = await AsyncStorage.getItem(APP_STORAGE);

      if (storagedPlaylist) {
        setPlaylist(JSON.parse(storagedPlaylist));
        return;
      }

      setPlaylist(playbackListMock);
    };

    loadStorageData();
  }, []);

  return (
    <PlaylistContext.Provider value={{ playlist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = (): PlaylistContextData => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { PlaylistProvider, usePlaylist };
