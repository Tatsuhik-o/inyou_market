import { createContext } from "react";
import type { TContext } from "./types";

export const MyContext = createContext<TContext>({
  handleThemeChange: () => {},
  currentLanguage: "en",
  handleLanguageChange: () => {},
  currentTheme: "light",
});
