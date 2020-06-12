import { TextProps, Text } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  TextProps,
  Pick<TextProps, 'style'>,
  Pick<TextProps, 'selectionColor'>
>(Text, ['style'], ['selectionColor']);
