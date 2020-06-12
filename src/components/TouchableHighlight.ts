import {
  TouchableHighlight,
  TouchableHighlightProps,
  ViewStyle
} from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  TouchableHighlightProps,
  {
    style: ViewStyle;
  },
  Pick<TouchableHighlightProps, 'underlayColor'>
>(TouchableHighlight, ['style'], ['underlayColor']);
