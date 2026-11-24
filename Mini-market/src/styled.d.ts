import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    colors: {
      bgCanvas: string;
      bgSurface: string;
      bgSurfaceHover: string;
      bgMuted: string;
      textPrimary: string;
      textSecondary: string;
      textMuted: string;
      textInverse: string;
      borderDefault: string;
      borderFocus: string;
      primary: string;
      primaryHover: string;
      primarySubtle: string;
      secondary: string;
      secondaryHover: string;
      danger: string;
      dangerHover: string;
      dangerSubtle: string;
      success: string;
      successSubtle: string;
      warning: string;
      warningSubtle: string;
      shadowCard: string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    transitions: {
      fast: string;
      normal: string;
    };
  }
}
