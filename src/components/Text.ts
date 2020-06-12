import { TextProps, Text, TextStyle, ImageStyle } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  TextProps,
  {
    style: TextStyle;
  },
  Pick<TextProps, 'selectionColor'>
>(Text, ['style'], ['selectionColor']);
