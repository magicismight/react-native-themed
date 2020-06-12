import { TouchableHighlight, TouchableHighlightProps } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  TouchableHighlightProps,
  Pick<TouchableHighlightProps, 'style'>,
  Pick<TouchableHighlightProps, 'underlayColor'>
>(TouchableHighlight, ['style'], ['underlayColor']);
