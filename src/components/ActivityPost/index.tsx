import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Theme } from 'root/src/constants/styles/theme/types';
import { useTheme } from 'root/src/hooks';

export interface ActivityPostProps {
  user: {
    name: string;
    avatarUrl?: string;
  };
  date: string;
  imageUrl: string;
  title: string;
  description: string;
}

const ActivityPost: React.FC<ActivityPostProps> = ({
  user,
  date,
  imageUrl,
  title,
  description,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.date}> • {date}</Text>
        </View>
      </View>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: theme.spacing.medium,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.small,
    },
    headerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: theme.spacing.small,
      backgroundColor: theme.colors.background,
    },
    userName: {
      ...theme.fonts.bodyLarge,
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
    date: {
      ...theme.fonts.bodySmall,
      color: theme.colors.textTertiary,
    },
    image: {
      width: '100%',
      aspectRatio: 4 / 5,
      resizeMode: 'cover',
      backgroundColor: theme.colors.background,
      borderRadius: 16,
    },
    content: {
      paddingVertical: theme.spacing.small,
    },
    title: {
      ...theme.fonts.titleMedium,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.xsmall,
    },
    description: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.textSecondary,
    },
  });

export { ActivityPost };
