import { ViewStyle, StyleSheet, StyleProp } from 'react-native';

import { transformValue, ThemeProps, ThemeStyle } from '../createThemedComponent';
import ThemedValue from '../ThemedValue';

export function transformStyle<T extends ViewStyle>(style: StyleProp<ThemeStyle<T>>, mode: string): StyleProp<T> {
  if (!style) {
    return style as StyleProp<T>;
  }

  const flattenStyle = StyleSheet.flatten(style);

  const themedStyle = Object.create(null);
  let hasThemedStyle: boolean = false;
  for (const key of Object.keys(flattenStyle) as Array<keyof T>) {
    const styleValue = flattenStyle[key];
    themedStyle[key] = transformValue(styleValue, mode);

    if (!hasThemedStyle && themedStyle[key] !== styleValue) {
      hasThemedStyle = true;
    }
  }

  if (!hasThemedStyle) {
    return style as StyleProp<T>;
  } else {
    return themedStyle as StyleProp<T>;
  }
}

export function transformArray(array: Array<ThemedValue<{ [name: string]: string }, string> | string> | undefined, mode: string): Array<string | undefined> | undefined {
  if (!array) {
    return array;
  }

  let hasThemedItem: boolean = false;
  const themedArray: Array<string | undefined> = array.map((item) => {
    const themedItem = transformValue(item, mode);

    if (!hasThemedItem && themedItem !== item) {
      hasThemedItem = true;
    }

    return themedItem;
  });

  if (hasThemedItem) {
    return themedArray;
  } else {
    return array as Array<string | undefined>;
  }
}

export function transformPropsWithStyle<T extends {
  style?: StyleProp<S>
}, S extends ViewStyle>(props: ThemeProps<S, T>, mode: string): T {
  const themedStyle = transformStyle(props.style, mode);
  if (themedStyle === props.style) {
    return props as T;
  } else {
    return {
      ...props,
      style: themedStyle
    } as T
  }
}

