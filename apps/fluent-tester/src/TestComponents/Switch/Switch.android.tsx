import * as React from 'react';
import { Test, TestSection, PlatformStatus } from '../Test';
import { SWITCH_TESTPAGE } from './consts';
import { View } from 'react-native';
import { Switch } from '@fluentui-react-native/switch';
import { commonTestStyles } from '../Common/styles';

const StandardUsage: React.FunctionComponent = () => {
  return (
    <View style={commonTestStyles.settingsPicker}>
      <Switch defaultChecked={true} label={'Default Checked True'} />
    </View>
  );
};

const toggleSections: TestSection[] = [
  {
    name: 'Standard Usage',
    testID: SWITCH_TESTPAGE,
    component: () => <StandardUsage />,
  },
];

export const SwitchTest: React.FunctionComponent = () => {
  const status: PlatformStatus = {
    win32Status: 'Experimental',
    uwpStatus: 'Backlog',
    iosStatus: 'Backlog',
    macosStatus: 'Backlog',
    androidStatus: 'Backlog',
  };

  const description = 'Switch is a control that has two mutually exclusive states.';

  const spec = 'https://github.com/microsoft/fluentui-react-native/blob/main/packages/experimental/Switch/SPEC.md';

  return <Test name="Switch Test" description={description} spec={spec} sections={toggleSections} status={status} />;
};
