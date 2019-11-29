import React, { ComponentType, forwardRef, Ref, PropsWithoutRef, useContext } from 'react';
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
          | ThemedValue<{ [name: string]: string }>)
};

export type ThemeProps<
  S extends object, // style type
  P extends { // props type
    style?: StyleProp<S>;
  }
> = {
[K in keyof P]: K extends 'style'
  ? StyleProp<ThemeStyle<S>>
  : P[K]
};

function transformThemedProperties(mode: string, object?: { [key: string]: any } | null | false) {
  if (!object) {
    return {};
  }
  
  const themedObject = Object.create(null);

  for (const key of Object.keys(object)) {
    const value = object[key];
    if (value instanceof ThemedValue) {
      themedObject[key] = value.selectValue(mode);
    } else {
      themedObject[key] = value;
    }
  }

  return themedObject;
}

function useThemedProps<S extends object /** style types */, P extends { style?: S } /** prop types */>(props: ThemeProps<S, P>): P {
  const theme = useContext(ThemeContext);
  const { style, ...originalProps } = props;
  return {
    ...transformThemedProperties(theme, originalProps),
    style: transformThemedProperties(theme, StyleSheet.flatten(style))
  };
}

export default function createThemedComponent<P, S extends object>(
  Component: ComponentType<P>
): ComponentType<PropsWithoutRef<ThemeProps<S, P>>> {
  function ThemedComponent(
    props: ThemeProps<S, P>,
    ref: Ref<ComponentType<ThemeProps<S, P>>>
  ) {
    const themedProps = useThemedProps(props);
    return <Component {...themedProps} ref={ref} />;
  }

  return forwardRef(hoistNonReactStatics(ThemedComponent, Component));
}
