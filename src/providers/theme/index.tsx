import React, { createContext, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Theme } from 'root/src/constants/styles/theme/types';
import { lightTheme, darkTheme } from 'src/constants/styles/theme';

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as ThemeContextProps);

interface ThemeProviderProps {
  children: React.ReactElement;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const deviceColorScheme = useColorScheme();
  const [theme, setTheme] = useState(
    deviceColorScheme === 'dark' ? darkTheme : lightTheme,
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <PaperProvider theme={theme}>{children}</PaperProvider>;
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
