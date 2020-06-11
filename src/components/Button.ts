import { Button, ButtonProps, ViewStyle } from 'react-native';
import createThemedComponent, {
  transformValue
} from '../createThemedComponent';
import ThemedValue from '../ThemedValue';

function transformButtonProps(
  props: Omit<ButtonProps, 'color'> & {
    color?:
      | ThemedValue<{ [name: string]: string | undefined }, string | undefined>
      | string;
  },
  mode: string
): ButtonProps {
  return {
    ...props,
    color: transformValue(props.color, mode)
  };
}

export default createThemedComponent<
  ButtonProps,
  ViewStyle,
  Pick<ButtonProps, 'color'>
>(Button, transformButtonProps);
