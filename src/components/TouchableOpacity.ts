import { TouchableOpacity } from 'react-native';
import createThemedComponent from '../createThemedComponent';
import { transformPropsWithStyle } from './transformers';

export default createThemedComponent(TouchableOpacity, transformPropsWithStyle);
