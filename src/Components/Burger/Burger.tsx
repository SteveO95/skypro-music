"use client";
import { useState } from "react";
import styles from "./Burger.module.css";

interface BurgerProps {
  isOpen: boolean;
  toggleMenu: () => void;
}
const Burger = ({ isOpen, toggleMenu }: BurgerProps) => {
  return (
    <div onClick={toggleMenu} className={styles.navBurger}>
      <span className={styles.burgerLine} />
      <span className={styles.burgerLine} />
      <span className={styles.burgerLine} />
    </div>
  );
};

export default Burger;
