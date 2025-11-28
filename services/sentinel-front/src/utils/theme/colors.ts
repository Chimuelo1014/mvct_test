export const palette = {
  colors: {
    layout: {
      // Colores primarios - Rosa/Magenta como en la imagen
      primary: '#FF1B6D',
      primaryLight: '#FF4D8D',
      primaryDark: '#CC1558',
      
      // Colores secundarios
      secondary: '#1A1A1A',
      secondaryLight: '#2D2D2D',
      secondaryDark: '#0F0F0F',
      
      // Neutrales
      background: '#0A0A0A',
      surface: '#1A1A1A',
      surfaceLight: '#2D2D2D',
      
      text: {
        primary: '#FFFFFF',
        secondary: '#B0B0B0',
        tertiary: '#808080',
      },
      
      // Estados
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
      info: '#3B82F6',
      
      // Bordes
      border: '#333333',
      borderLight: '#404040',
      borderDark: '#1F1F1F',
    },
  },
};

export type PaletteColors = typeof palette.colors.layout;