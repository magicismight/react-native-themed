import { Image, ImageProps, ImageStyle } from 'react-native';
import createThemedComponent from '../createThemedComponent';

export default createThemedComponent<
  ImageProps,
  {
    style: ImageStyle;
  },
  Pick<ImageProps, 'source' | 'loadingIndicatorSource' | 'defaultSource'>
>(Image, ['style'], ['source', 'loadingIndicatorSource', 'defaultSource']);
