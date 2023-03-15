import * as React from 'react';
import { View } from 'react-native';

import { AvatarStack } from '@fluentui-react-native/avatar-stack';
import { Stack } from '@fluentui-react-native/stack';

import { DIVIDER_TESTPAGE } from '../../../../E2E/src/Divider/consts';
import { commonTestStyles } from '../Common/styles';
import { Test } from '../Test';
import type { TestSection, PlatformStatus } from '../Test';

export const DefaultAvatarStackTest: React.FunctionComponent = () => (
  <Stack style={commonTestStyles.stack}>
    <View>
      <AvatarStack />
    </View>
  </Stack>
);

const dividerSections: TestSection[] = [
  {
    name: 'Horizontal Dividers',
    testID: DIVIDER_TESTPAGE,
    component: DefaultAvatarStackTest,
  },
];

export const AvatarStackTest: React.FunctionComponent = () => {
  const status: PlatformStatus = {
    win32Status: 'Experimental',
    uwpStatus: 'Backlog',
    iosStatus: 'Experimental',
    macosStatus: 'Backlog',
    androidStatus: 'Experimental',
  };

  const description = 'AvatarStack Description';

  return <Test name="AvatarStack Test" description={description} sections={dividerSections} status={status}></Test>;
};
