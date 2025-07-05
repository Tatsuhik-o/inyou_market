import { z } from "zod";
import { SignUpSchema, LoginSchema } from "./schemas";

export type TContext = {
  handleThemeChange: () => void;
  currentLanguage: "en" | "ja";
  handleLanguageChange: () => void;
  currentTheme: "light" | "dark";
};

export type TSignUp = z.infer<typeof SignUpSchema>;

export type TLogin = z.infer<typeof LoginSchema>;
