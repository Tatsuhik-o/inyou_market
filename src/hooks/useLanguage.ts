import { useEffect, useRef, useState } from "react";

export default function useLanguage(cooldown: number = 500) {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "ja">(() => {
    const temp = localStorage.getItem("lang");
    return temp == "en" ? "en" : "ja";
  });
  const languageCooldown = useRef<boolean>(false);

  const handleLanguageChange = () => {
    if (languageCooldown.current) return;
    languageCooldown.current = true;
    setCurrentLanguage(currentLanguage === "en" ? "ja" : "en");
    setTimeout(() => {
      languageCooldown.current = false;
    }, cooldown);
  };

  useEffect(() => {
    localStorage.setItem("lang", currentLanguage);
  }, [currentLanguage]);

  return { currentLanguage, handleLanguageChange };
}
