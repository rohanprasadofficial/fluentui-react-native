/** @jsx withSlots */
/** @jsxFrag */
import React from 'react';
import { View } from 'react-native';
import type { ViewProps } from 'react-native';

import { withSlots, compressible, useSlot, useFluentTheme, patchTokens } from '@fluentui-react-native/framework';
import type { UseTokens } from '@fluentui-react-native/framework';
import { IconV1 as Icon } from '@fluentui-react-native/icon';
import type { IconPropsV1 as IconProps } from '@fluentui-react-native/icon';
import { TextV1 as Text } from '@fluentui-react-native/text';
import type { TextProps } from '@fluentui-react-native/text';
import { Avatar } from '@fluentui-react-native/avatar';

import { colorsFromAppearance, getBeforeLineStyle, getRootStyle, useAvatarStackSlotProps } from './AvatarStack.styling';
import { AvatarStackName } from './AvatarStack.types';
import type { AvatarStackProps, AvatarStackTokens } from './AvatarStack.types';
import { useAvatarStackTokens } from './AvatarStackTokens';

export const AvatarStack = compressible<AvatarStackProps, AvatarStackTokens>(
  (props: AvatarStackProps, useTokens: UseTokens<AvatarStackTokens>) => {
    // Set default values for props
    props = {
      alignContent: 'center',
      appearance: 'default',
      insetSize: 0,
      vertical: false,
      ...props,
    };

    const theme = useFluentTheme();
    let [tokens, cache] = useTokens(theme);

    // We want to patch our initial tokens from useTokens() with the token values below because they are dependent on the above props.
    // With compressible, we can also access our tokens at the final rendering stage, which we will need to correctly set our AvatarStack height.
    [tokens, cache] = patchTokens(tokens, cache, {
      flexAfter: props.alignContent === 'end' ? 0 : 1,
      flexBefore: props.alignContent === 'start' ? 0 : 1,
      ...colorsFromAppearance(props.appearance, tokens, theme),
    });

    // get slot props from these tokens
    const { rootProps, beforeLineProps, afterLineProps, wrapperProps, textProps, iconProps } = useAvatarStackSlotProps(
      props,
      tokens,
      theme,
    );

    // build slots
    const RootSlot = useSlot<ViewProps>(View, rootProps);
    const BeforeLineSlot = useSlot<ViewProps>(View, beforeLineProps);
    const AfterLineSlot = useSlot<ViewProps>(View, afterLineProps);
    const WrapperSlot = useSlot<ViewProps>(View, wrapperProps);
    const TextSlot = useSlot<TextProps>(Text, textProps);
    const IconSlot = useSlot<IconProps>(Icon, iconProps);

    return (final: AvatarStackProps, ...children: React.ReactNode[]) => {
      final = { ...props, ...final };
      // change root style if there is a text child
      let textContent: string;
      React.Children.forEach(children, (child) => {
        if (typeof child === 'string') {
          textContent = child;
        }
      });

      const hasContent = textContent !== undefined || props.icon !== undefined;

      // This style must be set here because we need to know if text content is passed in the final render to set the height correctly
      let finalRootProps = rootProps;
      if (!tokens.minHeight) {
        finalRootProps = { ...rootProps, style: getRootStyle(rootProps.style, final.vertical, hasContent) };
      }

      // We patch the beforeLine styling if no content is passed because it should always take up the full width / height of the root container (afterLine is not rendered).
      const finalBeforeLineProps = { ...beforeLineProps, style: getBeforeLineStyle(beforeLineProps.style, hasContent) };

      return (
        <View style={{ flexDirection: 'row' }}>
          <Avatar active={'active'} size={40} name="Richard Faynman" avatarColor={'colorful'} />
          <Avatar active={'active'} style={{ marginStart: -12 }} size={40} name="Joe" avatarColor={'colorful'} />
          <Avatar active={'active'} style={{ marginStart: -12 }} size={40} name="Testing sd" avatarColor={'colorful'} />

          <Avatar
            size={40}
            style={{ marginStart: -12 }}
            badge={{ status: 'available', outOfOffice: false }}
            imageUrl={'https://www.rmndigital.com/wp-content/uploads/2012/11/stevems.jpg'}
          />
        </View>
      );
    };
  },
  useAvatarStackTokens,
);
AvatarStack.displayName = AvatarStackName;
