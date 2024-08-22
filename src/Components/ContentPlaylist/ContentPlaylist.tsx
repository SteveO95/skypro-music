import classNames from 'classnames';
import { Key, useEffect, useState } from 'react';
import { getTracks } from '../../api/tracks/tracks';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	setCurrentTrack,
	setTrackArray,
} from '../../store/features/playlistSlice';
import { getTrackResponse, trackType } from '../../types';
import PlayListItem from '../PlaylistItem/PlayListItem';
import styles from './ContentPlaylist.module.css';

type contentPlaylistProps = {
	setCurrentTrack: (item: trackType) => void;
	currentTrack: trackType | null;
	isPlaying: boolean | any;
	setIsPlaying: (isPlaying: boolean | any) => void;
};

export default function ContentPlaylist({
	// setCurrentTrack,
	currentTrack,
	isPlaying,
	setIsPlaying,
}: contentPlaylistProps) {
	const dispatch = useAppDispatch();
	const tracksArray = useAppSelector(state => state.playlist.trackArray);

	const [tracks, setTracks] = useState<getTrackResponse>({
		error: null,
		data: null,
	});

	const setTrackAccept = (trackType: trackType) => {
		trackType;
		dispatch(setCurrentTrack(trackType));
	};

	useEffect(() => {
		async function fetchTracks() {
			try {
				const response = await getTracks();
				setTracks({ error: null, data: response.data });
				dispatch(setTrackArray(response.data));
			} catch (error) {
				// Проверка, является ли ошибка объектом с полем message
				const errorMessage =
					error instanceof Error ? error.message : 'An unknown error occurred';
				setTracks({ error: errorMessage, data: null });
			}
		}
		fetchTracks();
	}, []);

	// Этот useEffect отслеживает изменение currentTrack и запускает трек, если он изменился.
	useEffect(() => {
		if (currentTrack) {
			setIsPlaying(true);
		}
	}, [currentTrack]);
	return (
		<div className={classNames(styles.contentPlaylist, styles.playlist)}>
			{tracks.error && <p>Error: {tracks.error}</p>}
			{tracksArray?.map((item: trackType, index: Key | null | undefined) => (
				<PlayListItem
					onClick={() => {
						setTrackAccept(item);
					}}
					item={item}
					key={index}
				/>
			))}
		</div>
	);
}
