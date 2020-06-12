import { TextInput, TextInputProps } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  TextInputProps,
  Pick<TextInputProps, 'style'>,
  Pick<
    TextInputProps,
    | 'placeholderTextColor'
    | 'underlineColorAndroid'
    | 'selectionColor'
    | 'keyboardAppearance'
  >
>(
  TextInput,
  ['style'],
  [
    'placeholderTextColor',
    'underlineColorAndroid',
    'selectionColor',
    'keyboardAppearance'
  ]
);
