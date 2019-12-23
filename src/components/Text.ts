import { TextProps, TextStyle, Text } from 'react-native';
import createThemedComponent, { transformValue, ThemeProps } from '../createThemedComponent';
import { transformPropsWithStyle } from './transformers';

function transformTextProps(props: ThemeProps<TextStyle, TextProps>, mode: string): TextProps {
  const themedStyleProps = transformPropsWithStyle(props, mode);

  return {
    ...themedStyleProps,
    selectionColor: transformValue(props.selectionColor as string | undefined, mode)
  };
}

export default createThemedComponent(Text, transformTextProps);
