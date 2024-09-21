'use client';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Toast, { handleError } from '../../components/Toast/Toast';
import Wrapper from '../../components/Wrapper/Wrapper';
import useUserAuth from '../../hooks/useUserAuth';
import Routes from '../Routes';
import styles from './page.module.css';

export default function Signin() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setLogin } = useUserAuth();

	const signin = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const result = await setLogin({ email, password });

		if (typeof result === 'string') return handleError(result);

		router.push(Routes.BASE);
	};

	return (
		<Wrapper>
			<div className={styles.Wrapper}>
				<div className={styles.ContainerEnter}>
					<div className={styles.ModalBlock}>
						<form className={styles.ModalFormLogin}>
							<div className={styles.ModalLogo}>
								<Link href={Routes.BASE}>
									<Image
										src='/img/logo_modal.png'
										alt='Skyrpo logo'
										width={140}
										height={21}
									/>
								</Link>
							</div>
							<input
								className={classNames(styles.ModalInput, styles.Login)}
								type='text'
								name='email'
								placeholder='Почта'
								autoComplete='username'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
							<input
								className={classNames(styles.ModalInput, styles.Password)}
								type='password'
								name='password'
								placeholder='Пароль'
								autoComplete='current-password'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<button className={styles.ModalBtnEnter} onClick={signin}>
								<a>Войти</a>
							</button>
							<button className={styles.ModalBtnSignup}>
								<Link href={Routes.SIGNUP}>Зарегистрироваться</Link>
							</button>
						</form>
					</div>
				</div>
			</div>
			<Toast />
		</Wrapper>
	);
}
