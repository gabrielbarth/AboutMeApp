import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from 'src/constants/styles/theme/types';
import { useTheme } from 'src/hooks';

export interface GroupCardProps {
  id: string;
  name: string;
  description?: string;
  participantsAmount: number;
  onPress?: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  name,
  description,
  participantsAmount,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}>
      <View style={styles.rowSpaced}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
        <MaterialIcons
          name="arrow-forward"
          size={20}
          color={theme.colors.textPrimary}
        />
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
      <View style={styles.row}>
        <MaterialIcons
          name="groups-2"
          size={20}
          color={theme.colors.textPrimary}
        />
        <Text style={styles.amountLabel}>Participantes: </Text>
        <Text style={styles.amount}>{participantsAmount}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.spacing.small,
      padding: theme.spacing.medium,
      marginBottom: theme.spacing.medium,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    rowSpaced: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.xsmall,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.base,
    },
    title: {
      ...theme.fonts.titleMedium,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
    description: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.textPrimary,
      marginBottom: 2,
    },
    amountLabel: {
      ...theme.fonts.bodySmall,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginLeft: theme.spacing.xsmall,
    },
    amount: {
      ...theme.fonts.bodySmall,
      color: theme.colors.textPrimary,
    },
  });
