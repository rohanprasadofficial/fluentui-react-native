import { buildUseTokens } from '@fluentui-react-native/framework';
import { globalTokens } from '@fluentui-react-native/theme-tokens';

import type { AvatarStackTokens } from './AvatarStack.types';

export const useAvatarStackTokens = buildUseTokens<AvatarStackTokens>(() => ({
  // base tokens
  contentPadding: globalTokens.size120,
  flexAfter: 1,
  flexBefore: 1,
  minLineSize: globalTokens.size80,
  minWidth: 0,
  thickness: 1,
}));
