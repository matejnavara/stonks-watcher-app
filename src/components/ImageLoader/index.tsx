import React from 'react';
import {Animated, ImageProps} from 'react-native';

const ImageLoader = (props: ImageProps) => {
  const opacity = new Animated.Value(0);

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.Image
      onLoad={onLoad}
      {...props}
      style={[
        {
          opacity: opacity,
          transform: [
            {
              scale: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0.85, 1],
              }),
            },
          ],
        },
        props.style,
      ]}
    />
  );
};

export default ImageLoader;
