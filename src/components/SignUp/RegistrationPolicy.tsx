import HybridBox from "../HybridBox";
import { styled } from "@mui/material";
import en from "../../locales/en/signup.json";
import ja from "../../locales/ja/signup.json";
import { useContext } from "react";
import { MyContext } from "../../utils/context";

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

const translations = { en, ja };

export default function RegistrationPolicy() {
  const { currentLanguage } = useContext(MyContext);
  const content = translations[currentLanguage];
  return (
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
  );
}
