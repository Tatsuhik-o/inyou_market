import { Box, Button, styled } from "@mui/material";
import { useContext } from "react";
import { MyContext } from "../utils/context";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: "300px",
  aspectRatio: "1",
  border: `1px solid ${theme.palette.divider}`,
}));

export default function Dashboard() {
  const { handleThemeChange } = useContext(MyContext);
  return (
    <div>
      <Button variant="contained" onClick={handleThemeChange} color="primary">
        Change Theme
      </Button>
      <StyledBox></StyledBox>
    </div>
  );
}
