import { getAuthCookie } from "@/services/cookie";
import { setAuth, setUserAuth, setUserLogout } from "@/store/features/authSlice";
import { getFavoriteTrack, setLikedPlaylist } from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

type Props = {};

const useUserAuth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const setLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<true | string> => {
    try {
      await dispatch(setUserAuth({ email, password })).unwrap();
      return true;
    } catch (error) {
      if (typeof error === "string") return error;

      if (error instanceof Error) return error.message;

      return "Произошла непредвиденная ошибка";
    }
  };

  const setLogout = () => {
    dispatch(setUserLogout());
    dispatch(setLikedPlaylist([]));
  };

  const checkLogin = async () => {
    const authCookies = getAuthCookie();

    if (!authCookies?.accessToken || !authCookies?.refreshToken) {
      setLogout();
      return false;
    }

    try {
      await dispatch(
        getFavoriteTrack({
          accessToken: authCookies.accessToken,
          refreshToken: authCookies.refreshToken,
        })
      ).unwrap();
      await dispatch(setAuth(authCookies));
      return true;
    } catch (error) {
      setLogout();
      return false;
    }
  };

  return { isAuth, setLogin, setLogout, checkLogin };
};

export default useUserAuth;
