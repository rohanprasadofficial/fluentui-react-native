import type { Theme, UseStylingOptions } from '@fluentui-react-native/framework';
import { buildProps } from '@fluentui-react-native/framework';
import { borderStyles, layoutStyles } from '@fluentui-react-native/tokens';

import { portal } from './Portal.types';
import type { PortalTokens, PortalSlotProps, PortalProps } from './Portal.types';
import { defaultPortalTokens } from './PortalTokens';

export const portalStates: (keyof PortalTokens)[] = ['small', 'medium', 'large'];

export const stylingSettings: UseStylingOptions<PortalProps, PortalSlotProps, PortalTokens> = {
  tokens: [defaultPortalTokens, portal],
  states: portalStates,
  slotProps: {
    root: buildProps(
      (tokens: PortalTokens, theme: Theme) => ({
        style: {
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'flex-start',
          justifyContent: 'center',
          backgroundColor: tokens.backgroundColor,
          ...borderStyles.from(tokens, theme),
          ...layoutStyles.from(tokens, theme),
        },
      }),
      ['backgroundColor', ...borderStyles.keys, ...layoutStyles.keys],
    ),
    text: buildProps(
      (tokens: PortalTokens) => {
        return {
          style: {
            color: tokens.color,
          },
        };
      },
      ['color'],
    ),
  },
};
