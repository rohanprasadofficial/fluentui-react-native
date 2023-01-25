import { Animated, ColorValue } from 'react-native';
import { SvgProps } from 'react-native-svg';

export const activityIndicatorName = 'ActivityIndicator';
/**
 * Specifies the possible sizes of the ActivityIndicator.
 */
export type ActivityIndicatorSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';

export interface ActivityIndicatorTokens {
  /**
   * ActivityIndicator element color
   * @defaultValue 'grey56' for light mode, 'grey72' for dark mode
   */
  activityIndicatorColor?: ColorValue;
  /**
   * Line thickness of the ActivityIndicator
   * @defaultValue 'medium' or what size is set to
   */
  lineThickness?: ActivityIndicatorSize;
  /**
   * Size of the ActivityIndicator view
   * @defaultValue 'medium'
   */
  size?: ActivityIndicatorSize;
}

export interface ActivityIndicatorProps extends ActivityIndicatorTokens {
  /**
   * ActivityIndicator animating or not
   * @defaultValue 'true'
   */
  animating?: boolean;
  /**
   * ActivityIndicator hidden when not animating or not hidden
   * @defaultValue 'true'
   */
  hidesWhenStopped?: boolean;
}

export interface FluentActivityIndicatorSlotProps {
  root: ActivityIndicatorProps;
  svg: Animated.AnimatedProps<SvgProps>;
}
export interface FluentActivityIndicatorType {
  props: ActivityIndicatorProps;
  slotProps: FluentActivityIndicatorSlotProps;
  tokens: ActivityIndicatorTokens;
}
