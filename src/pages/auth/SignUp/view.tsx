import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Controller } from 'react-hook-form';
import { useTheme } from 'src/hooks';
import { Button } from 'src/components/Button';
import { TextInput } from 'src/components/TextInput';
import { Divider } from 'src/components/Divider';
import { Theme } from 'src/constants/styles/theme/types';
import { rules } from 'src/constants/validation/rules';
import { useSignUpViewModel } from './viewModel';

const SignUpView = () => {
  const {
    control,
    handleSubmit,
    errors,
    handleCreateAccount,
    password,
    handleCreateAccountWithGoogle,
    isLoading,
  } = useSignUpViewModel();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Crie sua conta e comece a se movimentar
        </Text>
        <View style={styles.formContainer}>
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
          <Controller
            control={control}
            name="name"
            rules={rules().name}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nome"
                placeholder="Insira seu nome"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                hasError={!!errors.name}
                errorMessage={errors.name?.message?.toString()}
                containerStyle={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={rules().password}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Senha"
                placeholder="Insira sua senha"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                hasError={!!errors.password}
                errorMessage={errors.password?.message?.toString()}
                containerStyle={styles.input}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: rules().confirmPassword.required,
              validate: (value) =>
                rules().confirmPassword.validate(value, password),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Confirme sua senha"
                placeholder="Insira sua senha novamente"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                hasError={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message?.toString()}
                containerStyle={styles.input}
              />
            )}
          />
        </View>
        <Button
          mode="contained"
          title="Criar minha conta"
          onPress={handleSubmit(handleCreateAccount)}
          children={undefined}
          loading={isLoading}
          disabled={isLoading}
        />
        <Divider spacing={theme.spacing.large} mode="double" />
        <Button
          title="Criar com o Google"
          onPress={handleCreateAccountWithGoogle}
          icon="google"
          mode="outlined"
          children={undefined}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
    </ScrollView>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.medium,
      backgroundColor: theme.colors.background,
      paddingBottom: theme.spacing.large,
    },
    title: {
      ...theme.fonts.headlineSmall,
      fontWeight: 'bold',
      marginTop: theme.spacing.base,
      marginBottom: theme.spacing.xsmall,
      color: theme.colors.textPrimary,
    },
    formContainer: {
      flexGrow: 1,
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
    input: {
      marginVertical: theme.spacing.base,
    },
  });

export { SignUpView };
