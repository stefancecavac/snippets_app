import { create } from "zustand";

type ThemeState = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export const useThemeChangerStore = create<ThemeState>((set) => {
  const initialTheme = sessionStorage.getItem("theme") === "dark";

  if (initialTheme) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  return {
    darkMode: initialTheme,
    toggleTheme: () =>
      set((state) => {
        const newTheme = !state.darkMode;
        sessionStorage.setItem("theme", newTheme ? "dark" : "light");
        if (newTheme) {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
        }
        return { darkMode: newTheme };
      }),
  };
});
