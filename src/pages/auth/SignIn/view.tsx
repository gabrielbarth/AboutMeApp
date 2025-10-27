import { Controller } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'src/components/Button';
import { Divider } from 'src/components/Divider';
import { TextInput } from 'src/components/TextInput';
import { Theme } from 'src/constants/styles/theme/types';
import { rules } from 'src/constants/validation/rules';
import { useTheme } from 'src/hooks';
import { useSignInViewModel } from './viewModel';

const SigninView = () => {
  const { theme } = useTheme();
  const {
    control,
    errors,
    handleSubmit,
    handleSignInWithEmail,
    handleForgotPassword,
    handleGoogleSignIn,
    handleSignUp,
    isLoading,
  } = useSignInViewModel();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Conecte-se para treinar junto com a galera
      </Text>
      <Controller
        control={control}
        name="email"
        rules={rules().email}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="E-mail"
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
      <Text onPress={handleForgotPassword} style={styles.forgotText}>
        Esqueceu a senha?
      </Text>
      <Button
        onPress={handleSubmit(handleSignInWithEmail)}
        title="Entrar"
        children={undefined}
        style={styles.button}
        disabled={isLoading}
        loading={isLoading}
      />
      <Divider mode="double" spacing={theme.spacing.xlarge} />
      <Button
        onPress={handleGoogleSignIn}
        icon="google"
        title="Entrar com o Google"
        mode="outlined"
        children={undefined}
        disabled={isLoading}
        loading={isLoading}
      />
      <View style={styles.footer}>
        <Text style={styles.question}>Ainda não tem uma conta?</Text>
        <Text onPress={handleSignUp} style={styles.text}>
          Criar minha conta
        </Text>
      </View>
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
    input: {
      marginVertical: theme.spacing.base,
    },
    title: {
      ...theme.fonts.headlineSmall,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginTop: theme.spacing.medium,
    },
    forgotText: {
      ...theme.fonts.labelLarge,
      paddingLeft: theme.spacing.small,
      fontWeight: '500',
      color: theme.colors.button,
    },
    button: {
      marginTop: theme.spacing.xxlarge,
    },
    text: {
      ...theme.fonts.labelLarge,
      fontWeight: '500',
      color: theme.colors.button,
    },
    question: {
      ...theme.fonts.labelLarge,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.base,
    },
    footer: {
      flexGrow: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: theme.spacing.large,
    },
  });

export { SigninView };
