'use client';
import { useEffect, useState } from 'react';
import { getPlaylist } from '../../api/playlist';
import CenterBlock from '../../components/CenterBlock/CenterBlock';
import { useAppDispatch } from '../../hooks';
import { setInitialTracks } from '../../store/features/playlistSlice';
import styles from './Main.module.css';

const Main = () => {
	const [tracks, setTracks] = useState([]);
	const [error, setError] = useState('');

	const dispatch = useAppDispatch();

	useEffect(() => {
		getPlaylist()
			.then(data => {
				setTracks(data);
				dispatch(setInitialTracks(data));
			})
			.catch(error => {
				setError(error.message);
			});
	}, [dispatch]);

	return (
		<main className={styles.main}>
			<CenterBlock tracks={tracks} error={error} />
		</main>
	);
};

export default Main;
