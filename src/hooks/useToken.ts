import { useEffect, useState } from "react";

export default function useToken() {
  const [isAuthorized, setIsAuthorized] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
          signal: controller.signal,
          credentials: "include",
        });
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        setIsAuthorized(data.user as string);
      } catch (err) {
        console.log(err);
        return;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { isAuthorized, loading };
}
