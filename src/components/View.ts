import { View, ViewProps, ViewStyle } from 'react-native';

import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<ViewProps, { style: ViewStyle }>(View, [
  'style'
]);
