import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { useTheme } from 'src/hooks';
import { Theme } from 'src/constants/styles/theme/types';

type ConfirmationModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Voltar',
  onConfirm,
  onCancel,
  loading = false,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  if (!open) return null;

  return (
    <Modal visible={open} contentContainerStyle={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={onCancel}
            disabled={loading}
            style={[styles.button, styles.cancelButton]}>
            <Text style={styles.cancelLabel}>{cancelLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            disabled={loading}
            style={[styles.button, styles.confirmButton]}>
            <Text style={styles.confirmLabel}>{confirmLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: 28,
      padding: theme.spacing.large,
      width: '90%',
    },
    title: {
      ...theme.fonts.headlineSmall,
      fontWeight: '400',
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.base,
    },
    description: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.textSecondary,
    },
    buttonRow: {
      flexDirection: 'row',
      marginTop: theme.spacing.large,
      justifyContent: 'flex-end',
    },
    button: {
      paddingVertical: theme.spacing.base,
      paddingHorizontal: theme.spacing.medium,
      borderRadius: 999,
    },
    cancelButton: {
      backgroundColor: 'transparent',
    },
    confirmButton: {
      backgroundColor: theme.colors.button,
    },
    cancelLabel: {
      color: theme.colors.button,
      fontWeight: 'bold',
      fontSize: theme.fonts.bodyLarge.fontSize,
    },
    confirmLabel: {
      color: theme.colors.surface,
      fontWeight: 'bold',
      fontSize: theme.fonts.bodyLarge.fontSize,
    },
  });
