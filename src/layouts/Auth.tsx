import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  styled,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import en from "../locales/en/signup.json";
import ja from "../locales/ja/signup.json";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext } from "react";
import { MyContext } from "../utils/context";
import useToken from "../hooks/useToken";

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

export default function Auth() {
  const {
    currentLanguage,
    currentTheme,
    handleThemeChange,
    handleLanguageChange,
  } = useContext(MyContext);
  const content = translations[currentLanguage];
  const { isAuthorized, loading } = useToken();
  const navigator = useNavigate();

  if (loading) {
    return (
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CircularProgress />;
      </Box>
    );
  }

  if (isAuthorized) {
    navigator("/");
  }

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
      <Outlet />
    </StyledContainer>
  );
}
