import type { Theme } from '@fluentui-react-native/framework';
import type { TokenSettings } from '@fluentui-react-native/use-styling';

import type { PortalTokens } from './Portal.types';

export const defaultPortalTokens: TokenSettings<PortalTokens, Theme> = (t: Theme) =>
  ({
    backgroundColor: t.colors.ghostBackground,
    color: t.colors.brandBackground,
    borderColor: t.colors.brandBackground,
    small: {
      borderWidth: 1,
      padding: 10,
      borderRadius: 2,
    },
    medium: {
      borderWidth: 2,
      borderRadius: 4,
      padding: 20,
    },
    large: {
      borderWidth: 4,
      borderRadius: 6,
      padding: 30,
    },
  } as PortalTokens);
