import React from 'react';
import { SvgProps } from 'react-native-svg';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'src/hooks';
import { Button } from 'src/components/Button';
import { Theme } from 'src/constants/styles/theme/types';

interface EmptyPageProps {
  title: string;
  description: string;
  illustration: React.FC<SvgProps>;
  illustrationProps?: SvgProps;
  actionTitle: string;
  onPress: () => void;
}

const EmptyPage = ({
  title,
  description,
  illustration,
  illustrationProps,
  actionTitle,
  onPress,
}: EmptyPageProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const IllustrationComponent = illustration;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {!!illustration && <IllustrationComponent {...illustrationProps} />}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Button
          icon="plus"
          mode="contained"
          title={actionTitle}
          onPress={onPress}
          children={undefined}
          style={styles.button}
        />
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
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing.xxlarge,
    },
    title: {
      ...theme.fonts.titleMedium,
      fontWeight: 'bold',
      marginVertical: theme.spacing.xsmall,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    description: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.textTertiary,
      textAlign: 'center',
    },
    button: {
      marginTop: theme.spacing.large,
      alignSelf: 'center',
    },
  });

export { EmptyPage };
