import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from 'src/hooks';
import { Theme } from 'src/constants/styles/theme/types';
import { Button } from 'src/components/Button';
import OnboardingIllustration from 'src/assets/illustrations/onboarding.svg';
import { useOnboardingViewModel } from './viewModel';

const OnboardingView = () => {
  const { handleLogin, handleCreateAccount } = useOnboardingViewModel();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <OnboardingIllustration width="100%" height="320" />
        <Text style={styles.text}>
          Nunca foi <Text style={styles.textHighlight}>tão fácil</Text>{' '}
          participar de um rolê fitness com os amigos
        </Text>
      </View>
      <Button
        mode="contained"
        title="Entrar"
        onPress={handleLogin}
        children={undefined}
        style={styles.button}
      />
      <Button
        mode="outlined"
        title="Criar uma conta"
        onPress={handleCreateAccount}
        children={undefined}
        style={styles.button}
      />
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.medium,
      backgroundColor: theme.colors.background,
    },
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing.large,
    },
    text: {
      ...theme.fonts.headlineMedium,
      fontWeight: 'bold',
      marginVertical: theme.spacing.large,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    textHighlight: {
      ...theme.fonts.headlineMedium,
      fontWeight: 'bold',
      marginVertical: theme.spacing.large,
      color: theme.colors.textBrand,
    },
    button: {
      marginBottom: theme.spacing.medium,
    },
  });

export { OnboardingView };
