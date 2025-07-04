import { useRef, useState } from "react";
import { createTheme } from "@mui/material";
import type { PaletteOptions } from "@mui/material";

export default function useTheme(cooldown: number = 500) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(() => {
    const temp = localStorage.getItem("theme");
    return temp === "light" || temp === "dark" ? temp : "light";
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
      default: "#F9F9F9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#333333",
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
      default: "#121212",
      paper: "#000000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#CCCCCC",
    },
  };

  const MyTheme = createTheme({
    palette: {
      ...(currentTheme === "light" ? lightPalette : darkPalette),
    },
    components: {},
  });

  const handleThemeChange = () => {
    if (themeCoolDown.current) return;
    themeCoolDown.current = true;
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
    setTimeout(() => {
      themeCoolDown.current = false;
    }, cooldown);
  };

  return { handleThemeChange, MyTheme };
}
