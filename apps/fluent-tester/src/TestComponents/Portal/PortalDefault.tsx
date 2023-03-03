import * as React from 'react';
import { View, Text } from 'react-native';

import { Portal } from '@fluentui-react-native/portal';

export const PortalDefault: React.FunctionComponent = () => {
  return (
    <View>
      <Text>Test Portal</Text>
      <Portal />
    </View>
  );
};
