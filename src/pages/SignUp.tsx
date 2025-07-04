import { Box, Button, Container, styled } from "@mui/material";
import { useContext } from "react";
import { MyContext } from "../utils/context";
import en from "../locales/en/signup.json";
import ja from "../locales/ja/signup.json";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import RegistrationPolicy from "../components/SignUp/RegistrationPolicy";
import RegistrationForm from "../features/SignUp/RegistrationForm";

const StyledContainer = styled(Container)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  gap: "20px",
});

const translations: Record<string, any> = { en, ja };

export default function SignUp() {
  const {
    currentLanguage,
    handleLanguageChange,
    currentTheme,
    handleThemeChange,
  } = useContext(MyContext);
  const content = translations[currentLanguage];

  return (
    <StyledContainer>
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Box
          onClick={handleThemeChange}
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentTheme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </Box>
        <Button variant="contained" onClick={handleLanguageChange}>
          {content.changeLanguage}
        </Button>
      </Box>
      <RegistrationPolicy />
      <RegistrationForm />
    </StyledContainer>
  );
}
