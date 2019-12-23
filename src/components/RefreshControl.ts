import { RefreshControl, RefreshControlProps } from 'react-native';
import createThemedComponent, { transformValue } from '../createThemedComponent';
import ThemedValue from '../ThemedValue';
import { transformArray } from './transformers';

function transformRefreshControlProps(props: RefreshControlProps
  & {
    colors?: Array<ThemedValue<{ [name: string]: string }, string> | string>;
    progressBackgroundColor?: ThemedValue<{ [name: string]: string }, string>;
    tintColor?: ThemedValue<{ [name: string]: string }, string>;
    titleColor?: ThemedValue<{ [name: string]: string }, string>;
  }
  , mode: string): RefreshControlProps {
    const { colors, progressBackgroundColor, tintColor, titleColor } = props;

  return {
    ...props,
    colors: transformArray(colors, mode) as string[],
    progressBackgroundColor: transformValue(progressBackgroundColor, mode),
    tintColor: transformValue(tintColor, mode),
    titleColor: transformValue(titleColor, mode),
  };
}

// @ts-ignore
export default createThemedComponent(RefreshControl, transformRefreshControlProps);
