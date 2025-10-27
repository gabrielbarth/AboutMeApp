import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'src/hooks';
import { Theme } from 'root/src/constants/styles/theme/types';

interface FabActionsProps {
  onPress: () => void;
}

export const FloatingActionButton: React.FC<FabActionsProps> = ({
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.9}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="plus"
          size={32}
          color={theme.colors.background}
        />
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      right: theme.spacing.medium,
      bottom: '16%',
    },
    content: {
      backgroundColor: theme.colors.button,
      borderRadius: theme.spacing.base,
      width: 56,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: theme.spacing.xxsmall,
      elevation: theme.spacing.xxsmall,
    },
  });
