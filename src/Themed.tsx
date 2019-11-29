
import ThemeContext from './ThemeContext';

export const ThemeProvider = ThemeContext.Provider;
export { default as createThemedComponent } from './createThemedComponent';
export { default as createPalette } from './createPalette';

export default {
  get View() {
    return require('./components/View');
  },
  get Text() {
    return require('./components/Text');
  },
  get Image() {
    return require('./components/Image');
  },
  get Value() {
    return require('./ThemedValue');
  }
}
