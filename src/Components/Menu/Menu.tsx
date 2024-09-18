import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <div className={styles.navMenu}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="#">
            Главное
          </a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="#">
            Мой плейлист
          </a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="../signin.html">
            Войти
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
