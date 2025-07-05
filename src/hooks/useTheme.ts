import { useEffect, useRef, useState } from "react";
import { createTheme } from "@mui/material";
import type { PaletteOptions } from "@mui/material";

export default function useTheme(cooldown: number = 500) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(() => {
    const temp = localStorage.getItem("theme");
    return temp == "dark" ? "dark" : "light";
  });
  let themeCoolDown = useRef<boolean>(false);

  const lightPalette: PaletteOptions = {
    mode: "light",
    primary: {
      main: "#2F4CDD",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#2BC155",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#B519EC",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F0F0F0",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#333333",
    },
    error: {
      main: "#D32F2F",
      light: "#FF6659",
      dark: "#9A0007",
      contrastText: "#FFFFFF",
    },
  };
  const darkPalette: PaletteOptions = {
    mode: "dark",
    primary: {
      main: "#6E8BFA",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#5DDA86",
      contrastText: "#000000",
    },
    info: {
      main: "#E066FA",
      contrastText: "#000000",
    },
    background: {
      default: "#1F1F1F",
      paper: "#000000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#CCCCCC",
    },
    error: {
      main: "#EF5350",
      light: "#FF867C",
      dark: "#B61827",
      contrastText: "#000000",
    },
  };

  const MyTheme = createTheme({
    palette: {
      ...(currentTheme === "light" ? lightPalette : darkPalette),
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          body2: {
            fontFamily: "Source Code Pro",
          },
        },
      },
    },
  });

  const handleThemeChange = () => {
    if (themeCoolDown.current) return;
    themeCoolDown.current = true;
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
    setTimeout(() => {
      themeCoolDown.current = false;
    }, cooldown);
  };

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  return { handleThemeChange, MyTheme, currentTheme };
}
