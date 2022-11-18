const THEME_TAG = 'theme';
export const theme = localStorage.getItem(THEME_TAG);
export const saveTheme = (val: string) => localStorage.setItem(THEME_TAG, val);
