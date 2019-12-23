import { ViewStyle, ScrollView, ScrollViewProps } from 'react-native';
import createThemedComponent, { transformValue, ThemeStyle, ThemeProps } from '../createThemedComponent';
import { transformStyle } from './transformers';


function transformScrollViewProps(props: ThemeProps<ViewStyle, ScrollViewProps> & {
  contentContainerStyle?: ThemeStyle<ViewStyle>;
}, mode: string): ScrollViewProps {
  const {
    style,
    contentContainerStyle,
    endFillColor,
    ...noneThemedProps
  } = props;

  return Object.assign(noneThemedProps, {
    style: transformStyle(style, mode),
    contentContainerStyle: transformStyle(contentContainerStyle, mode),
    endFillColor: transformValue(endFillColor, mode)
  }) as ScrollViewProps;
}

// @ts-ignore
export default createThemedComponent(ScrollView, transformScrollViewProps)
