import { createContext } from 'react';

export const ThemeContext = createContext<{ darkTheme: boolean | null; setDarkTheme: ((val: boolean) => void) | null }>({ darkTheme: null, setDarkTheme: null });
