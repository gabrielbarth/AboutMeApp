import React from 'react';
import { AppRegistry } from 'react-native';
import * as app from 'root/app.json';
import { ThemeProvider } from 'src/providers/theme';
import { SnackbarProvider } from 'src/providers/snackbar';
import { UserAccountProvider } from 'src/providers/userAccount';
import { useHandleDeepLinks } from 'src/hooks';

interface AppProvidersProps {
  children: React.ReactElement;
}

function AppProviders({ children }: AppProvidersProps) {
  useHandleDeepLinks();
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <UserAccountProvider>{children}</UserAccountProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

AppRegistry.registerComponent(app.expo.name, () => AppProviders);

export { AppProviders };
