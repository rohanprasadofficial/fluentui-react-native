import * as React from 'react';
import type { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { TextV1 as Text } from '@fluentui-react-native/text';

import { getContentMaxWidth, getMenuItemColor, MAX_WIDTH, MIN_WIDTH } from './utils';

export type Props = {
  /**
   * Title text for the `MenuItem`.
   */
  title: React.ReactNode;

  /**
   * Whether the 'item' is disabled. A disabled 'item' is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;

  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void;
  /**
   * @optional
   */
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  /**
   * TestID used for testing purposes
   */
  testID?: string;
  /**
   * Accessibility label for the Touchable. This is read by the screen reader when the user taps the component.
   */
  accessibilityLabel?: string;
};

/**
 * A component to show a single list item inside a Menu.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/menu-item.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Menu } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <View style={{ flex: 1 }}>
 *     <Menu.Item leadingIcon="redo" onPress={() => {}} title="Redo" />
 *     <Menu.Item leadingIcon="undo" onPress={() => {}} title="Undo" />
 *     <Menu.Item leadingIcon="content-cut" onPress={() => {}} title="Cut" disabled />
 *     <Menu.Item leadingIcon="content-copy" onPress={() => {}} title="Copy" disabled />
 *     <Menu.Item leadingIcon="content-paste" onPress={() => {}} title="Paste" />
 *   </View>
 * );
 *
 * export default MyComponent;
 * ```
 */
export const MenuItemAn = ({ title, disabled, onPress, style, contentStyle, testID, titleStyle, accessibilityLabel }: Props) => {
  const { titleColor } = getMenuItemColor({
    disabled,
  });

  const containerPadding = 12;

  const minWidth = MIN_WIDTH - 12;

  const maxWidth = getContentMaxWidth();

  const titleTextStyle = {
    color: titleColor,
  };

  return (
    <Pressable
      style={[styles.container, { paddingHorizontal: containerPadding }, styles.md3DenseContainer, style]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="menuitem"
      accessibilityState={{ disabled }}
    >
      <View style={styles.row}>
        <View style={[styles.item, styles.content, { minWidth, maxWidth }, contentStyle]} pointerEvents="none">
          <Text selectable={false} numberOfLines={1} style={[styles.title, titleTextStyle, titleStyle]}>
            Hello {title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

MenuItemAn.displayName = 'MenuItemAn.Item';

const styles = StyleSheet.create({
  container: {
    minWidth: MIN_WIDTH,
    maxWidth: MAX_WIDTH,
    height: 48,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  md3DenseContainer: {
    height: 32,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
  },
  item: {
    marginHorizontal: 8,
  },
  content: {
    justifyContent: 'center',
  },
  md3LeadingIcon: {
    marginLeft: 12,
  },
  md3WithoutLeadingIcon: {
    marginLeft: 4,
  },
});

export default MenuItemAn;
