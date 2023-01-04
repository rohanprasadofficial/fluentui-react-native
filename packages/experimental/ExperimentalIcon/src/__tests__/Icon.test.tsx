import * as React from 'react';
import { Icon, SvgIcon, FontIcon, FontIconProps } from '../';
import * as renderer from 'react-test-renderer';
import { checkRenderConsistency, checkReRender } from '@fluentui-react-native/test-tools';
import { Path, Svg } from 'react-native-svg';
const fontProps: FontIconProps = {
  fontFamily: 'Arial',
  codepoint: 0x2663,
  color: '#f07',
};

const AccessTime20RegularIcon = () => {
  return (
    <Svg viewBox="0 0 20 20" fill="none">
      <Path
        clipPath="url(#a)"
        d="M6.98811 8.60832C6.92883 8.87568 6.66509 9.04596 6.39655 8.98919C6.12638 8.93207 5.95367 8.66674 6.01079 8.39657L6.01101 8.39557L6.01124 8.39447L6.01178 8.39199C6.01723 8.36769 6.02351 8.34355 6.03036 8.3196C6.04174 8.2798 6.05867 8.22647 6.08271 8.16406C6.13026 8.04058 6.20855 7.87389 6.33261 7.70453C6.58972 7.35354 7.04179 7 7.75359 7C8.30575 7 8.75549 7.21512 9.06185 7.56126C9.35994 7.89804 9.49998 8.33261 9.49998 8.75C9.49998 9.099 9.431 9.39794 9.29507 9.65577C9.15987 9.91222 8.97453 10.0973 8.78808 10.2414C8.63051 10.3631 8.45565 10.4669 8.30894 10.5539L8.25222 10.5877C8.08366 10.6883 7.94599 10.7752 7.82722 10.878C7.43333 11.219 7.1749 11.58 7.06318 12H8.99998C9.27612 12 9.49998 12.2239 9.49998 12.5C9.49998 12.7761 9.27612 13 8.99998 13H6.49999C6.22384 13 5.99999 12.7761 5.99999 12.5C5.99999 11.4894 6.4747 10.7262 7.17274 10.122C7.36392 9.95647 7.56872 9.8311 7.73953 9.7291L7.7978 9.69437C7.95158 9.60281 8.07076 9.53185 8.1768 9.44994C8.28786 9.36416 8.36129 9.28271 8.41048 9.18941C8.45894 9.09749 8.49998 8.9635 8.49998 8.75C8.49998 8.54779 8.43104 8.35736 8.31304 8.22404C8.20332 8.10008 8.02986 8 7.75359 8C7.42321 8 7.24848 8.14646 7.13933 8.29547C7.08025 8.37612 7.04055 8.45943 7.01589 8.52345C7.00383 8.55478 6.9961 8.57958 6.99184 8.59446C6.98973 8.60185 6.98811 8.60832 6.98811 8.60832ZM11 7C11.2761 7 11.5 7.22386 11.5 7.5V10H13V7.5C13 7.22386 13.2239 7 13.5 7C13.7761 7 14 7.22386 14 7.5V12.5C14 12.7761 13.7761 13 13.5 13C13.2239 13 13 12.7761 13 12.5V11H11C10.7239 11 10.5 10.7761 10.5 10.5V7.5C10.5 7.22386 10.7239 7 11 7ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z"
        fill="#333"
      />
    </Svg>
  );
};

describe('Icon component tests', () => {
  it('renders Font Icon', () => {
    const tree = renderer.create(<FontIcon {...fontProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Font Icon using Icon component', () => {
    const tree = renderer.create(<Icon fontSource={fontProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders SVG Icon', () => {
    const tree = renderer.create(<SvgIcon src={AccessTime20RegularIcon} width={100} height={100} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders SVG Icon using Icon component', () => {
    const tree = renderer.create(<Icon svgSource={{ src: AccessTime20RegularIcon, width: 20, height: 20 }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Icon checkRenderConsistency', () => {
    checkRenderConsistency(() => <FontIcon {...fontProps} />, 2);
  });

  it('Icon re-renders correctly', () => {
    checkReRender(() => <FontIcon {...fontProps} />, 2);
  });
});
