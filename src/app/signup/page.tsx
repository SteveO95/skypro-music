"use client";

import Image from "next/image";
import Wrapper from "@/components/Wrapper/Wrapper";
import Link from "next/link";
import Routes from "../Routes";
import styles from "./page.module.css";
import classNames from "classnames";
import { useState } from "react";
import { registration } from "@/services/api";
import Toast, { handleError, handleSuccess } from "@/components/Toast/Toast";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const signup = async () => {
    let clearUsername = username.trim();
    let clearEmail = email.trim();

    if (clearUsername.length < 3) {
      return handleError("Имя пользователя должно быть не менее 3 символов");
    }

    if (clearEmail.length < 3) {
      return handleError("Почта должна быть не менее 3 символов");
    }

    if (password.length < 6) {
      return handleError("Пароль должен быть не менее 6 символов");
    }

    if (password !== passwordRepeat) {
      return handleError("Пароли не совпадают");
    }

    try {
      const result = await registration({
        username: clearUsername,
        email: clearEmail,
        password: password,
      });

      if (result.success) {
        handleSuccess("Вы успешно зарегистрировались");
        router.push(Routes.SIGNIN);
      } else {
        throw new Error("Во время создания пользователя произошла ошибка!");
      }
    } catch (error) {
      if (error instanceof Error) {
        handleError(error.message);
      } else {
        handleError("Произошла непредвиденная ошибка");
      }
    }
  };

  return (
    <Wrapper>
      <div className={styles.Wrapper}>
        <div className={styles.ContainerSignup}>
          <div className={styles.ModalBlock}>
            <div className={styles.ModalFormLogin}>
              <div className={styles.ModalLogo}>
                <Link href={Routes.BASE}>
                  <Image src="/img/logo_modal.png" alt="logo" width={140} height={21} />
                </Link>
              </div>
              <input
                className={classNames(styles.ModalInput, styles.Login)}
                type="text"
                name="username"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className={classNames(styles.ModalInput, styles.Login)}
                type="text"
                name="email"
                placeholder="Почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={classNames(styles.ModalInput, styles.PasswordFirst)}
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className={classNames(styles.ModalInput, styles.PasswordDouble)}
                type="password"
                name="password"
                placeholder="Повторите пароль"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
              />
              <button className={styles.ModalBtnSignupEnt} onClick={signup}>
                <a>Зарегистрироваться</a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toast />
    </Wrapper>
  );
}
