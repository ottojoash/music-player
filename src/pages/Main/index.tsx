import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import MiniPlayer from '../../components/MiniPlayer';
import { usePlaylist } from '../../hooks/Playlist';
import { Playback } from './model/Playback';
import {
  Container,
  Header,
  SearchContainer,
  SearchIcon,
  SearchTextInput,
  PlaybackList,
  PlaybackListTitle,
  PlaybackSeparator,
  PlaybackContainer,
  PlaybackImage,
  PlaybackInfo,
  PlaybackName,
  PlaybackAuthor,
  PlayerContainer,
} from './styles';

const Main: React.FC = () => {
  const [search, setSearch] = useState('');
  const [playlist, setPlaylist] = useState<Playback[]>([]);

  const navigation = useNavigation();
  const songs = usePlaylist().playlist;

  useEffect(() => setPlaylist(songs), [songs]);

  const handleInputChange = useCallback((value: string) => {
    setSearch(value);

    if (value.length >= 3) {
      console.log('call Spotify API');
    }
  }, []);

  return (
    <>
      <Container>
        <Header>
          <SearchContainer>
            <SearchIcon name="search" color="#666360" size={20} />

            <SearchTextInput
              placeholder="Find your favorite artists"
              placeholderTextColor="#666360"
              value={search}
              onChangeText={handleInputChange}
            />
          </SearchContainer>
        </Header>

        <PlaybackList
          data={playlist}
          keyExtractor={(playback) => String(playback.id)}
          ListHeaderComponent={<PlaybackListTitle>Playlist</PlaybackListTitle>}
          ItemSeparatorComponent={() => <PlaybackSeparator />}
          renderItem={({ item: playback }) => (
            <PlaybackContainer onPress={() => {}}>
              <PlaybackImage source={{ uri: playback.image_source }} />

              <PlaybackInfo>
                <PlaybackName>{playback.name}</PlaybackName>
                <PlaybackAuthor>{playback.author}</PlaybackAuthor>
              </PlaybackInfo>
            </PlaybackContainer>
          )}
        />

        <PlayerContainer>
          <MiniPlayer onPress={() => navigation.navigate('Player')} />
        </PlayerContainer>
      </Container>
    </>
  );
};

export default Main;
