import { StyleProp, View, ViewStyle } from 'react-native';
import {
  TextInput as RNPaperTextInput,
  TextInputProps as RNPaperTextInputProps,
  Text,
} from 'react-native-paper';
import { useTheme } from 'src/hooks';
import { getStyles } from './styles';

interface TextInputProps extends RNPaperTextInputProps {
  label: string;
  hasError: boolean;
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const TextInput = ({
  label,
  hasError,
  errorMessage,
  containerStyle,
  ...props
}: TextInputProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const outlineColor = hasError
    ? theme.colors.borderError
    : theme.colors.border;

  return (
    <View style={[styles.container, containerStyle]}>
      <RNPaperTextInput
        mode="outlined"
        label={label}
        outlineColor={theme.colors.border}
        activeOutlineColor={outlineColor}
        outlineStyle={{
          borderWidth: 1,
          borderColor: outlineColor,
        }}
        right={
          hasError && (
            <RNPaperTextInput.Icon
              icon="alert-circle"
              color={theme.colors.borderError}
            />
          )
        }
        style={styles.textInput}
        {...props}
      />
      {hasError && errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export { TextInput };
