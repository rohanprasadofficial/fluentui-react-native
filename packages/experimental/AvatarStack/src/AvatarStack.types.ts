import type { ViewProps, ColorValue } from 'react-native';

import type { IconPropsV1 as IconProps } from '@fluentui-react-native/icon';
import type { TextProps } from '@fluentui-react-native/text';
import type { LayoutTokens, FontTokens } from '@fluentui-react-native/tokens';

export const AvatarStackName = 'AvatarStack';

export const AvatarStackInsetSizes = [0, 16, 56, 68, 72, 108] as const;
export type AvatarStackInsetSize = (typeof AvatarStackInsetSizes)[number];
export type AvatarStackAlignment = 'start' | 'center' | 'end';
export type AvatarStackAppearance = 'default' | 'subtle' | 'brand' | 'strong';

export interface AvatarStackProps {
  /**
   * If a text or icon is passed, this dictates where content appears in the AvatarStack: at the start, centered, or towards the end.
   * @default 'center'
   * Note: This prop is not supported on mobile platforms(Android & iOS).
   */
  alignContent?: AvatarStackAlignment;
  /**
   * If no color tokens are set, the AvatarStack and its content are colored using different theme tokens depending on the value of this prop.
   * @default 'default'
   * Note: This prop is not supported on mobile platforms(Android & iOS).
   */
  appearance?: AvatarStackAppearance;
  /**
   * Pass an icon source to render an icon as content in the AvatarStack. Will not render if text is passed via children.
   * Note: This prop is not supported on mobile platforms(Android & iOS).
   */
  icon?: IconProps;
  /**
   * The size of the AvatarStack inset - the margin before the start and after the end of the AvatarStack.
   * @default 0
   * Note : For mobile platforms, the insetSize prop is only applied to start of the component.
   */
  insetSize?: AvatarStackInsetSize;
  /**
   * Whether the AvatarStack is rendered as a horizontal line or a vertical line.
   * @default false
   * Note: This prop is not supported on mobile platforms(Android & iOS).
   */
  vertical?: boolean;
}

export interface AvatarStackTokens extends LayoutTokens, Omit<FontTokens, 'fontDynamicTypeRamp' | 'fontMaximumSize'> {
  /**
   * The color of the content passed into the AvatarStack.
   */
  contentColor?: ColorValue;
  /**
   * The padding of AvatarStack content between the start and end lines.
   * @default 12
   */
  contentPadding?: string | number;
  /**
   * The flex value of the line after content, set to 0 if `alignContent` = `end`.
   * @default 1
   */
  flexAfter?: number;
  /**
   * The flex value of the line before content, set to 0 if `alignContent` = `start`.
   * @default 1
   */
  flexBefore?: number;
  /**
   * Color of the AvatarStack lines.
   */
  lineColor?: ColorValue;
  /**
   * The minimum size of a line shrunken by a non-centered AvatarStack.
   * @default 8
   */
  minLineSize?: number;
  /**
   * The thickness of the AvatarStack lines
   * @default 1
   */
  thickness?: number;
}

export interface AvatarStackSlotProps {
  root: ViewProps;
  beforeLine: ViewProps;
  afterLine: ViewProps;
  wrapper: ViewProps;
  text: TextProps;
  icon: IconProps;
}

export interface AvatarStackType {
  props: AvatarStackProps;
  tokens: AvatarStackTokens;
  slotProps: AvatarStackSlotProps;
}
