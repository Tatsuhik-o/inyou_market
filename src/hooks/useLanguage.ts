import { useRef, useState } from "react";

export default function useLanguage(cooldown: number = 500) {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "ja">(() => {
    const temp = localStorage.getItem("lang");
    return temp === "en" ? "ja" : "en";
  });
  const languageCooldown = useRef<boolean>(false);

  const handleLanguageChange = () => {
    if (languageCooldown.current) return;
    languageCooldown.current = true;
    setCurrentLanguage(currentLanguage === "en" ? "ja" : "en");
    setTimeout(() => {
      languageCooldown.current = false;
    }),
      cooldown;
  };
  return { currentLanguage, handleLanguageChange };
}
