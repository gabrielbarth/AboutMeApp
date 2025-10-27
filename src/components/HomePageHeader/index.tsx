import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme, useUserAccount } from 'src/hooks';
import { Theme } from 'src/constants/styles/theme/types';

interface HomePageHeaderProps {
  onPressProfile?: () => void;
}

const HomePageHeader: React.FC<HomePageHeaderProps> = ({
  onPressProfile,
}: HomePageHeaderProps) => {
  const { theme } = useTheme();
  const { user } = useUserAccount();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rolê Fitness</Text>
      {onPressProfile && (
        <TouchableOpacity onPress={onPressProfile} activeOpacity={0.7}>
          <Image source={{ uri: user?.photoUrl }} style={styles.image} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: theme.colors.background,
      paddingVertical: theme.spacing.medium,
      paddingHorizontal: theme.spacing.base,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      ...theme.fonts.bodyLarge,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    image: {
      width: theme.spacing.xxlarge,
      height: theme.spacing.xxlarge,
      borderRadius: theme.spacing.medium,
      backgroundColor: theme.colors.surface,
    },
  });

export { HomePageHeader };
