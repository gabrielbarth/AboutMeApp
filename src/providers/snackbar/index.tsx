import React, { createContext, useCallback, useState } from 'react';
import { Text } from 'react-native';
import { Snackbar, Portal } from 'react-native-paper';
import { useTheme } from 'src/hooks/theme';

type SnackbarType = 'success' | 'error' | 'info';
type SnackbarDuration = 'short' | 'medium' | 'long';

export enum SnackbarDurationEnum {
  DURATION_SHORT = 4000,
  DURATION_MEDIUM = 7000,
  DURATION_LONG = 10000,
}

interface SnackbarOptions {
  text: string;
  duration?: SnackbarDuration;
  type?: SnackbarType;
  action?: { label: string; onPress: () => void };
  onDismiss?: () => void;
}

interface SnackbarContextData {
  showSnackbar: (options: SnackbarOptions) => void;
}

export const SnackbarContext = createContext<SnackbarContextData | undefined>(
  undefined,
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<SnackbarOptions>({
    text: '',
    type: 'info',
    duration: 'short',
  });

  const showSnackbar = useCallback((opts: SnackbarOptions) => {
    setOptions({
      duration: 'short',
      type: 'info',
      ...opts,
    });
    setVisible(true);
  }, []);

  const dismissSnackbar = () => {
    setVisible(false);
    options.onDismiss?.();
  };

  const getColor = (type?: SnackbarType) => {
    switch (type) {
      case 'success':
        return {
          background: theme.colors.primary,
          color: 'white',
        };
      case 'error':
        return {
          background: theme.colors.error,
          color: 'white',
        };
      case 'info':
      default:
        return {
          background: theme.colors.primary,
          color: 'white',
        };
    }
  };

  const getDuration = (duration?: SnackbarDuration) => {
    switch (duration) {
      case 'short':
        return SnackbarDurationEnum.DURATION_SHORT;
      case 'medium':
        return SnackbarDurationEnum.DURATION_MEDIUM;
      case 'long':
      default:
        return SnackbarDurationEnum.DURATION_LONG;
    }
  };

  const snackBarDuration = getDuration(options.duration);
  const snackBarColor = getColor(options.type);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Portal>
        <Snackbar
          visible={visible}
          duration={snackBarDuration}
          onDismiss={dismissSnackbar}
          action={options.action}
          style={{
            backgroundColor: snackBarColor.background,
          }}>
          <Text style={{ color: snackBarColor.color }}>{options.text}</Text>
        </Snackbar>
      </Portal>
    </SnackbarContext.Provider>
  );
};
