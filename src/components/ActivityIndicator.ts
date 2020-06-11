import {
  ViewStyle,
  ActivityIndicator,
  ActivityIndicatorProps
} from 'react-native';
import createThemedComponent, {
  transformValue,
  ThemeProps
} from '../createThemedComponent';
import { transformPropsWithStyle } from './transformers';

function transformActivityIndicatorProps(
  props: ThemeProps<ViewStyle, ActivityIndicatorProps>,
  mode: string
): ActivityIndicatorProps {
  return {
    ...transformPropsWithStyle(props, mode),
    color: transformValue(props.color as string | undefined, mode)
  };
}

export default createThemedComponent(
  ActivityIndicator,
  transformActivityIndicatorProps
);
