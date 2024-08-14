'use client';

import { useState } from 'react';
import { trackType } from '../../types';
import Bar from '../Bar/Bar';
import CenterBlock from '../CenterBlock/CenterBlock';
import styles from '../Main/Main.module.css';
import MainSlideBar from '../MainSlideBar/MainSlideBar';
import Nav from '../Nav/Nav';

export default function Main() {
	const [currentTrack, setCurrentTrack] = useState<trackType | null>();
	return (
		<>
			<main className={styles.main}>
				<Nav />
				<CenterBlock setCurrentTrack={setCurrentTrack} />
				<MainSlideBar />
			</main>

			{currentTrack ? <Bar currentTrack={currentTrack} /> : ''}
			<footer> </footer>
		</>
	);
}
