import type { ViewProps } from 'react-native';

import type { TextProps } from '@fluentui-react-native/text';
import type { IBorderTokens, IColorTokens, LayoutTokens } from '@fluentui-react-native/tokens';

export const portal = 'Portal';
/**
 * This type is an example. Feel free to remove it.
 */
export type TextSize = 'small' | 'medium' | 'large';

export interface PortalTokens extends LayoutTokens, IBorderTokens, IColorTokens {
  small?: PortalTokens;
  medium?: PortalTokens;
  large?: PortalTokens;
}

export interface PortalProps {
  textSize?: TextSize;
  text?: string;
}

export interface PortalSlotProps {
  root: ViewProps;
  text: TextProps;
}

export interface PortalType {
  props: PortalProps;
  tokens: PortalTokens;
  slotProps: PortalSlotProps;
}
