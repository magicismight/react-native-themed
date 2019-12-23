import React, { ComponentType, forwardRef, Ref, useContext, PropsWithChildren } from 'react';
import { StyleProp, StyleSheet } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';

import ThemedValue from './ThemedValue';
import ThemeContext from './ThemeContext';


export type ThemeStyle<S extends object> = {
  [K in keyof S]: (S[K] extends ReadonlyArray<any>
    ? ReadonlyArray<ThemeStyle<S[K][0]>>
    : S[K] extends object
      ? ThemeStyle<S[K]>
      :
          | S[K]
          | ThemedValue<{ [name: string]: string | undefined }, string | undefined>)
};

export type ThemeProps<
  S extends object, // style type
  P extends { // props type
    style?: StyleProp<S>;
  }
> = {
[K in keyof P]: K extends 'style'
  ? StyleProp<ThemeStyle<S>>
  : P[K] | ThemedValue<{ [name: string]: unknown }, unknown>
};

function transformThemedProperties(mode: string, object?: { [key: string]: unknown } | null | false) {
  if (!object) {
    return {};
  }
  
  const themedObject = Object.create(null);

  for (const key of Object.keys(object)) {
    themedObject[key] = transformValue(object[key], mode);
  }

  return themedObject;
}

export function transformValue<T>(value: T | ThemedValue<{ [name: string]: T }, T>, mode: string): T | undefined {
  if (value instanceof ThemedValue) {
    return value.selectValue(mode);
  } else {
    return value;
  }
}

function useThemedProps<S extends object /** style types */, P extends { style?: S } /** prop types */>(props: PropsWithChildren<ThemeProps<S, P>>, transformer?: (props: PropsWithChildren<ThemeProps<S, P>>, mode: string) => PropsWithChildren<P>): P {
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


export default function createThemedComponent<P, S extends object>(
  Component: ComponentType<PropsWithChildren<P>>,
  transformer?: (props: PropsWithChildren<ThemeProps<S, P>>, mode: string) => PropsWithChildren<P>
): React.ForwardRefExoticComponent<React.PropsWithoutRef<PropsWithChildren<ThemeProps<S, P>>> & React.RefAttributes<React.ComponentType<PropsWithChildren<ThemeProps<S, P>>>>> {
  function ThemedComponent(
    props: PropsWithChildren<ThemeProps<S, P>>,
    ref: Ref<ComponentType<ThemeProps<S, P>>>
  ) {
    const themedProps = useThemedProps(props, transformer);
    return <Component {...themedProps} ref={ref} />;
  }

  return forwardRef(hoistNonReactStatics(ThemedComponent, Component));
}
