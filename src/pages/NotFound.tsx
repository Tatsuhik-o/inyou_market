import { Container } from "@mui/material";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mobileView, setMobileView] = useState<boolean>(
    window.innerWidth < 600
  );

  useEffect(() => {
    const onResize = () => {
      setMobileView(window.innerWidth < 600);
    };
    document.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={mobileView ? "/404_mobile.webp" : "/404_desktop.webp"}
        alt="Page Not Found"
        style={{ height: "100%" }}
      />
    </Container>
  );
}
