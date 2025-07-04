import { Box, styled, type SxProps, type Theme } from "@mui/material";

interface IHybridBox {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function HybridBox({ children, sx }: IHybridBox) {
  return <StyledBox sx={sx}>{children}</StyledBox>;
}
