import * as React from 'react';

import { PORTAL_TESTPAGE } from './consts';
import { PortalDefault } from './PortalDefault';
import type { TestSection, PlatformStatus } from '../Test';
import { Test } from '../Test';

const portalSections: TestSection[] = [
  {
    name: 'Portal Page',
    testID: PORTAL_TESTPAGE,
    component: PortalDefault,
  },
];

export const PortalTest: React.FunctionComponent = () => {
  const status: PlatformStatus = {
    win32Status: 'Beta',
    uwpStatus: 'Experimental',
    iosStatus: 'Experimental',
    macosStatus: 'Beta',
    androidStatus: 'Backlog',
  };

  const description = 'component-description';

  return <Test name="Portal Test" description={description} sections={portalSections} status={status}></Test>;
};
