import {
  ViewStyle,
  ScrollView,
  ScrollViewProps,
  StyleProp
} from 'react-native';
import createThemedComponent, {
  transformValue,
  ThemeStyle,
  ThemeProps
} from '../createThemedComponent';
import { transformStyle } from './transformers';
import ThemedValue from '../ThemedValue';

function transformScrollViewProps(
  props: Omit<
    ScrollViewProps,
    'contentContainerStyle' | 'style' | 'endFillColor' | 'indicatorStyle'
  > & {
    style?: StyleProp<ThemeStyle<ViewStyle>>;
    contentContainerStyle?: ThemeStyle<ViewStyle>;
    endFillColor?:
      | ThemedValue<{ [name: string]: string | undefined }, string | undefined>
      | string;
    indicatorStyle?: ThemedValue<
      { [name: string]: 'default' | 'black' | 'white' },
      'default' | 'black' | 'white'
    >;
  },
  mode: string
): ScrollViewProps {
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
    indicatorStyle: transformValue(indicatorStyle, mode)
  }) as ScrollViewProps;
}

export default createThemedComponent<
  ScrollViewProps,
  ViewStyle,
  Pick<
    ScrollViewProps,
    'contentContainerStyle' | 'style' | 'endFillColor' | 'indicatorStyle'
  >
>(ScrollView, transformScrollViewProps);
