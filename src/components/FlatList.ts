import {
  ReactElement,
  RefAttributes,
  PropsWithoutRef,
  PropsWithChildren
} from 'react';
import { ViewStyle, FlatList, FlatListProps, StyleProp } from 'react-native';
import createThemedComponent, {
  ThemeProps,
  ThemeStyle
} from '../createThemedComponent';

export default createThemedComponent<
  FlatListProps<unknown>,
  {
    style: ViewStyle;
    contentContainerStyle: ViewStyle;
    ListFooterComponentStyle: ViewStyle;
    columnWrapperStyle: ViewStyle;
    ListHeaderComponentStyle: ViewStyle;
  },
  Pick<FlatListProps<unknown>, 'indicatorStyle'>
>(
  FlatList,
  [
    'style',
    'contentContainerStyle',
    'ListFooterComponentStyle',
    'columnWrapperStyle',
    'ListHeaderComponentStyle'
  ],
  ['indicatorStyle']
) as <T>(
  props: PropsWithChildren<
    PropsWithoutRef<
      Omit<
        FlatListProps<T>,
        | 'indicatorStyle'
        | 'style'
        | 'contentContainerStyle'
        | 'ListFooterComponentStyle'
        | 'columnWrapperStyle'
        | 'ListHeaderComponentStyle'
      > &
        ThemeProps<Pick<FlatListProps<T>, 'indicatorStyle'>> &
        {
          [K in
            | 'style'
            | 'contentContainerStyle'
            | 'ListFooterComponentStyle'
            | 'columnWrapperStyle'
            | 'ListHeaderComponentStyle']?: StyleProp<
            ThemeStyle<FlatListProps<T>[K]>
          >;
        }
    >
  > &
    RefAttributes<FlatList<T>>
) => ReactElement | null;
