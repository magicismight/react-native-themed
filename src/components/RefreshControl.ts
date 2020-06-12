import { RefreshControl, RefreshControlProps, ViewStyle } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  RefreshControlProps,
  {
    style: ViewStyle;
  },
  Pick<
    RefreshControlProps,
    'colors' | 'progressBackgroundColor' | 'tintColor' | 'titleColor'
  >
>(
  RefreshControl,
  ['style'],
  ['colors', 'progressBackgroundColor', 'tintColor', 'titleColor']
);
