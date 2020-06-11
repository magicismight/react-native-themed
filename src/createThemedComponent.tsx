import React, { ComponentType, forwardRef, Ref, useContext } from 'react';
import { StyleProp, StyleSheet } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';

import ThemedValue from './ThemedValue';
import ThemeContext from './ThemeContext';

export type ThemeStyle<S extends object> = {
  [K in keyof S]: S[K] extends ReadonlyArray<any>
    ? ReadonlyArray<ThemeStyle<S[K][0]>>
    : S[K] extends object
    ? ThemeStyle<S[K]>
    :
        | S[K]
        | ThemedValue<
            {
              [name: string]: S[K];
            },
            S[K]
          >;
};

export type ThemeProps<
  S extends object, // style props
  P extends {
    // props type
    style?: StyleProp<S>;
  }
> = {
  [K in keyof P]: K extends 'style'
    ? StyleProp<ThemeStyle<S>>
    : P[K] | ThemedValue<{ [name: string]: P[K] }, P[K]>;
};

function transformThemedProperties(
  mode: string,
  object?: { [key: string]: unknown } | null | false
) {
  if (!object) {
    return {};
  }

  const themedObject = Object.create(null);

  for (const key of Object.keys(object)) {
    themedObject[key] = transformValue(object[key], mode);
  }

  return themedObject;
}

export function transformValue<T>(
  value: T | ThemedValue<{ [name: string]: T }, T>,
  mode: string
): T {
  if (value instanceof ThemedValue) {
    return value.selectValue(mode);
  } else {
    return value;
  }
}

function useThemedProps<
  S extends object /** style types */,
  P extends { style?: S } /** prop types */,
  T extends Partial<P>
>(
  props: Omit<P, keyof T> & ThemeProps<S, T>,
  transformer?: (props: Omit<P, keyof T> & ThemeProps<S, T>, mode: string) => P
): P {
  const theme = useContext(ThemeContext);

  if (transformer) {
    return transformer(props, theme);
  } else {
    const { style, ...noneStyleProps } = props;
    return {
      ...transformThemedProperties(theme, noneStyleProps),
      style: transformThemedProperties(theme, StyleSheet.flatten(style))
    };
  }
}

/**
 * @example
 * function transformButtonProps(
 *   props: Omit<ButtonProps, 'color'> & {
 *     color?:
 *       | ThemedValue<{ [name: string]: string | undefined }, string | undefined>
 *       | string;
 *   },
 *   mode: string
 * ): ButtonProps;
 * createThemedComponent<
 *   ButtonProps,
 *   ViewStyle,
 *   Pick<ButtonProps, 'color'>
 * >(Button, transformButtonProps)
 */
export default function createThemedComponent<
  P,
  S extends object,
  T extends Partial<P>
>(
  Component: ComponentType<P>,
  transformer?: (props: Omit<P, keyof T> & ThemeProps<S, T>, mode: string) => P
) {
  function ThemedComponent(
    props: Omit<P, keyof T> & ThemeProps<S, T>,
    ref: Ref<ComponentType<ThemeProps<S, P>>>
  ) {
    const themedProps = useThemedProps<S, P, T>(props, transformer);
    return <Component {...themedProps} ref={ref} />;
  }

  return forwardRef(hoistNonReactStatics(ThemedComponent, Component));
}
