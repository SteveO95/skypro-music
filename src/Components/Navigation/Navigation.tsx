"use client";
import Burger from "@/components/Burger/Burger";
import Menu from "@/components/Menu/Menu";
import Image from "next/image";
import styles from "./Navigation.module.css";
import { useState } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/hooks";
import { resetFilters } from "@/store/features/filtersSlice";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const dispatch = useAppDispatch()

  const handleResetFilters = () => {
    dispatch(resetFilters()); // Сброс фильтров при переходе на главную
  };

  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Link href="/" onClick={handleResetFilters}>
          <Image
            className={styles.logoImage}
            src="/img/logo.png"
            alt="Logo"
            width={114}
            height={17}
          />
        </Link>
      </div>
      <Burger isOpen={isOpen} toggleMenu={toggleMenu} />
      {isOpen && <Menu />}
    </nav>
  );
};

export default Navigation;
