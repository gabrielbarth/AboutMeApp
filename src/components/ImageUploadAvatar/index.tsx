import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'src/hooks';
import { Theme } from 'src/constants/styles/theme/types';

interface ImageUploadAvatarProps {
  imageUri: string;
  label?: string;
  onPress: () => void;
}

export const ImageUploadAvatar: React.FC<ImageUploadAvatarProps> = ({
  imageUri,
  label = 'Alterar foto',
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.avatarButton}>
        <Image source={{ uri: imageUri }} style={styles.avatar} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.action}
        onPress={onPress}
        activeOpacity={0.8}>
        <Feather
          name="edit-2"
          size={18}
          color={theme.colors.textBrand}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarButton: {
      marginBottom: theme.spacing.xsmall,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.surface,
    },
    action: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.small,
    },
    text: {
      ...theme.fonts.labelLarge,
      color: theme.colors.textBrand,
      fontWeight: '500',
    },
  });
