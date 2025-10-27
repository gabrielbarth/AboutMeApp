import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from 'src/constants/styles/theme/types';
import { useTheme } from 'src/hooks';

interface RoleCardProps {
  title: string;
  category: string;
  participants: number;
  limit: number;
  location: string;
  date: string;
  time: string;
  author: string;
  onPress: () => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  title,
  category,
  participants,
  limit,
  location,
  date,
  time,
  author,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.info}>
        Participantes: {participants}/{limit}
      </Text>
      <Text style={styles.info}>Local: {location}</Text>
      <Text style={styles.info}>
        Data: {date} - {time}
      </Text>
      <Text style={styles.author}>Autor: {author}</Text>
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
    title: {
      ...theme.fonts.headlineSmall,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
    category: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.textBrand,
      marginBottom: 4,
    },
    info: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.textPrimary,
    },
    author: {
      ...theme.fonts.bodySmall,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xsmall,
    },
  });
