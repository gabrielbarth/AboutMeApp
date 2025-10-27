import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'src/hooks';
import { Theme } from 'src/constants/styles/theme/types';

interface DividerProps {
  spacing?: number;
  mode?: 'single' | 'double';
}

const Divider = ({ spacing, mode }: DividerProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme, spacing || 0);

  if (mode === 'double') {
    return (
      <View style={styles.row}>
        <View style={styles.halfDivider} />
        <Text style={styles.text}>ou</Text>
        <View style={styles.halfDivider} />
      </View>
    );
  }

  return <View style={styles.singleDivider} />;
};

const getStyles = (theme: Theme, spacing: number) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text: {
      ...theme.fonts.bodySmall,
      color: theme.colors.textPrimary,
    },
    halfDivider: {
      width: '45%',
      height: 1,
      backgroundColor: theme.colors.outlineVariant,
      marginVertical: spacing,
    },
    singleDivider: {
      width: '100%',
      height: 1,
      backgroundColor: theme.colors.outlineVariant,
      marginVertical: spacing,
    },
  });

export { Divider };
