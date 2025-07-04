import { useState, useReducer, useContext } from "react";
import { MyContext } from "../../utils/context";
import en from "../../locales/en/signup.json";
import ja from "../../locales/ja/signup.json";
import HybridBox from "../../components/HybridBox";
import { styled, TextField, Box, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import useError from "../../hooks/useError";
import { errorMessages } from "../../utils/constants";
import { SignUpSchema } from "../../utils/schemas";
import type { TSignUp } from "../../utils/types";
import { useNavigate } from "react-router-dom";

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

const translations = { en, ja };

const initialState: TSignUp = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

type TAction = {
  type: keyof TSignUp | "reset";
  payload: string;
};

const reducer = (state: TSignUp, action: TAction) => {
  if (action.type in state) {
    return { ...state, [action.type]: action.payload };
  }
  if (action.type === "reset") {
    return initialState;
  }
  return state;
};

export default function RegistrationForm() {
  const { currentLanguage } = useContext(MyContext);
  const content = translations[currentLanguage];
  const [formElements, setFormElements] = useReducer(reducer, initialState);
  const { error, setError } = useError(2000);
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
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
    if (formElements.password !== formElements.repeatPassword) {
      setError(errorMessages[currentLanguage]["confirm"]);
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
      setError(
        currentLanguage === "en"
          ? "Account created successfully ..."
          : "アカウントが正常に作成されました..."
      );
      setFormElements({ type: "reset", payload: "" });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigator("/login")}
              >
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
  );
}
