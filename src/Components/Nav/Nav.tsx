'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { routes } from '@/lib/routes';
import { resetFilterOptions } from '@/store/features/playlistSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Nav.module.css';
// да да , нет нет

export default function Nav() {
	const dispatch = useAppDispatch();
	const { visible, setVisible, ref } = useOutsideClick(false);
	const { user } = useAppSelector(state => state.user);
	const handleOpenMenu = () => setVisible(prev => !prev);

	return (
		<nav className={styles.main__nav}>
			<div className={styles.nav__logo}>
				<Link href={routes.HOME}>
					<Image
						className={styles.logo__image}
						src='/img/logo.png'
						alt='logo'
						width={113}
						height={17}
					/>
				</Link>
			</div>

			<div
				data-testid='burgerBtn'
				className={styles.nav__burger}
				ref={ref}
				onClick={handleOpenMenu}
			>
				<span className={styles.burger__line} />
				<span className={styles.burger__line} />
				<span className={styles.burger__line} />
			</div>

			{visible && (
				<div className={styles.nav__menu}>
					<ul className={styles.menu__list}>
						<li className={styles.menu__item}>
							<Link className={styles.menu__link} href={routes.HOME}>
								Главное
							</Link>
						</li>
						{user && (
							<li
								className={styles.menu__item}
								onClick={() => dispatch(resetFilterOptions())}
							>
								<Link className={styles.menu__link} href={routes.FAVORITE}>
									Мой плейлист
								</Link>
							</li>
						)}
						<li className={styles.menu__item}>
							<Link className={styles.menu__link} href={routes.LOGIN}>
								Войти
							</Link>
						</li>
					</ul>
				</div>
			)}
		</nav>
	);
}
