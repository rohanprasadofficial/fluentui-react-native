import * as React from 'react';
import type { View, StyleProp, ViewStyle } from 'react-native';
import { Animated } from 'react-native';

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Content of the `Surface`.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Surface = ({ style, ...rest }: Props) => {
  return <Animated.View {...rest} style={[{ elevation: 4, borderWidth: 0 }, style]} />;
};

export default Surface;
