import { ReactElement } from 'react';
import { ViewStyle, FlatList, FlatListProps } from 'react-native';
import createThemedComponent, {
  ThemeProps,
  ThemeStyle
} from '../createThemedComponent';

export default createThemedComponent<
  FlatListProps<unknown>,
  Pick<
    FlatListProps<unknown>,
    | 'style'
    | 'contentContainerStyle'
    | 'ListFooterComponentStyle'
    | 'columnWrapperStyle'
    | 'ListHeaderComponentStyle'
  >,
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
  props: Omit<
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
        | 'ListHeaderComponentStyle']: ThemeStyle<FlatListProps<T>[K]>;
    }
) => ReactElement | null;
