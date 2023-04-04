import type React from 'react';
import type { Animated, LayoutChangeEvent, View } from 'react-native';

import type { InteractionEvent } from '@fluentui-react-native/interactive-hooks';

import type { MenuListProps } from '../MenuList/MenuList.types';

export const menuName = 'Menu';

export interface MenuProps extends MenuListProps {
  /**
   * Whether the popup is open on mount
   */
  defaultOpen?: boolean;

  /**
   * How much delay to have between hover in and showing the menu, in ms.
   */
  hoverDelay?: number;

  /**
   * Whether the popup is open
   */
  open?: boolean;

  /**
   *  Call back when the component request value change via controlled state variable
   */
  setControlledOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Call back when the component requests to change value
   */
  onOpenChange?: (e: InteractionEvent, isOpen: boolean) => void;

  /*
   * Opens the menu on hovering over the trigger
   */
  openOnHover?: boolean;

  /**
   * Do not dismiss the menu when a menu item is clicked
   */
  persistOnItemClick?: boolean;
}

export type MenuSizeType = {
  width: Animated.Value;
  height: Animated.Value;
};

export interface MenuState extends MenuProps {
  isControlled: boolean;
  isSubmenu: boolean;
  setControlledOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parentPopoverHoverOutTimer?: NodeJS.Timeout;
  setOpen: (e: InteractionEvent, isOpen: boolean, bubble?: boolean) => void;
  shouldFocusOnContainer: boolean;
  triggerRef: React.RefObject<View>;
  hasMaxHeight?: boolean;
  hasMaxWidth?: boolean;
  setAnchorHeight?: (value: null | number | ((prevState: null | number) => null | number)) => void;
  setAnchorWidth?: (value: null | number | ((prevState: null | number) => null | number)) => void;
  shadowMenuContainerStyle?: object;
  _container?: React.MutableRefObject<View>;
  onRequestClose?: (e: InteractionEvent) => void;
  onMenuLayout?: (e: LayoutChangeEvent) => void;
  menuHeight?: number;
  maxMenuHeight?: number;
  animationStarted?: boolean;
  menuSize?: MenuSizeType;
  testID?: string;
}

export enum AndroidMenuStates {
  Hidden,
  Animating,
  Shown,
}
