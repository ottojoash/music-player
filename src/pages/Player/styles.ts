import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #121212;
`;

export const Header = styled.View`
  padding-top: ${getStatusBarHeight() + 24}px;
`;

export const Content = styled.View`
  margin: 16px;
`;

export const DownButton = styled.TouchableOpacity`
  padding: 16px;
`;

export const PlaybackContainer = styled.View``;

export const LoadingContainer = styled.View`
  height: 456px;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.Text`
  margin-top: 14px;
  font-size: 28px;
  color: #a6a6a6;
`;

export const PlaybackImage = styled.Image`
  width: ${WINDOW_WIDTH - 32}px;
  height: ${WINDOW_WIDTH - 32}px;
  margin: 16px 0;
`;

export const PlaybackName = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #f4ede8;
`;

export const PlaybackAuthor = styled.Text`
  font-size: 20px;
  color: #a6a6a6;
`;

export const SliderContainer = styled.View`
  margin-top: 60px;
`;

export const Slider = styled.Slider``;

export const SliderInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
`;

export const SliderText = styled.Text`
  color: #a6a6a6;
`;

export const ControlsContainer = styled.View`
  margin-top: 8px;
  padding: 0 80px;
`;

export const ControlsContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
