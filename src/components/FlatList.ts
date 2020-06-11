import { ReactElement } from 'react';
import { ViewStyle, FlatList, FlatListProps } from 'react-native';
import createThemedComponent, {
  ThemeStyle,
  ThemeProps,
  transformValue
} from '../createThemedComponent';
import { transformStyle } from './transformers';
import ThemedValue from '../ThemedValue';

function transformFlatListProps<T>(
  props: ThemeProps<ViewStyle, FlatListProps<T>> & {
    contentContainerStyle?: ThemeStyle<ViewStyle>;
    ListFooterComponentStyle?: ThemeStyle<ViewStyle>;
    columnWrapperStyle?: ThemeStyle<ViewStyle>;
    ListHeaderComponentStyle?: ThemeStyle<ViewStyle>;
    indicatorStyle?: ThemedValue<{ [name: string]: string }, string>;
  },
  mode: string
): FlatListProps<T> {
  const {
    style,
    contentContainerStyle,
    ListFooterComponentStyle,
    columnWrapperStyle,
    ListHeaderComponentStyle,
    indicatorStyle,
    ...noneStyleProps
  } = props;

  return Object.assign(noneStyleProps, {
    style: transformStyle(style, mode),
    contentContainerStyle: transformStyle(contentContainerStyle, mode),
    ListFooterComponentStyle: transformStyle(ListFooterComponentStyle, mode),
    columnWrapperStyle: transformStyle(columnWrapperStyle, mode),
    ListHeaderComponentStyle: transformStyle(ListHeaderComponentStyle, mode),
    indicatorStyle: transformValue(indicatorStyle, mode)
  }) as FlatListProps<T>;
}

// @ts-ignore
export default createThemedComponent(FlatList, transformFlatListProps) as <T>(
  props: ThemeProps<ViewStyle, FlatListProps<T>>
) => ReactElement | null;
