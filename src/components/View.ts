import { View, ViewProps } from 'react-native';

import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<ViewProps, Pick<ViewProps, 'style'>>(
  View,
  ['style']
);
