'use client';
import Image from 'next/image';
import { useState } from 'react';
import Burger from '../../components/Burger/Burger';
import Menu from '../../components/Menu/Menu';
import styles from './Navigation.module.css';

const Navigation = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toggleMenu = () => setIsOpen(prev => !prev);

	return (
		<nav className={styles.mainNav}>
			<div className={styles.navLogo}>
				<Image
					className={styles.logoImage}
					src='/img/logo.png'
					alt='Logo'
					width={114}
					height={17}
				/>
			</div>
			<Burger isOpen={isOpen} toggleMenu={toggleMenu} />
			{isOpen && <Menu />}
		</nav>
	);
};

export default Navigation;
