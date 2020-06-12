import { TextInput, TextInputProps, TextStyle } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  TextInputProps,
  {
    style: TextStyle;
  },
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
