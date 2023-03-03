import * as React from 'react';

import { checkRenderConsistency, checkReRender } from '@fluentui-react-native/test-tools';
import * as renderer from 'react-test-renderer';

import { Portal } from '../Portal';

describe('Portal component tests', () => {
  it('Portal default', () => {
    const tree = renderer.create(<Portal>Your component</Portal>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Portal simple rendering does not invalidate styling', () => {
    checkRenderConsistency(() => <Portal>Default Portal</Portal>, 2);
  });

  it('Portal re-renders correctly', () => {
    checkReRender(() => <Portal>Render twice</Portal>, 2);
  });

  // Feel free to add more tests here
});
