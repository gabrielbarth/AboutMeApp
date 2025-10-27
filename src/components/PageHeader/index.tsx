import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Theme } from 'src/constants/styles/theme/types';
import { useTheme } from 'src/hooks';

interface PageHeaderProps {
  onPress?: () => void;
  title?: string;
  isCloseAction?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  onPress,
  title,
  isCloseAction,
}: PageHeaderProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const textAlign = !title ? 'center' : 'left';
  const presentedTitle = title || 'Rolê Fitness';
  const iconName = isCloseAction ? 'close' : 'arrow-back';

  const iconSize = 24;
  const iconPaddings = theme.spacing.small + theme.spacing.medium;
  const iconSpace = onPress ? iconSize + iconPaddings : 0;

  return (
    <View style={styles.container}>
      {onPress && (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          style={styles.backButton}>
          <Icon name={iconName} size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      )}
      <Text
        style={{
          ...styles.title,
          textAlign: textAlign,
        }}>
        {presentedTitle}
      </Text>
      {onPress && <View style={{ width: iconSpace, height: iconSize }} />}
    </View>
  );
};

const isAndroid = Platform.OS === 'android';
const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: theme.colors.background,
      paddingVertical: isAndroid ? theme.spacing.medium : theme.spacing.xsmall,
      alignItems: 'center',
    },
    backButton: {
      paddingLeft: theme.spacing.small,
      paddingRight: theme.spacing.medium,
    },
    title: {
      ...theme.fonts.titleMedium,
      flexGrow: 1,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
  });

export { PageHeader };
