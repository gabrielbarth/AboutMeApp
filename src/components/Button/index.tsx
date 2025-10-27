import React from 'react';
import {
  Button as RNPaperButton,
  ButtonProps as RNPaperButtonProps,
} from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'src/hooks';
import { getStyles } from './styles';

interface ButtonProps extends RNPaperButtonProps {
  title: string;
  onPress: () => void;
  mode?: 'contained' | 'outlined';
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  title,
  onPress,
  mode = 'contained',
  style,
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const buttonColor =
    mode === 'contained' ? theme.colors.button : 'transparent';
  const textColor =
    mode === 'contained' ? theme.colors.textInvert : theme.colors.button;

  return (
    <RNPaperButton
      mode={mode}
      onPress={onPress}
      style={[styles.container, style]}
      buttonColor={buttonColor}
      textColor={textColor}
      {...props}>
      {title}
    </RNPaperButton>
  );
};

export { Button };
