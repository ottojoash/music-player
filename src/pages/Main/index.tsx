import { useNavigation } from '@react-navigation/native';
import React from 'react';

import MiniPlayer from '../../components/MiniPlayer';
import mock from '../../services/playbackListMock';
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
  const navigation = useNavigation();

  const playbackListMock: Playback[] = mock;

  return (
    <>
      <Container>
        <Header>
          <SearchContainer>
            <SearchIcon name="search" color="#666360" size={20} />

            <SearchTextInput
              placeholder="Find your favorite artists"
              placeholderTextColor="#666360"
            />
          </SearchContainer>
        </Header>

        <PlaybackList
          data={playbackListMock}
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
