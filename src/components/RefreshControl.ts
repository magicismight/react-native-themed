import { RefreshControl, RefreshControlProps, ViewStyle } from 'react-native';
import createThemedComponent, {
  transformValue
} from '../createThemedComponent';
import ThemedValue from '../ThemedValue';

function transformRefreshControlProps(
  props: Omit<
    RefreshControlProps,
    'colors' | 'progressBackgroundColor' | 'tintColor' | 'titleColor'
  > & {
    colors?:
      | ThemedValue<
          { [name: string]: string[] | undefined },
          string[] | undefined
        >
      | string[];
    progressBackgroundColor?:
      | ThemedValue<{ [name: string]: string | undefined }, string | undefined>
      | string;
    tintColor?:
      | ThemedValue<{ [name: string]: string | undefined }, string | undefined>
      | string;
    titleColor?:
      | ThemedValue<{ [name: string]: string | undefined }, string | undefined>
      | string;
  },
  mode: string
): RefreshControlProps {
  const { colors, progressBackgroundColor, tintColor, titleColor } = props;

  return {
    ...props,
    colors: transformValue(colors, mode),
    progressBackgroundColor: transformValue(progressBackgroundColor, mode),
    tintColor: transformValue(tintColor, mode),
    titleColor: transformValue(titleColor, mode)
  };
}

export default createThemedComponent<
  RefreshControlProps,
  ViewStyle,
  Pick<
    RefreshControlProps,
    'colors' | 'progressBackgroundColor' | 'tintColor' | 'titleColor'
  >
>(RefreshControl, transformRefreshControlProps);
