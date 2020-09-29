import { RefAttributes } from  'react';
import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  ScrollViewProps,
  {
    style: ViewStyle;
    contentContainerStyle: ViewStyle;
  },
  Pick<ScrollViewProps, 'endFillColor' | 'indicatorStyle'> &
  RefAttributes<ScrollView>
>(
  ScrollView,
  ['style', 'contentContainerStyle'],
  ['endFillColor', 'indicatorStyle']
);
