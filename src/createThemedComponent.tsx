import React, {
  ComponentType,
  forwardRef,
  Ref,
  useContext,
  ReactElement,
  PropsWithoutRef,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import { StyleSheet, StyleProp } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';

import ThemedValue from './ThemedValue';
import ThemeContext from './ThemeContext';

export type ThemeStyle<S> = {
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

export type ThemeProps<P extends object> = {
  [K in keyof P]: P[K] | ThemedValue<{ [name: string]: P[K] }, P[K]>;
};

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

export function transformStyle<T>(
  style: StyleProp<ThemeStyle<T>>,
  mode: string
): StyleProp<T> {
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

function createThemedComponent<
  P extends object, // original props
  S extends Partial<P> // themed style props
>(
  Component: ComponentType<P>,
  styles: Array<keyof S>
): ForwardRefExoticComponent<
  PropsWithoutRef<
    Omit<P, keyof S> &
      {
        [K in keyof S]: ThemeStyle<S[K]>;
      }
  > &
    RefAttributes<
      ComponentType<
        Omit<P, keyof S> &
          {
            [K in keyof S]: ThemeStyle<S[K]>;
          }
      >
    >
>;
function createThemedComponent<
  P extends object, // original props
  S extends Partial<P>, // themed style props
  T extends Partial<P> // themed common props
>(
  Component: ComponentType<P>,
  styles: Array<keyof S>,
  themed: Array<keyof T>
): ForwardRefExoticComponent<
  PropsWithoutRef<
    Omit<P, keyof T | keyof S> &
      ThemeProps<T> &
      {
        [K in keyof S]: ThemeStyle<S[K]>;
      }
  > &
    RefAttributes<
      ComponentType<
        Omit<P, keyof T | keyof S> &
          ThemeProps<T> &
          {
            [K in keyof S]: ThemeStyle<S[K]>;
          }
      >
    >
>;
function createThemedComponent<
  P extends object, // original props
  S extends Partial<P>, // themed style props
  T extends Partial<P> // themed common props
>(
  Component: ComponentType<P>,
  styles: Array<keyof S>,
  themed?: Array<keyof T>
): ForwardRefExoticComponent<
  PropsWithoutRef<
    Omit<P, keyof T | keyof S> &
      ThemeProps<T> &
      {
        [K in keyof S]: ThemeStyle<S[K]>;
      }
  > &
    RefAttributes<
      ComponentType<
        Omit<P, keyof T | keyof S> &
          ThemeProps<T> &
          {
            [K in keyof S]: ThemeStyle<S[K]>;
          }
      >
    >
> {
  function ThemedComponent(
    props: Omit<P, keyof T | keyof S> &
      ThemeProps<T> &
      {
        [K in keyof S]: ThemeStyle<S[K]>;
      },
    ref: Ref<
      ComponentType<
        Omit<P, keyof T | keyof S> &
          ThemeProps<T> &
          {
            [K in keyof S]: ThemeStyle<S[K]>;
          }
      >
    >
  ): ReactElement<P> {
    const theme = useContext(ThemeContext);
    const themedProps: any = { ...props };

    styles.forEach((key: keyof S) => {
      themedProps[key] = transformStyle(props[key] as any, theme);
    });

    if (themed) {
      themed.forEach((key: keyof T) => {
        themedProps[key] = transformValue(props[key] as any, theme);
      });
    }

    return <Component {...themedProps} ref={ref} />;
  }

  return forwardRef(hoistNonReactStatics(ThemedComponent, Component));
}

export default createThemedComponent;
