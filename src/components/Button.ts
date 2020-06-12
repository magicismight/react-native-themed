import { Button, ButtonProps } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  ButtonProps,
  {},
  Pick<ButtonProps, 'color'>
>(Button, [], ['color']);
