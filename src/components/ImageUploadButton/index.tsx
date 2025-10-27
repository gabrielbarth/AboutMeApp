import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useTheme } from 'src/hooks';
import { Theme } from 'src/constants/styles/theme/types';

interface ImageUploadButtonProps {
  title?: string;
  onPress: () => void;
}

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  title = 'Adicionar imagem',
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.iconBox}>
        <MaterialIcons name="image" size={28} color={theme.colors.button} />
      </View>
      <View style={styles.content}>
        <Feather
          name="upload"
          size={20}
          color={theme.colors.button}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
      borderRadius: theme.spacing.small,
      overflow: 'hidden',
      alignItems: 'center',
      height: 64,
      marginBottom: theme.spacing.medium,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    iconBox: {
      backgroundColor: theme.colors.surface,
      height: '100%',
      width: 64,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.medium,
      justifyContent: 'center',
      flex: 1,
      height: '100%',
    },
    text: {
      color: theme.colors.button,
      fontSize: theme.fonts.bodyLarge.fontSize,
      fontWeight: '500',
    },
  });
