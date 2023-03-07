import React, { useEffect, useRef, useState } from 'react';
import {
  LayoutRectangle,
  View,
  StyleSheet,
  I18nManager,
  ScrollView,
  Platform,
  StyleProp,
  ViewStyle,
  UIManager,
  Pressable,
} from 'react-native';
import { Dimensions, Easing, Animated } from 'react-native';

import { stagedComponent } from '@fluentui-react-native/framework';

import type { MenuProps } from './Menu.types';
import Surface from './Surface';
import { useMenu } from './useMenu';
import { useMenuContextValue } from './useMenuContextValue';
import Portal from '../../../../experimental/Portal/src/PortalPP/Portal';
import { MenuProvider } from '../context/menuContext';
import { LayoutEvent } from '@fluentui-react-native/interactive-hooks';
export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

// Minimum padding between the edge of the screen and the menu
const SCREEN_INDENT = 8;
// From https://material.io/design/motion/speed.html#duration
const ANIMATION_DURATION = 250;
// From the 'Standard easing' section of https://material.io/design/motion/speed.html#easing
const EASING = Easing.bezier(0.4, 0, 0.2, 1);
const WINDOW_LAYOUT = Dimensions.get('window');

type Layout = $Omit<$Omit<LayoutRectangle, 'x'>, 'y'>;

export const MenuAn2 = stagedComponent((props: MenuProps) => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [menuLayout, setMenuLayout] = useState<Layout | undefined>({ width: 0, height: 0 });
  const [anchorLayout, setAnchorLayout] = useState<Layout | undefined>({ width: 0, height: 0 });
  const [opacityAnimation, setOpacityAnimation] = useState(new Animated.Value(0));
  const [scaleAnimation, setScaleAnimationnew] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const [windowLayout, setWindowLayout] = useState({
    width: WINDOW_LAYOUT.width,
    height: WINDOW_LAYOUT.height,
  });

  const [scrollableMenuHeight, setScrollableMenuHeight] = useState(0);
  const state = useMenu(props);
  const contextValue = useMenuContextValue(state);

  return (_rest: MenuProps, children: React.ReactNode | { x: number; y: number }) => {
    const childrenArray = React.Children.toArray(children);

    if (__DEV__) {
      if (childrenArray.length !== 2) {
        // eslint-disable-next-line no-console
        console.warn('Menu must contain two children');
      }
    }
    // I don't know why but on Android measure function is wrong by 24
    const additionalVerticalValue = Platform.select({
      android: 0,
      default: 0,
    });

    const positionStyle = {
      top: top + additionalVerticalValue,
      ...(I18nManager.isRTL ? { right: left } : { left }),
    };

    const menuTrigger = childrenArray[0];
    const menuPopover = childrenArray[1];

    const positionTransforms = [];

    const scaleTransforms = [
      {
        scaleX: scaleAnimation.x.interpolate({
          inputRange: [0, menuLayout.width],
          outputRange: [0, 1],
        }),
      },
      {
        scaleY: scaleAnimation.y.interpolate({
          inputRange: [0, menuLayout.height],
          outputRange: [0, 1],
        }),
      },
    ];

    const shadowMenuContainerStyle = {
      opacity: opacityAnimation,
      transform: scaleTransforms,
      ...(scrollableMenuHeight ? { height: scrollableMenuHeight } : {}),
    };

    const usedd = useRef(0);
    useEffect(() => {
      // Print component dimensions to console
    }, [usedd]);

    return (
      <MenuProvider value={contextValue}>
        <View
          onLayout={(event) => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              console.log({
                x: x + pageX,
                y: y + pageY,
              });
            });
          }}
        >
          {menuTrigger}
        </View>
        {/* GH#2661: Make sure that shouldFocusOnContainer is defined before initializing
            the popover so that focus is put in the correct place */}

        <Portal>
          {state.open && (
            <View collapsable={true} accessibilityViewIsModal={true} style={[styles.wrapper, positionStyle]}>
              {
                <Animated.View style={{ transform: positionTransforms }}>
                  <Surface>
                    {(scrollableMenuHeight && <ScrollView>{menuPopover}</ScrollView>) || <React.Fragment>{menuPopover}</React.Fragment>}
                  </Surface>
                </Animated.View>
              }
            </View>
          )}
        </Portal>
      </MenuProvider>
    );
  };
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  shadowMenuContainer: {
    opacity: 0,
    elevation: 8,
  },
});
MenuAn2.displayName = 'MenuAn2';

export default MenuAn2;
