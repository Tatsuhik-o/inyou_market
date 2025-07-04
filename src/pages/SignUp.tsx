import { Box, Button, Container, styled, TextField } from "@mui/material";
import HybridBox from "../components/HybridBox";
import { useContext, useReducer, useState } from "react";
import { MyContext } from "../utils/context";
import en from "../locales/en/signup.json";
import ja from "../locales/ja/signup.json";
import { SignUpSchema } from "../utils/schemas";
import { errorMessages } from "../utils/constants";
import type { TSignUp } from "../utils/types";
import useError from "../hooks/useError";
import { motion, AnimatePresence } from "motion/react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

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

const StyledUL = styled("ul")(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  padding: "1rem 2rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  "& li": {
    fontFamily: "Source Code Pro",
    fontSize: "0.85rem",
    fontStyle: "italic",
  },
}));

const StyledForm = styled("form", {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  width: "100%",
  maxWidth: "500px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  width: "100%",
  fontFamily: "Source Code Pro",
});

const AnimatedErrorBox = styled(motion.create(Box))(({ theme }) => ({
  padding: "0.5rem",
  color: theme.palette.error.main,
  fontSize: "0.9rem",
  fontWeight: 500,
  textAlign: "center",
}));

const translations: Record<string, any> = { en, ja };

const initialState: TSignUp = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

type TAction = {
  type: keyof TSignUp;
  payload: string;
};

const reducer = (state: TSignUp, action: TAction) => {
  if (action.type in state) {
    return { ...state, [action.type]: action.payload };
  }
  return state;
};

export default function SignUp() {
  const {
    currentLanguage,
    handleLanguageChange,
    currentTheme,
    handleThemeChange,
  } = useContext(MyContext);
  const content = translations[currentLanguage];
  const [formElements, setFormElements] = useReducer(reducer, initialState);
  const { error, setError } = useError(2000);
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formElements.password !== formElements.repeatPassword) {
      setError(errorMessages[currentLanguage]["confirm"]);
      return;
    }
    const parseResult = SignUpSchema.safeParse(formElements);
    type ErrorMessageKey = keyof (typeof errorMessages)["en"];
    const errorMessageKey =
      parseResult.success === false && parseResult.error.errors[0]?.message
        ? (parseResult.error.errors[0].message as ErrorMessageKey)
        : "";
    if (errorMessageKey) {
      setError(errorMessages[currentLanguage][errorMessageKey]);
      return;
    }
    try {
      setLoading(true);
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formElements),
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/signup`,
        options
      );
      if (response.status == 409) {
        setError(errorMessages[currentLanguage]["emailMismatch"]);
        return;
      }
      if (!response.ok) {
        setError(errorMessages[currentLanguage]["general"]);
        return;
      }
      navigator("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
      <HybridBox
        sx={{
          borderRadius: "12px",
          height: "fit-content",
        }}
      >
        <StyledUL>
          {content.precautions.map((elem: string) => {
            return <li key={elem}>{elem}</li>;
          })}
        </StyledUL>
      </HybridBox>
      <HybridBox
        sx={{
          borderRadius: "12px",
          height: "fit-content",
          width: { sm: "500px", xs: "100%" },
          padding: "15px",
          marginBottom: "5rem",
        }}
      >
        <StyledForm onSubmit={handleSubmitForm}>
          <StyledTextField
            size="small"
            type="text"
            label={content.firstName}
            value={formElements.firstName}
            onChange={(e) =>
              setFormElements({ type: "firstName", payload: e.target.value })
            }
          />
          <StyledTextField
            size="small"
            type="text"
            label={content.lastName}
            value={formElements.lastName}
            onChange={(e) =>
              setFormElements({ type: "lastName", payload: e.target.value })
            }
          />
          <StyledTextField
            size="small"
            type="text"
            label={content.email}
            value={formElements.email}
            onChange={(e) =>
              setFormElements({ type: "email", payload: e.target.value })
            }
          />
          <StyledTextField
            size="small"
            type="password"
            label={content.password}
            value={formElements.password}
            onChange={(e) =>
              setFormElements({ type: "password", payload: e.target.value })
            }
          />
          <StyledTextField
            size="small"
            type="password"
            label={content.repeatPassword}
            value={formElements.repeatPassword}
            onChange={(e) =>
              setFormElements({
                type: "repeatPassword",
                payload: e.target.value,
              })
            }
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: loading ? "center" : "space-between",
              padding: "0px 10px",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Button variant="contained" color="primary">
                  {content.back}
                </Button>
                <Button variant="contained" color="secondary" type="submit">
                  {content.create}
                </Button>
              </>
            )}
          </Box>
        </StyledForm>
        <Box sx={{ minHeight: "40px" }}>
          <AnimatePresence mode="wait">
            {error && (
              <AnimatedErrorBox
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {error}
              </AnimatedErrorBox>
            )}
          </AnimatePresence>
        </Box>
      </HybridBox>
    </StyledContainer>
  );
}
