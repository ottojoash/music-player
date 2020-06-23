import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import { Playback } from './model/Playback';

export const Container = styled.View`
  flex: 1;
  background: #121212;
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight() + 24}px 24px;
`;

export const SearchContainer = styled.View`
  height: 60px;
  padding: 0 16px;
  background: #f4ede8;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

export const SearchIcon = styled(Feather)`
  margin-right: 16px;
`;

export const SearchTextInput = styled.TextInput`
  flex: 1;
  color: #272829;
  font-size: 16px;
`;

export const PlaybackList = styled(FlatList as new () => FlatList<Playback>)`
  padding: 0 24px 0;
`;

export const PlaybackListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: #f4ede8;
`;

export const PlaybackSeparator = styled.View`
  height: 1px;
  width: 78%;
  margin-left: 22%;
  background: #272829;
`;

export const PlaybackContainer = styled(RectButton)`
  background: #121212;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const PlaybackImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 5px;
  border-width: 2px;
`;

export const PlaybackInfo = styled.View`
  margin-left: 14px;
`;

export const PlaybackName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #f4ede8;
`;

export const PlaybackAuthor = styled.Text`
  color: #a6a6a6;
`;

export const PlayerContainer = styled.View`
  padding: 5px 0;
  height: 70px;
  flex-direction: row;
  align-items: center;
`;
