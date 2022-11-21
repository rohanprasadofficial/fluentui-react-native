import { Theme } from '@fluentui-react-native/framework';
import { TokenSettings } from '@fluentui-react-native/use-styling';
import { SwitchTokens } from './Switch.types';

export const defaultSwitchTokens: TokenSettings<SwitchTokens, Theme> = (t: Theme) => ({
  borderRadius: 26,
  minHeight: 28,
  minWidth: 40,
  thumbSize: 26,
  thumbRadius: 26,
  trackHeight: 32,
  trackWidth: 52,
  padding: 2,
  thumbMargin: 2,

  toggleOn: {
    trackColor: t.colors.brandBackground,
    thumbColor: '#fff', // Needs to be updated after latest token checkin
    justifyContent: 'flex-end',
    disabled: {
      trackColor: t.colors.brandBackgroundDisabled,
      thumbColor: t.colors.defaultDisabledBackground, // Needs to be updated after latest token checkin
    },
  },

  toggleOff: {
    trackColor: t.colors.brandBackground3,
    thumbColor: t.colors.neutralBackgroundDisabled, // Needs to be updated after latest token checkin
    justifyContent: 'flex-start',
    hovered: {
      trackColor: t.colors.neutralForegroundInvertedLinkHover,
      thumbColor: t.colors.neutralStrokeAccessibleHover,
      borderColor: t.colors.neutralStrokeAccessibleHover,
    },
    pressed: {
      trackColor: t.colors.neutralForegroundOnBrandPressed,
      thumbColor: t.colors.neutralStrokeAccessiblePressed,
      borderColor: t.colors.neutralStrokeAccessiblePressed,
    },
    disabled: {
      trackColor: t.colors.neutralBackgroundDisabled,
      thumbColor: t.colors.neutralStrokeDisabled,
      borderColor: t.colors.neutralStrokeDisabled,
    },
  },

  focused: {
    focusStrokeColor: t.colors.strokeFocus2,
  },
});
