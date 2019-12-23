import { Button, ButtonProps } from 'react-native';
import createThemedComponent, { transformValue } from '../createThemedComponent';
import ThemedValue from '../ThemedValue';

function transformButtonProps(props: ButtonProps & { color?: ThemedValue<{ [name: string]: string | undefined }, string | undefined> }, mode: string): ButtonProps {
  return {
    ...props,
    color: transformValue(props.color as string | undefined, mode)
  };
}

// @ts-ignore
export default createThemedComponent(Button, transformButtonProps);
