import { RefreshControl, RefreshControlProps } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  RefreshControlProps,
  Pick<RefreshControlProps, 'style'>,
  Pick<
    RefreshControlProps,
    'colors' | 'progressBackgroundColor' | 'tintColor' | 'titleColor'
  >
>(
  RefreshControl,
  ['style'],
  ['colors', 'progressBackgroundColor', 'tintColor', 'titleColor']
);
