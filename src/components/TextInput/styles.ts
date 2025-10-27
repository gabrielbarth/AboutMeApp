import { StyleSheet } from 'react-native';
import { Theme } from 'root/src/constants/styles/theme/types';

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
    },
    textInput: {
      ...theme.fonts.bodyLarge,
      height: 56,
    },
    errorMessage: {
      color: theme.colors.borderError,
      marginHorizontal: theme.spacing.base,
      marginTop: theme.spacing.xsmall,
    },
  });

export { getStyles };
