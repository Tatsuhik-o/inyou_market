import { z } from "zod";
import { SignUpSchema } from "./schemas";

export type TContext = {
  handleThemeChange: () => void;
  currentLanguage: "en" | "ja";
  handleLanguageChange: () => void;
  currentTheme: "light" | "dark";
};

export type TSignUp = z.infer<typeof SignUpSchema>;
