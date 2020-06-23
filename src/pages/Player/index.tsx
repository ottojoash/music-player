import { Ionicons as PlayerIcon, Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/src/Audio/Sound';
import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import {
  Container,
  Content,
  Header,
  DownButton,
  PlaybackContainer,
  LoadingContainer,
  LoadingText,
  PlaybackImage,
  PlaybackName,
  PlaybackAuthor,
  SliderContainer,
  Slider,
  SliderInfoContainer,
  SliderText,
  ControlsContainer,
  ControlsContent,
} from './styles';

const playlist = [
  {
    name: 'Sorry',
    author: 'Comfort Fit',
    uri:
      'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
    imageSource:
      'https://i.scdn.co/image/ab67616d00001e02420b2459f35e0fc98bcab288',
  },
  {
    name: 'All Of Me',
    author: 'Mildred Bailey',
    uri:
      'https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3',
    imageSource:
      'https://i.scdn.co/image/ab67616d00001e021c40418d1c37d727e8e91b04',
  },
  {
    name: 'Hamlet - Act I',
    author: 'William Shakespeare',
    uri:
      'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
    imageSource:
      'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
  },
];

interface PlayerProps {
  onPress: () => void;
}

const Player: React.FC<PlayerProps> = ({ onPress }: PlayerProps) => {
  const [playbackInstance, setPlaybackInstance] = useState<Sound | null>(null);
  const [playbackInstancePosition, setPlaybackInstancePosition] = useState<
    number
  >(0);
  const [playbackInstanceDuration, setPlaybackInstanceDuration] = useState<
    number
  >(0);
  const [playbackName, setPlaybackName] = useState('');
  const [playbackIndex, setPlaybackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuffering, setBuffeing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isSeeking, setIsSeekink] = useState(false);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false);

  const navigation = useNavigation();

  const updateScreenForLoading = useCallback(
    (_isLoading) => {
      setIsLoading(_isLoading);
      setPlaybackName(
        _isLoading ? '... loading ...' : playlist[playbackIndex].name,
      );

      if (_isLoading) {
        setIsPlaying(false);
        setPlaybackInstancePosition(0);
        setPlaybackInstanceDuration(0);
      }
    },
    [playbackIndex],
  );

  const advancePlaybackIndex = useCallback((forward) => {
    setPlaybackIndex(
      (prevState) =>
        (prevState + (forward ? 1 : playlist.length - 1)) % playlist.length,
    );
  }, []);

  const onPlaybackStatusUpdate = useCallback(
    (status) => {
      if (status.error) {
        console.error(`FATAL PLAYER ERROR: ${status.error}`);
        return;
      }

      if (status.isLoaded) {
        setPlaybackInstancePosition(status.positionMillis);
        setPlaybackInstanceDuration(status.durationMillis);
        setIsPlaying(status.isPlaying);
        setBuffeing(status.isBuffering);
        setIsMuted(status.isMuted);

        if (status.didJustFinish && !status.isLooping) {
          advancePlaybackIndex(true);
        }
      }
    },
    [advancePlaybackIndex],
  );

  const loadNewPlaybackInstance = useCallback(async () => {
    if (playbackInstance != null) {
      await playbackInstance.unloadAsync();
      setPlaybackInstance(null);
    }

    const source = { uri: playlist[playbackIndex].uri };
    const initialStatus = {
      shouldPlay,
      isMuted,
    };

    const { sound } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      onPlaybackStatusUpdate,
    );

    setPlaybackInstance(sound);

    updateScreenForLoading(false);
  }, [playbackIndex, isMuted, shouldPlay]);

  useEffect(() => {
    loadNewPlaybackInstance();
  }, [loadNewPlaybackInstance]);

  useEffect(() => {
    Audio.setAudioModeAsync({
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      staysActiveInBackground: false,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  const handleForwardButton = useCallback(() => {
    if (playbackInstance != null) {
      advancePlaybackIndex(true);
      setShouldPlay(true);
      updateScreenForLoading(true);
    }
  }, [advancePlaybackIndex, playbackInstance, updateScreenForLoading]);

  const handleBackButton = useCallback(() => {
    if (playbackInstance != null) {
      advancePlaybackIndex(false);
      setShouldPlay(true);
      updateScreenForLoading(true);
    }
  }, [advancePlaybackIndex, playbackInstance, updateScreenForLoading]);

  const handleTogglePlay = useCallback(() => {
    if (playbackInstance != null) {
      if (isPlaying) {
        playbackInstance.pauseAsync();
      } else {
        playbackInstance.playAsync();
      }
    }
  }, [isPlaying, playbackInstance]);

  const getSeekSliderPosition = useCallback(() => {
    if (
      playbackInstance &&
      playbackInstancePosition &&
      playbackInstanceDuration
    ) {
      return playbackInstancePosition / playbackInstanceDuration;
    }

    return 0;
  }, [playbackInstance, playbackInstanceDuration, playbackInstancePosition]);

  const handleSeekSliderValueChange = useCallback(
    (value) => {
      if (playbackInstance && !isSeeking) {
        setIsSeekink(true);
        setShouldPlayAtEndOfSeek(isPlaying);
        playbackInstance.pauseAsync();
      }
    },
    [isPlaying, isSeeking, playbackInstance],
  );

  const handleSeekSliderSlidingComplete = useCallback(
    async (value) => {
      if (playbackInstance && playbackInstanceDuration) {
        setIsSeekink(false);

        const seekPosition = value * playbackInstanceDuration;

        if (shouldPlayAtEndOfSeek) {
          playbackInstance.playFromPositionAsync(seekPosition);
        } else {
          playbackInstance.setPositionAsync(seekPosition);
        }
      }
    },
    [playbackInstance, playbackInstanceDuration, shouldPlayAtEndOfSeek],
  );

  const formatToMinutesSeconds = useCallback((millis): string => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (value: number): string => {
      const valueAsString = value.toString();

      if (value < 10) {
        return `0${valueAsString}`;
      }

      return valueAsString;
    };

    return `${padWithZero(minutes)}:${padWithZero(seconds)}`;
  }, []);

  const getPlaybackInstancePosition = useCallback((): string => {
    if (playbackInstance && playbackInstancePosition >= 0) {
      return `${formatToMinutesSeconds(playbackInstancePosition)}`;
    }

    return '';
  }, [formatToMinutesSeconds, playbackInstance, playbackInstancePosition]);

  const getPlaybackInstanceDuration = useCallback((): string => {
    if (playbackInstance && playbackInstanceDuration) {
      return `${formatToMinutesSeconds(playbackInstanceDuration)}`;
    }

    return '';
  }, [formatToMinutesSeconds, playbackInstance, playbackInstanceDuration]);

  return (
    <Container>
      <Header>
        <DownButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-down" color="#fff" size={32} />
        </DownButton>
      </Header>

      <Content>
        {isLoading ? (
          <LoadingContainer>
            <LoadingText>...Loading...</LoadingText>
          </LoadingContainer>
        ) : (
          <PlaybackContainer>
            <PlaybackImage
              source={{ uri: playlist[playbackIndex].imageSource }}
            />
            <PlaybackName>{playbackName}</PlaybackName>
            <PlaybackAuthor>{playlist[playbackIndex].author}</PlaybackAuthor>
          </PlaybackContainer>
        )}

        <SliderContainer>
          <Slider
            value={getSeekSliderPosition()}
            onValueChange={handleSeekSliderValueChange}
            onSlidingComplete={handleSeekSliderSlidingComplete}
            minimumTrackTintColor="#f4ede8"
            maximumTrackTintColor="#898989"
            thumbTintColor="#f4ede8"
            disabled={isLoading}
          />

          <SliderInfoContainer>
            <SliderText>{getPlaybackInstancePosition()}</SliderText>
            <SliderText>{isBuffering ? '...buffering...' : ''}</SliderText>
            <SliderText>{getPlaybackInstanceDuration()}</SliderText>
          </SliderInfoContainer>
        </SliderContainer>

        <ControlsContainer>
          <ControlsContent>
            <TouchableOpacity onPress={handleBackButton} disabled={isLoading}>
              <PlayerIcon name="ios-skip-backward" size={36} color="#f4ede8" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleTogglePlay()}
              disabled={isLoading}
            >
              <PlayerIcon
                name={!isPlaying ? 'ios-play-circle' : 'ios-pause'}
                size={72}
                color="#f4ede8"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleForwardButton}
              disabled={isLoading}
            >
              <PlayerIcon name="ios-skip-forward" size={36} color="#f4ede8" />
            </TouchableOpacity>
          </ControlsContent>
        </ControlsContainer>
      </Content>
    </Container>
  );
};

export default Player;
