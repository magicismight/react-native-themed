import { RefAttributes, PropsWithoutRef, ReactElement } from  'react';
import { ViewStyle, ScrollView, ScrollViewProps, StyleProp } from 'react-native';

import createThemedComponent, {
  ThemeProps,
  ThemeStyle
} from '../createThemedComponent';

export default createThemedComponent<
  ScrollViewProps,
  {
    style: ViewStyle;
    contentContainerStyle: ViewStyle;
  },
  Pick<ScrollViewProps, 'endFillColor' | 'indicatorStyle'> 
>(
  ScrollView,
  ['style', 'contentContainerStyle'],
  ['endFillColor', 'indicatorStyle']
) as (
  props: PropsWithoutRef<
    Omit<
    ScrollViewProps,
      | 'style'
      | 'contentContainerStyle'
    > &
      ThemeProps<Pick<ScrollViewProps, 'endFillColor' | 'indicatorStyle'>> &
      {
        [K in
          | 'style'
          | 'contentContainerStyle']?: StyleProp<
          ThemeStyle<ScrollViewProps[K]>
        >;
      }
  > &
    RefAttributes<ScrollView>
) => ReactElement | null;
