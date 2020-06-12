import ThemeContext from './ThemeContext';

export const ThemeProvider = ThemeContext.Provider;
export {
  default as createThemedComponent,
  ThemeProps,
  ThemeStyle
} from './createThemedComponent';
export { default as createPalette } from './createPalette';
import ActivityIndicator from './components/ActivityIndicator';
import Button from './components/Button';
import FlatList from './components/FlatList';
import ScrollView from './components/ScrollView';
import RefreshControl from './components/RefreshControl';
import TouchableHighlight from './components/TouchableHighlight';
import TouchableOpacity from './components/TouchableOpacity';
import View from './components/View';
import Text from './components/Text';
import TextInput from './components/TextInput';
import Image from './components/Image';
import Value from './ThemedValue';

export default {
  Value,
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  RefreshControl,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  TouchableOpacity
};
