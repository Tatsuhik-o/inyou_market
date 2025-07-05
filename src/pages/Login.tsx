import {
  Box,
  Button,
  CircularProgress,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import HybridBox from "../components/HybridBox";
import en from "../locales/en/login.json";
import ja from "../locales/ja/login.json";
import { useContext, useState } from "react";
import { MyContext } from "../utils/context";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const CustomHybrid = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  padding: "1.5rem",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "350px",
  minHeight: "210px",
  justifyContent: "center",
};

const AnimatedErrorBox = styled(motion.create(Typography), {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  textAlign: "center",
});

const translations = { en, ja };

export default function Login() {
  const { currentLanguage } = useContext(MyContext);
  const content = translations[currentLanguage];
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigator = useNavigate();
  const { login, loginState } = useLogin();

  if (loginState === "success") {
    navigator("/");
  }

  return (
    <HybridBox sx={CustomHybrid}>
      {loginState === "loading" ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        <>
          <TextField
            size="small"
            label={content.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            size="small"
            label={content.password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigator("/signup")}
              sx={{ textTransform: "capitalize" }}
            >
              {content.signup}
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ textTransform: "capitalize" }}
              onClick={() => login({ email, password })}
            >
              {content.login}
            </Button>
          </Box>
          <AnimatePresence mode="wait">
            {loginState && (
              <AnimatedErrorBox
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                variant="body2"
                color="error"
              >
                {content[loginState as keyof typeof content]}
              </AnimatedErrorBox>
            )}
          </AnimatePresence>
        </>
      )}
    </HybridBox>
  );
}
