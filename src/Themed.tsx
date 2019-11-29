
import ThemeContext from './ThemeContext';

export const ThemeProvider = ThemeContext.Provider;
export { default as createThemedComponent } from './createThemedComponent';
export { default as createPalette } from './createPalette';
import View from './components/View';
import Text from './components/Text';
import Image from './components/Image';
import Value from './ThemedValue';

export default {
  Value,
  View,
  Text,
  Image
}
