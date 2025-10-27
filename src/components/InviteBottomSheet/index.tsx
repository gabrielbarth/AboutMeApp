import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from 'src/hooks';
import { Theme } from 'src/constants/styles/theme/types';

export interface InviteBottomSheetRef {
  open: () => void;
  close: () => void;
}

interface InviteBottomSheetProps {
  inviteLink: string;
}

// eslint-disable-next-line react/display-name
export const InviteBottomSheet = forwardRef<
  InviteBottomSheetRef,
  InviteBottomSheetProps
>(({ inviteLink }, ref) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  const handleCopy = useCallback(async () => {
    await Clipboard.setStringAsync(inviteLink);
    // Adicione feedback visual se desejar
  }, [inviteLink]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={() => setVisible(false)}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => setVisible(false)}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.sheet}
          onPress={() => {}}>
          <View style={styles.container}>
            <Text style={styles.title}>Adicionar participante</Text>
            <Text style={styles.description}>
              Basta compartilhar o link do convite para entrar no grupo.
            </Text>
            <View style={styles.linkRow}>
              <Text
                style={styles.linkText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {inviteLink}
              </Text>
              <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
                <Feather name="copy" size={26} color={theme.colors.button} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
});

const { width } = Dimensions.get('window');

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: '#0008',
      justifyContent: 'flex-end',
    },
    sheet: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingTop: theme.spacing.xxsmall,
      paddingBottom: 32,
      minHeight: 260,
      width: width,
      alignItems: 'center',
    },
    container: {
      width: '100%',
      padding: theme.spacing.medium,
    },
    title: {
      ...theme.fonts.headlineSmall,
      color: theme.colors.textPrimary,
      fontWeight: 'bold',
      marginBottom: theme.spacing.small,
    },
    description: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xlarge,
    },
    linkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.medium,
      paddingVertical: theme.spacing.small,
      borderRadius: 32,
    },
    linkText: {
      flex: 1,
      ...theme.fonts.bodyMedium,
      color: theme.colors.textSecondary,
    },
    copyButton: {
      marginLeft: theme.spacing.medium,
      padding: theme.spacing.xsmall,
    },
  });
