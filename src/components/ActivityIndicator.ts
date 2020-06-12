import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  ActivityIndicatorProps,
  Pick<ActivityIndicatorProps, 'style'>,
  Pick<ActivityIndicatorProps, 'color'>
>(ActivityIndicator, ['style'], ['color']);
