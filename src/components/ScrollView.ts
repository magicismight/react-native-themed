import { ViewStyle, ScrollView, ScrollViewProps } from 'react-native';
import createThemedComponent, { transformValue, ThemeStyle, ThemeProps } from '../createThemedComponent';
import { transformStyle } from './transformers';
import ThemedValue from '../ThemedValue';


function transformScrollViewProps(props: ThemeProps<ViewStyle, ScrollViewProps> & {
  contentContainerStyle?: ThemeStyle<ViewStyle>;
  indicatorStyle?: ThemedValue<{ [name: string]: string }, string>
}, mode: string): ScrollViewProps {
  const {
    style,
    contentContainerStyle,
    endFillColor,
    indicatorStyle,
    ...noneThemedProps
  } = props;

  return Object.assign(noneThemedProps, {
    style: transformStyle(style, mode),
    contentContainerStyle: transformStyle(contentContainerStyle, mode),
    endFillColor: transformValue(endFillColor, mode),
    indicatorStyle: transformValue(indicatorStyle, mode),
  }) as ScrollViewProps;
}

// @ts-ignore
export default createThemedComponent(ScrollView, transformScrollViewProps)
