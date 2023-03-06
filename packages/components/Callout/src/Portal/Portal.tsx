import * as React from 'react';

import PortalConsumer from './PortalConsumer';
import type { PortalMethods } from './PortalHost';
import PortalHost, { PortalContext } from './PortalHost';

type Props = {
  /**
   * Content of the `Portal`.
   */
  children: React.ReactNode;
};

/**
 * Portal allows to render a component at a different place in the parent tree.
 * You can use it to render content which should appear above other elements, similar to `Modal`.
 * It requires a [`Portal.Host`](portal-host.html) component to be rendered somewhere in the parent tree.
 *
 * ## Usage
 * ```
 */
const Portal = ({ children }: Props) => {
  const manager = React.useContext(PortalContext);
  return <PortalConsumer manager={manager as PortalMethods}>{children}</PortalConsumer>;
};

// @component ./PortalHost.tsx
Portal.Host = PortalHost;

export default Portal;
