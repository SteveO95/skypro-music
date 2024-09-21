'use client';

import Image from 'next/image';
import Routes from '../../app/Routes';
import { useAppSelector } from '../../store/store';
import styles from './Sidebar.module.css';
// import { setUserLogout } from "@/store/features/authSlice";
import { useRouter } from 'next/navigation';
import useUserAuth from '../../hooks/useUserAuth';

const Sidebar = () => {
	const router = useRouter();

	const { isAuth, setLogout } = useUserAuth();
	const username = useAppSelector(state => state.auth.username);

	const handleUserAuth = async () => {
		if (isAuth) setLogout();
		else router.push(Routes.SIGNIN);
	};

	return (
		<div className={styles.mainSidebar}>
			<div className={styles.sidebarPersonal}>
				<p className={styles.sidebarPersonalName}>{username}</p>
				<div className={styles.sidebarIcon} onClick={handleUserAuth}>
					<svg>
						<use xlinkHref='/img/icon/sprite.svg#icon-logout' />
					</svg>
				</div>
			</div>
			<div className={styles.sidebarBlock}>
				<div className={styles.sidebarList}>
					<div className={styles.sidebarItem}>
						<a className={styles.sidebarLink} href='#'>
							<Image
								alt="day's playlist"
								className={styles.sidebarImg}
								src='/img/playlist01.png'
								width={250}
								height={150}
							/>
						</a>
					</div>
					<div className={styles.sidebarItem}>
						<a className={styles.sidebarLink} href='#'>
							<Image
								alt="day's playlist"
								className={styles.sidebarImg}
								src='/img/playlist02.png'
								width={250}
								height={150}
							/>
						</a>
					</div>
					<div className={styles.sidebarItem}>
						<a className={styles.sidebarLink} href='#'>
							<Image
								alt="day's playlist"
								className={styles.sidebarImg}
								src='/img/playlist03.png'
								width={250}
								height={150}
							/>
						</a>
					</div>
					<div className={styles.sidebarItem}>
						<a className={styles.sidebarLink} href='#'>
							<Image
								alt="day's playlist"
								className={styles.sidebarImg}
								src='/img/playlist03.png'
								width={250}
								height={150}
							/>
						</a>
					</div>
					<div className={styles.sidebarItem}>
						<a className={styles.sidebarLink} href='#'>
							<Image
								alt="day's playlist"
								className={styles.sidebarImg}
								src='/img/playlist03.png'
								width={250}
								height={150}
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
