import { Image, StyleSheet, Text, View } from 'react-native';
import { Theme } from 'src/constants/styles/theme/types';
import { useTheme } from 'src/hooks';

interface ImagePreviewProps {
  imageUri?: string;
  onRemove: (imageUri: string | null) => void;
}

const ImagePreview = ({ imageUri, onRemove }: ImagePreviewProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.closeActionContainer}>
        <Text
          onPress={() => onRemove(null)}
          style={styles.closeActionText}
          accessibilityLabel="Remover imagem">
          ×
        </Text>
      </View>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    image: {
      width: 200,
      height: 200,
      borderRadius: theme.spacing.base,
    },
    closeActionContainer: {
      position: 'absolute',
      width: 22,
      height: 22,
      borderRadius: 11,
      justifyContent: 'center',
      alignItems: 'center',
      top: -5,
      right: -5,
      backgroundColor: theme.colors.error,
      zIndex: 1,
    },
    closeActionText: {
      ...theme.fonts.default,
      color: theme.colors.onPrimary,
    },
  });

export { ImagePreview };
