"use client";
import Image from "next/image";
import styles from "./page.module.css";

import { getTokensState, getUser } from "@/store/features/userSlice";
import { useAppDispatch } from "@/hooks";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

function SignInPage() {
  const dispatch = useAppDispatch();
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignin = async (
    userData: {
      email: string;
      password: string;
    },
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setLoginError("Пожалуйста, заполните все поля");
      return;
    }
    try {
      await dispatch(getUser(userData)).unwrap();
      await dispatch(getTokensState(userData)).unwrap();

      router.push("/");
    } catch (error: any) {
      console.error("Ошибка:", error.message);
      setLoginError(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form action="#" className={styles.modalFormLogin}>
            <Link href="/">
              <div className={styles.modalLogo}>
                <Image
                  alt="logo"
                  src="/img/logo_modal.png"
                  width={140}
                  height={21}
                />
              </div>
            </Link>
            <input
              onChange={handleInputChange}
              className={styles.modalInput}
              name="email"
              value={formData.email}
              placeholder="Почта"
              type="text"
            />
            <input
              onChange={handleInputChange}
              className={styles.modalInput}
              name="password"
              value={formData.password}
              placeholder="Пароль"
              type="password"
            />
            {loginError && <div className={styles.error}>{loginError}</div>}
            <button
              className={styles.modalBtnEnter}
              onClick={(e) =>
                handleSignin(
                  {
                    email: formData.email,
                    password: formData.password,
                  },
                  e
                )
              }
            >
              Войти
            </button>
            <Link className={styles.modalBtnSignup} href="/signup">
              Зарегистрироваться
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignInPage;
