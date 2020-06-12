import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  TouchableOpacityProps,
  {
    style: ViewStyle;
  }
>(TouchableOpacity, ['style']);
