import { Theme } from '@fluentui-react-native/framework';
import { TokenSettings } from '@fluentui-react-native/use-styling';
import { SwitchTokens } from './Switch.types';

export const defaultSwitchTokens: TokenSettings<SwitchTokens, Theme> = (t: Theme) => ({
  borderRadius: 26,
  thumbSize: 26,
  thumbRadius: 26,
  trackHeight: 32,
  trackWidth: 52,
  thumbMargin: 3,
  trackMarginTop: 2,
  trackMarginBottom: 2,
  trackMarginLeft: 2,
  trackMarginRight: 2,

  beforeContent: {
    trackMarginLeft: 8,
  },

  afterContent: {
    trackMarginRight: 8,
  },

  before: {
    flexDirection: 'row',
    toggleContainerFlexDirection: 'row',
  },

  above: {
    flexDirection: 'column',
    toggleContainerFlexDirection: 'row',
  },

  after: {
    flexDirection: 'row-reverse',
    toggleContainerFlexDirection: 'row-reverse',
  },

  toggleOn: {
    trackColor: t.colors.brandBackground,
    thumbColor: t.colors.neutralBackgroundLightStatic,
    justifyContent: 'flex-end',
    disabled: {
      trackColor: t.colors.brandBackgroundDisabled,
      thumbColor: t.colors.neutralBackgroundLightStaticDisabled,
    },
  },
  toggleOff: {
    trackColor: t.colors.neutralBackground5,
    thumbColor: t.colors.neutralBackgroundLightStatic,
    justifyContent: 'flex-start',
    disabled: {
      trackColor: t.colors.neutralBackground5,
      thumbColor: t.colors.neutralBackgroundLightStaticDisabled,
    },
  },
});
