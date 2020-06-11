import { TextInput, TextInputProps, TextStyle } from 'react-native';
import createThemedComponent, {
  transformValue,
  ThemeProps
} from '../createThemedComponent';
import { transformPropsWithStyle } from './transformers';

function transformTextInputProps(
  props: ThemeProps<TextStyle, TextInputProps>,
  mode: string
): TextInputProps {
  const themedStyleProps = transformPropsWithStyle(props, mode);

  return {
    ...themedStyleProps,
    placeholderTextColor: transformValue(
      props.placeholderTextColor as string | undefined,
      mode
    ),
    underlineColorAndroid: transformValue(
      props.underlineColorAndroid as string | undefined,
      mode
    ),
    selectionColor: transformValue(
      props.selectionColor as string | undefined,
      mode
    ),
    keyboardAppearance: transformValue(
      props.keyboardAppearance as 'default' | 'light' | 'dark' | undefined,
      mode
    )
  };
}

export default createThemedComponent(TextInput, transformTextInputProps);
