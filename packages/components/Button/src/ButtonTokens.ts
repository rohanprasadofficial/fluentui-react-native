import { Theme } from '@fluentui-react-native/framework';
import { globalTokens } from '@fluentui-react-native/theme-tokens';
import { TokenSettings } from '@fluentui-react-native/use-styling';
import { ButtonTokens } from './Button.types';

export const defaultButtonTokens: TokenSettings<ButtonTokens, Theme> = () =>
  ({
    block: {
      width: '100%',
    },
    medium: {
      padding: globalTokens.size60 - globalTokens.stroke.width10,
      borderWidth: globalTokens.stroke.width10,
      iconSize: 16,
      focused: {
        borderWidth: 0,
        padding: globalTokens.size60,
      },
      hasContent: {
        minWidth: 96,
        paddingHorizontal: globalTokens.size160 - globalTokens.stroke.width10,
        hasIconAfter: {
          spacingIconContentAfter: globalTokens.size60,
        },
        hasIconBefore: {
          spacingIconContentBefore: globalTokens.size60,
        },
        focused: {
          paddingHorizontal: globalTokens.size160,
        },
      },
    },
    small: {
      padding: globalTokens.size80 - globalTokens.stroke.width10,
      borderWidth: globalTokens.stroke.width10,
      iconSize: 16,
      focused: {
        borderWidth: 0,
        padding: globalTokens.size80,
      },
      hasContent: {
        minWidth: 64,
        paddingHorizontal: globalTokens.size120 - globalTokens.stroke.width10,
        hasIconAfter: {
          spacingIconContentAfter: globalTokens.size80,
        },
        hasIconBefore: {
          spacingIconContentBefore: globalTokens.size80,
        },
        focused: {
          paddingHorizontal: globalTokens.size120,
        },
      },
    },
    large: {
      padding: globalTokens.size120 - globalTokens.stroke.width10,
      borderWidth: globalTokens.stroke.width10,
      iconSize: 20,
      focused: {
        borderWidth: 0,
        padding: globalTokens.size120,
      },
      hasContent: {
        minWidth: 96,
        paddingHorizontal: globalTokens.size200 - globalTokens.stroke.width10,
        hasIconAfter: {
          spacingIconContentAfter: globalTokens.size60,
        },
        hasIconBefore: {
          spacingIconContentBefore: globalTokens.size60,
        },
        focused: {
          paddingHorizontal: globalTokens.size200,
        },
      },
    },
    rounded: {
      borderRadius: globalTokens.corner.radius40,
    },
    circular: {
      borderRadius: globalTokens.corner.radiusCircular,
    },
    square: {
      borderRadius: globalTokens.corner.radiusNone,
    },
  } as ButtonTokens);
