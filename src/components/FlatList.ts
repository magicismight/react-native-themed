import { ReactElement } from 'react';
import { ViewStyle, FlatList, FlatListProps } from 'react-native';
import createThemedComponent, { ThemeStyle, ThemeProps } from '../createThemedComponent';
import { transformStyle } from './transformers';


function transformFlatListProps<T>(props: ThemeProps<ViewStyle, FlatListProps<T>> & {
  contentContainerStyle?: ThemeStyle<ViewStyle>;
  ListFooterComponentStyle?: ThemeStyle<ViewStyle>;
  columnWrapperStyle?: ThemeStyle<ViewStyle>;
  ListHeaderComponentStyle?: ThemeStyle<ViewStyle>;
}, mode: string): FlatListProps<T> {
  const {
    style,
    contentContainerStyle,
    ListFooterComponentStyle, 
    columnWrapperStyle,
    ListHeaderComponentStyle,
    ...noneStyleProps
  } = props;

  return Object.assign(noneStyleProps, {
    style: transformStyle(style, mode),
    contentContainerStyle: transformStyle(contentContainerStyle, mode),
    ListFooterComponentStyle: transformStyle(ListFooterComponentStyle, mode),
    columnWrapperStyle: transformStyle(columnWrapperStyle, mode),
    ListHeaderComponentStyle: transformStyle(ListHeaderComponentStyle, mode)
  }) as FlatListProps<T>;
}

// @ts-ignore
export default createThemedComponent(FlatList, transformFlatListProps) as <T>(
  props: ThemeProps<ViewStyle, FlatListProps<T>>
) => ReactElement | null
