import { AuthType } from "@/types/auth";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

const getAuthCookie = (): AuthType | undefined => {
  const id = getCookie("id");
  const username = getCookie("username");
  const email = getCookie("email");
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  if (id && username && email && accessToken && refreshToken) {
    return { id, username, email, accessToken, refreshToken };
  }
  return undefined;
};

const setAuthCookie = (auth: AuthType, options?: OptionsType): void => {
  setCookie("id", auth.id, options);
  setCookie("username", auth.username, options);
  setCookie("email", auth.email, options);
  setCookie("accessToken", auth.accessToken, options);
  setCookie("refreshToken", auth.refreshToken, options);
};

const deleteAuthCookie = (): void => {
  deleteCookie("id");
  deleteCookie("username");
  deleteCookie("email");
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
};

export { getAuthCookie, setAuthCookie, deleteAuthCookie };
