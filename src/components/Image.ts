import { Image, ImageProps } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  ImageProps,
  Pick<ImageProps, 'style'>,
  Pick<ImageProps, 'source' | 'loadingIndicatorSource' | 'defaultSource'>
>(Image, ['style'], ['source', 'loadingIndicatorSource', 'defaultSource']);
