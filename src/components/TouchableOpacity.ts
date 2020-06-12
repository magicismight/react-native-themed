import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  TouchableOpacityProps,
  Pick<TouchableOpacityProps, 'style'>
>(TouchableOpacity, ['style']);
