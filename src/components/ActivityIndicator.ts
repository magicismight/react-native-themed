import {
  ActivityIndicator,
  ActivityIndicatorProps,
  ViewStyle
} from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  ActivityIndicatorProps,
  {
    style: ViewStyle;
  },
  Pick<ActivityIndicatorProps, 'color'>
>(ActivityIndicator, ['style'], ['color']);
