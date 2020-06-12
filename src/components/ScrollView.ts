import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native';
import createThemedComponent from '../createThemedComponent';

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
);
