import { Feather as Icon } from '@expo/vector-icons';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { PlybackContainer, PlaybackName } from './styles';

interface MiniPlayerProps {
  onPress: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({
  onPress,
}: MiniPlayerProps) => {
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <PlybackContainer>
        <PlaybackName>Metronomy - The Bay</PlaybackName>
        <Icon name="play-circle" color="white" size={24} />
      </PlybackContainer>
    </TouchableWithoutFeedback>
  );
};

export default MiniPlayer;
