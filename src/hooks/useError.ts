import { useEffect, useState } from "react";

export default function useError(cooldown: number = 1000) {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let timer = setTimeout(() => {
      setError("");
    }, cooldown);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return { error, setError };
}
