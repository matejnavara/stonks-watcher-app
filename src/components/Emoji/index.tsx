import React from 'react';
import {Text} from 'react-native';

interface EmojiProps {
  symbol: string;
  label?: string;
}

const Emoji = ({symbol, label}: EmojiProps) => (
  <Text
    accessibilityRole="image"
    accessibilityLabel={label ? label : ''}
    accessible={!!label}>
    {symbol}
  </Text>
);

export default Emoji;
