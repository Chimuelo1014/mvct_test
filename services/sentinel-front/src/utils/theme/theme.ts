import { palette } from './colors';

export type ThemeMode = 'dark' | 'light';

export interface ThemeConfig {
  colors: typeof palette.colors.layout;
  mode: ThemeMode;
}

// Tema oscuro (por defecto - como OCTO SMM)
export const darkTheme: ThemeConfig = {
  mode: 'dark',
  colors: {
    ...palette.colors.layout,
    background: '#0A0A0A',
    surface: '#1A1A1A',
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      tertiary: '#808080',
    },
  },
};

// Tema claro
export const lightTheme: ThemeConfig = {
  mode: 'light',
  colors: {
    ...palette.colors.layout,
    primary: '#FF1B6D',
    primaryLight: '#FF4D8D',
    primaryDark: '#CC1558',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceLight: '#EFEFEF',
    text: {
      primary: '#0A0A0A',
      secondary: '#4A4A4A',
      tertiary: '#808080',
    },
    border: '#E0E0E0',
    borderLight: '#F0F0F0',
    borderDark: '#D0D0D0',
  },
};