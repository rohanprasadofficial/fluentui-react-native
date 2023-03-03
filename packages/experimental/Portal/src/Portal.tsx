/** @jsx withSlots */
import * as React from 'react';
import { View } from 'react-native';

import type { UseSlots } from '@fluentui-react-native/framework';
import { compose, mergeProps, withSlots } from '@fluentui-react-native/framework';
import { TextV1 as Text } from '@fluentui-react-native/text';

import { stylingSettings } from './Portal.styling';
import type { PortalType, PortalProps } from './Portal.types';
import { portal } from './Portal.types';
import { usePortal } from './usePortal';
/**
 * A function which determines if a set of styles should be applied to the component given the current state and props of the portal.
 *
 * @param layer The name of the state that is being checked for
 * @param userProps The props that were passed into the portal
 * @returns Whether the styles that are assigned to the layer should be applied to the portal
 */
export const portalLookup = (layer: string, userProps: PortalProps): boolean => {
  return userProps[layer] || layer === userProps['textSize'];
};

export const Portal = compose<PortalType>({
  displayName: portal,
  ...stylingSettings,
  slots: {
    root: View,
    text: Text,
  },
  useRender: (userProps: PortalProps, useSlots: UseSlots<PortalType>) => {
    const portalProps = usePortal(userProps);
    const Slots = useSlots(userProps, (layer) => portalLookup(layer, userProps));

    return (final: PortalProps, ...children: React.ReactNode[]) => {
      const { text, ...mergedProps } = mergeProps(portalProps, final);

      return (
        <Slots.root {...mergedProps}>
          <Slots.text>{text}</Slots.text>
          {children}
        </Slots.root>
      );
    };
  },
});
