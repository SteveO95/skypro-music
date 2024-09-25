"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import classNames from "classnames";
import { useState } from "react";
import Routes from "@/app/Routes";
import { useRouter } from "next/navigation";
import useUserAuth from "@/hooks/useUserAuth";

import { getInitialPlaylist, setInitialPlaylist } from "@/store/features/trackSlice";
import Link from "next/link";

const Nav = () => {
  const router = useRouter();
  const { isAuth, setLogout } = useUserAuth();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleUserAuth = async () => {
    if (isAuth) setLogout();
    else router.push(Routes.SIGNIN);
  };

  const menuListClass = classNames({
    [styles.menuList]: true,
    [styles.visible]: isVisible,
  });

  return (
    <nav className={styles.nav}>
      <div className={classNames(styles.navLogo, "logo")}>
        <Image
          className={styles.logoImage}
          alt="Skypro logo"
          src="/img/logo.png"
          width={114}
          height={17}
        />
      </div>

      <div
        className={classNames(styles.navBurger, "burger")}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>

      <div className={styles.menu}>
        <ul className={menuListClass}>
          <li className={styles.menuItem}>
            <Link className={styles.menuLink} href={Routes.BASE}>
              Главное
            </Link>
          </li>
          {isAuth && (
            <li className={styles.menuItem}>
              <Link href={Routes.FAVORITES} className={styles.menuLink}>
                Мой плейлист
              </Link>
            </li>
          )}
          <li className={styles.menuItem}>
            <a onClick={handleUserAuth}>{isAuth ? "Выйти" : "Войти"}</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
