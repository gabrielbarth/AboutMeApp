import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

import { useTheme } from 'src/hooks';
import { Button } from 'src/components/Button';
import { TextInput } from 'src/components/TextInput';
import { Theme } from 'src/constants/styles/theme/types';
import { rules } from 'src/constants/validation/rules';
import PensiveEmoji from 'src/assets/illustrations/emoji_pensive.svg';
import { useResetPasswordViewModel } from './viewModel';

const ResetPasswordView = () => {
  const { control, handleSubmit, errors, handleSendMail, isLoading } =
    useResetPasswordViewModel();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <PensiveEmoji width="100%" height="56" />
        <Text style={styles.title}>Esqueceu a senha?</Text>
        <Text style={styles.description}>
          Nós te ajudamos a recuperar o acesso a sua conta, basta informar o seu
          email que te enviamos as instruções.
        </Text>
        <Controller
          control={control}
          name="email"
          rules={rules().email}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              keyboardType="email-address"
              placeholder="Insira o email"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              hasError={!!errors.email}
              errorMessage={errors.email?.message?.toString()}
              containerStyle={styles.input}
            />
          )}
        />
      </View>
      <Button
        title="Enviar email"
        onPress={handleSubmit(handleSendMail)}
        children={undefined}
        style={styles.button}
        loading={isLoading}
        disabled={isLoading}
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
    title: {
      ...theme.fonts.headlineSmall,
      fontWeight: 'bold',
      marginTop: theme.spacing.large,
      color: theme.colors.textPrimary,
    },
    description: {
      ...theme.fonts.bodyMedium,
      marginTop: theme.spacing.xsmall,
      color: theme.colors.textSecondary,
    },
    input: {
      marginTop: theme.spacing.medium,
    },
    button: {
      marginBottom: theme.spacing.medium,
    },
  });

export { ResetPasswordView };
