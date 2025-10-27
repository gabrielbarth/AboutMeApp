import React from 'react';
import {
  SafeAreaView as RNSafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import { useTheme } from 'src/hooks';
import { Theme } from 'src/constants/styles/theme/types';

interface SafeAreaViewProps {
  children: React.ReactNode;
}

const SafeAreaView = ({ children }: SafeAreaViewProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return <RNSafeAreaView style={styles.safeArea}>{children}</RNSafeAreaView>;
};

const isAndroid = Platform.OS === 'android';
const getStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingTop: isAndroid ? theme.spacing.large : undefined,
      backgroundColor: theme.colors.background,
    },
  });

export { SafeAreaView };
