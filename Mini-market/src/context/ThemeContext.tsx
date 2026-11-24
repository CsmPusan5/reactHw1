import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../theme/themes";

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
    mode: ThemeMode;
    toggleTheme: () => void;
}

const STORAGE_KEY = 'mini-market-theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getInitialTheme = (): ThemeMode => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
        return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(getInitialTheme);

    useEffect(() => {
        const mediaQuerry = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
                setMode(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuerry.addEventListener('change', handleSystemChange);
        return () => mediaQuerry.removeEventListener('change', handleSystemChange);
    }, []);

    const toggleTheme = ()  => {
        setMode((prev) => {
            const next = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem(STORAGE_KEY, next);
            return next;
        })
    }

    const activeTheme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <StyledThemeProvider theme={activeTheme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useThemeMode = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useYhemeMode must be used within AppThemeProvider');
    }
    return context;
}