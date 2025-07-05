import { useState } from "react";
import { LoginSchema } from "../utils/schemas";
import type { TLogin } from "../utils/types";

type LoginState =
  | "loading"
  | "success"
  | "invalidInput"
  | "serverError"
  | string;

export default function useLogin() {
  const [loginState, setLoginState] = useState<LoginState>("");

  const login = async ({ email, password }: TLogin) => {
    setLoginState("loading");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const verifySchema = LoginSchema.safeParse({ email, password });
    if (!verifySchema.success) {
      setLoginState("invalidInput");
      clearTimeout(timeoutId);
      return;
    }

    try {
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        options
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        setLoginState(response.status.toString());
        return;
      }

      setLoginState("success");
      return;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === "AbortError") {
        setLoginState("serverError");
        return;
      }
      setLoginState("serverError");
      return;
    }
  };

  return { loginState, login };
}
