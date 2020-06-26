import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';

import MiniPlayer from '../../components/MiniPlayer';
import { usePlaylist } from '../../hooks/Playlist';
import spotifySearch from '../../services/spotifySearch';
import spotifyToken from '../../services/spotifyToken';
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
  EmptyList,
  PlaybackContainer,
  PlaybackImage,
  PlaybackInfo,
  PlaybackName,
  PlaybackAuthor,
  PlayerContainer,
} from './styles';

const PAGE_LIMIT = 10;

const Main: React.FC = () => {
  const [search, setSearch] = useState('');
  const [playlist, setPlaylist] = useState<Playback[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isTokenFetching, setIsTokenFetching] = useState(false);

  const navigation = useNavigation();
  const songs = usePlaylist().playlist;

  useEffect(() => setPlaylist(songs), [songs]);

  const refreshToken = useCallback(async () => {
    setIsTokenFetching(true);

    const newToken = await spotifyToken();

    setIsTokenFetching(false);

    return newToken;
  }, []);

  const loadNextPage = useCallback(async () => {
    if (isFetching || isEmpty) {
      console.log('isFetching', isFetching);
      console.log('isEmpty', isEmpty);
      return;
    }

    setIsFetching(true);

    const spotify_token = await refreshToken();

    console.log('limit', PAGE_LIMIT);
    console.log('query', search);
    console.log('aspotify_token', spotify_token);

    const newSongs = await spotifySearch({
      limit: PAGE_LIMIT,
      query: search,
      spotify_token,
    });

    if (newSongs.length === 0) {
      console.log('no songs found. there may be an error');

      // setIsEmpty(true);
    }

    setIsFetching(false);
    setPlaylist([...playlist, ...newSongs]);
  }, [isEmpty, isFetching, playlist, search]);

  useEffect(() => {
    const loadSongs = async (): Promise<void> => {
      await loadNextPage();
    };

    if (search.length >= 3) {
      setIsEmpty(false);
      setPlaylist([]);

      loadSongs();
    }
  }, [search]);

  const handleEndReached = useCallback(async () => {
    await loadNextPage();
  }, [loadNextPage]);

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
              onChangeText={(text) => setSearch(text)}
            />
          </SearchContainer>
        </Header>

        {isFetching && playlist.length === 0 ? (
          <ActivityIndicator />
        ) : (
          <PlaybackList
            data={playlist}
            keyExtractor={(playback) => String(playback.id)}
            ListHeaderComponent={
              <PlaybackListTitle>Playlist</PlaybackListTitle>
            }
            ItemSeparatorComponent={() => <PlaybackSeparator />}
            ListEmptyComponent={() => <EmptyList>No songs found</EmptyList>}
            onEndReached={() => handleEndReached()}
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
        )}

        <PlayerContainer>
          <MiniPlayer
            onPress={() => navigation.navigate('Player')}
            disabled={playlist.length === 0}
          />
        </PlayerContainer>
      </Container>
    </>
  );
};

export default Main;
