import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App';
import { AppThemeProvider } from './context/ThemeContext';
import { GlobalStyle } from './theme/GlobalStyle';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <GlobalStyle />
      <App />
    </AppThemeProvider>
  </React.StrictMode>
)
