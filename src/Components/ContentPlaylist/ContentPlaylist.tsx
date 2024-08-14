import classNames from 'classnames';
import { Key, useEffect, useState } from 'react';
import { getTracks } from '../../api/tracks/tracks';
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
	setCurrentTrack,
	currentTrack,
	isPlaying,
	setIsPlaying,
}: contentPlaylistProps) {
	const [tracks, setTracks] = useState<getTrackResponse>({
		error: null,
		data: undefined,
	});

	useEffect(() => {
		async function fetchTracks() {
			try {
				const response = await getTracks();
				setTracks({ error: null, data: response.data });
			} catch (error) {
				// Проверка, является ли ошибка объектом с полем message
				const errorMessage =
					error instanceof Error ? error.message : 'An unknown error occurred';
				setTracks({ error: errorMessage, data: undefined });
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
			{tracks.data?.map(
				(
					item: {
						id: number;
						name: string;
						author: string;
						release_date: string;
						genre: string;
						duration_in_seconds: number;
						album: string;
						logo: string | null;
						track_file: string;
						stared_user: {
							id: number;
							username: string;
							first_name: string;
							last_name: string;
							email: string;
						}[];
					},
					index: Key | null | undefined
				) => (
					<PlayListItem
						onClick={() => {
							setCurrentTrack(item);
						}}
						key={index}
						item={item}
					/>
				)
			)}
		</div>
	);
}
