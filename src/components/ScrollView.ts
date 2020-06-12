import { ScrollView, ScrollViewProps } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  ScrollViewProps,
  Pick<ScrollViewProps, 'style' | 'contentContainerStyle'>,
  Pick<ScrollViewProps, 'endFillColor' | 'indicatorStyle'>
>(
  ScrollView,
  ['style', 'contentContainerStyle'],
  ['endFillColor', 'indicatorStyle']
);
