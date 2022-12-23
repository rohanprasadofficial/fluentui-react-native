import * as React from 'react';
import {
  usePressableState,
  useKeyProps,
  useOnPressWithFocus,
  useViewCommandFocus,
  InteractionEvent,
} from '@fluentui-react-native/interactive-hooks';
import { SwitchProps, SwitchInfo } from './Switch.types';
import { AccessibilityState, AccessibilityActionEvent, Animated, Platform } from 'react-native';
import { memoize } from '@fluentui-react-native/framework';
import { useAsToggleWithEvent } from '@fluentui-react-native/interactive-hooks';

const defaultAccessibilityActions = [{ name: 'Toggle' }];

export const useSwitch = (
  props: SwitchProps,
  bgColor?: { on: string; off: string; width: number; thumbWidth: number; thumbMargin: number },
): SwitchInfo => {
  const defaultComponentRef = React.useRef(null);
  const {
    onChange,
    checked,
    defaultChecked,
    label,
    labelPosition,
    componentRef = defaultComponentRef,
    disabled,
    accessibilityRole,
    accessibilityLabel,
    accessibilityActions,
    accessibilityState,
    accessibilityHint,
    onAccessibilityAction,
    ...rest
  } = props;

  const onChangeWithAnimation = React.useCallback(
    (e: InteractionEvent, checked?: boolean) => {
      onChange && onChange(e, checked);
      if (Platform.OS === 'android') {
        if (checked) {
          startAnimatiobgn(checked);
          startAnimation();
        } else {
          startAnimatiobgn(checked);
          startAnimation2();
        }
      }
    },
    [onChange],
  );

  console.log('CHecked' + checked);
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const [animationbg, setAnimationbg] = React.useState(new Animated.Value(0));

  const [checkedState, toggleCallback] = useAsToggleWithEvent(defaultChecked, checked, onChangeWithAnimation);

  const switchAnimationStyles = {
    thumbAnimatedStyle: {
      transform: [
        {
          translateX: animation,
        },
      ],
    },
    trackBackgroundStyle: {
      backgroundColor: animationbg.interpolate({
        inputRange: [0, 1],
        outputRange: checkedState ? [bgColor.on, bgColor.on] : [bgColor.off, bgColor.off],
      }),
    },
  };

  console.log('switchAnimationStyles : ', switchAnimationStyles);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: bgColor.width - (bgColor.thumbWidth + bgColor.thumbMargin * 2),
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const startAnimatiobgn = (checked) => {
    const toValue = checked ? 0 : 1;
    Animated.timing(animationbg, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const startAnimation2 = (first = false) => {
    Animated.timing(animation, {
      toValue: first ? 0 : -(bgColor.width + bgColor.thumbWidth),
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  if (Platform.OS === 'android') {
    if (checkedState) {
      startAnimation();
      startAnimatiobgn(true);
    } else {
      startAnimation2(true);
      startAnimatiobgn(false);
    }
  }

  const focusRef = disabled ? null : componentRef;

  if (__DEV__ && defaultChecked !== undefined && checked !== undefined) {
    console.warn("The props 'defaultChecked' and 'checked' are mutually exclusive. Use only one of the props, do not use both.");
  }

  if (labelPosition === 'after' || labelPosition === undefined) {
    if (__DEV__ && (!!props.onText || !!props.offText)) {
      console.warn(
        "The prop labelPosition's value of \"after\" and the props 'onText' or 'offText' are mutually exclusive. Try setting 'labelPosition' value to \"before\" or \"above\" instead.",
      );
    }
    props.onText = null;
    props.offText = null;
  }

  const onClickWithFocus = useOnPressWithFocus(focusRef, toggleCallback);
  const pressable = usePressableState({ ...rest, onPress: onClickWithFocus });
  const onKeyUpProps = useKeyProps(toggleCallback, ' ', 'Enter');

  const accessibilityActionsProp = accessibilityActions
    ? [...defaultAccessibilityActions, ...accessibilityActions]
    : defaultAccessibilityActions;

  const onAccessibilityActionProp = React.useCallback(
    (event: AccessibilityActionEvent) => {
      switch (event.nativeEvent.actionName) {
        case 'Toggle':
          toggleCallback(event);
          break;
      }
      onAccessibilityAction && onAccessibilityAction(event);
    },
    [toggleCallback, onAccessibilityAction],
  );

  return {
    props: {
      accessible: true,
      accessibilityLabel: accessibilityLabel ?? label,
      accessibilityRole: accessibilityRole ?? 'switch',
      accessibilityActions: accessibilityActionsProp,
      onAccessibilityAction: onAccessibilityActionProp,
      accessibilityState: getAccessibilityState(checkedState, disabled, accessibilityState),
      disabled,
      switchAnimationStyles: switchAnimationStyles,
      focusable: !disabled,
      ref: useViewCommandFocus(componentRef),
      checked: checkedState,
      labelPosition: labelPosition ?? 'after',
      ...pressable.props,
      ...onKeyUpProps,
      ...props,
    },
    state: {
      ...pressable.state,
      toggled: checkedState,
    },
  };
};

const getAccessibilityState = memoize(getAccessibilityStateWorker);
function getAccessibilityStateWorker(checked: boolean, disabled: boolean, accessibilityState?: AccessibilityState) {
  if (accessibilityState) {
    return { checked, disabled, ...accessibilityState };
  }
  return { checked, disabled };
}
