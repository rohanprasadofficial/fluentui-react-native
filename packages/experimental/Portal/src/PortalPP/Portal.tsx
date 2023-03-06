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

export const Portal = ({ children }: Props) => {
  const manager = React.useContext(PortalContext);
  return <PortalConsumer manager={manager as PortalMethods}>{children}</PortalConsumer>;
};

// @component ./PortalHost.tsx
Portal.Host = PortalHost;

export default Portal;
