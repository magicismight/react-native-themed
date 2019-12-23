import { TouchableHighlight, TouchableHighlightProps, ViewStyle } from 'react-native';
import createThemedComponent, { transformValue, ThemeProps } from '../createThemedComponent';
import { transformPropsWithStyle } from './transformers';

function transformTouchableHighlightProps(props: ThemeProps<ViewStyle, TouchableHighlightProps>, mode: string): TouchableHighlightProps {
  const themedStyleProps = transformPropsWithStyle(props, mode);

  return {
    ...themedStyleProps,
    underlayColor: transformValue(props.underlayColor as string | undefined, mode)
  };
}

export default createThemedComponent(TouchableHighlight, transformTouchableHighlightProps);
