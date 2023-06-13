import { useRef, useEffect, useState, useCallback } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';

import type { InteractionEvent } from '@fluentui-react-native/interactive-hooks';

import type { DrawerProps, DrawerInfo } from './Drawer.types';

const { height, width } = Dimensions.get('window');
const WINDOW_HEIGHT = height;

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.5;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 1;

export const useDrawer = (props: DrawerProps): DrawerInfo => {
  const { onBlur, onFocus, accessibilityLabel, open, drawerPosition = 'left', showHandle = true, children, ...rest } = props;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [internalOpen, setInternalOpen] = useState(open);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const animatedValueP = useRef(new Animated.Value(0)).current;

  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
          lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
        } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
          lastGestureDy.current = gesture.dy;
        }

        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          // dragging up
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;

  const springAnimation = (direction: 'up' | 'down') => {
    console.log('springAnimation', direction, lastGestureDy.current);
    if (lastGestureDy.current >= 100) {
      Animated.parallel([
        Animated.spring(animatedValue, {
          toValue: lastGestureDy.current,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setInternalOpen(false);
      });
      return;
    }

    lastGestureDy.current = direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  useEffect(() => {
    if (open) {
      setInternalOpen(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      if (isFirstOpen) {
        setIsFirstOpen(false);
      } else {
        Animated.parallel([
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setInternalOpen(false);
        });
      }
    }
  }, [animatedValue, open]);

  const onClose = useCallback(
    (e: InteractionEvent) => {
      props?.onClose && props.onClose(e);
    },
    [props?.onClose],
  );

  const onScrimClick = useCallback(
    (e: InteractionEvent) => {
      props?.onScrimClick && props.onScrimClick(e);
    },
    [props?.onScrimClick],
  );

  const animatedTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: drawerPosition === 'left' ? [-width * 0.8, 0] : drawerPosition === 'right' ? [width * 0.8, 0] : [0, 0],
  });

  const animatedTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height, height * 0.5],
  });

  const animatedOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const animatedStyle = {
    transform:
      drawerPosition === 'left' || drawerPosition === 'right' ? [{ translateX: animatedTranslateX }] : [{ translateY: animatedTranslateY }],
  };

  return {
    props: {
      ...rest,
      onClose,
      onScrimClick,
      animationConfig: {
        animatedOpacity,
        animatedStyle,
      },
      drawerPosition: drawerPosition ?? 'left',
      children,
      showHandle,
      panResponder,
      bottomSheetAnimation,
      open: internalOpen,
    },
  };
};
