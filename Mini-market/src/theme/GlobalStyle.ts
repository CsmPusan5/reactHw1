import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    color-scheme: ${({ theme }) => theme.mode};
  }

  body {
    background-color: ${({ theme }) => theme.colors.bgCanvas};
    color: ${({ theme }) => theme.colors.textPrimary};
    transition: background-color ${({ theme }) => theme.transitions.normal},
                color ${({ theme }) => theme.transitions.normal};
    min-height: 100vh;
  }

  button, input {
    font-family: inherit;
    font-size: inherit;
  }
`;
