'use client';

import { useAppDispatch, useAppSelector } from '../../hooks';

import BarVolumeBlock from '@components/BarVolumeBlock/BarVolumeBlock';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { formatTime } from './../../lib/formatTime';
import styles from './Bar.module.css';

export default function Bar() {
	const { currentTrack, isPlaying } = useAppSelector(
		(state: { playlist: any }) => state.playlist
	);
	const dispatch = useAppDispatch();
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (audioRef.current && currentTrack) {
			audioRef.current.src = currentTrack.track_file;
			isPlaying ? audioRef.current.play() : audioRef.current.pause();
		}
	}, [currentTrack, isPlaying]);

	const togglePlay = () => {
		// dispatch(setIsPlaying(!isPlaying));
	};

	const changeProgressBar = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (audioRef.current) {
			audioRef.current.currentTime = Number(e.target.value);
		}
	};

	const handleLoop = () => {
		if (audioRef.current) {
			audioRef.current.loop = !audioRef.current.loop;
		}
	};

	return (
		<div className={styles.bar}>
			<audio ref={audioRef} />
			<div className={styles.barContent}>
				<div>
					{currentTrack
						? `${formatTime(audioRef.current?.currentTime || 0)}/${formatTime(
								audioRef.current?.duration || 0
						  )}`
						: 'No track'}
				</div>
				<ProgressBar
					max={audioRef.current?.duration || 0}
					value={audioRef.current?.currentTime || 0}
					step={0.01}
					onChange={changeProgressBar}
				/>
				<div className={styles.barPlayerBlock}>
					<div className={classNames(styles.barPlayer, styles.player)}>
						<div className={styles.playerControls}>
							<div className={styles.playerBtnPrev}>
								<svg
									onClick={() => alert('Еще не реализовано!')}
									className={styles.playerBtnPrevSvg}
								>
									<use href='/img/icon/sprite.svg#icon-prev'></use>
								</svg>
							</div>
							<div
								onClick={togglePlay}
								className={classNames(styles.playerBtnPlay, styles._btn)}
							>
								<svg className={styles.playerBtnPlaySvg}>
									{!isPlaying ? (
										<use href='/img/icon/sprite.svg#icon-play'></use>
									) : (
										<use href='/img/icon/sprite.svg#icon-pause'></use>
									)}
								</svg>
							</div>
							<div className={styles.playerBtnNext}>
								<svg className={styles.playerBtnNextSvg}>
									<use
										onClick={() => alert('Еще не реализовано!')}
										href='/img/icon/sprite.svg#icon-next'
									></use>
								</svg>
							</div>
							<div
								onClick={handleLoop}
								className={classNames(styles.playerBtnRepeat, styles._btnIcon)}
							>
								{!audioRef.current?.loop ? (
									<svg className={styles.playerBtnRepeatSvg}>
										<use href='/img/icon/sprite.svg#icon-repeat'></use>
									</svg>
								) : (
									<svg className={styles.playerBtnRepeatSvgActive}>
										<use href='/img/icon/sprite.svg#icon-repeat'></use>
									</svg>
								)}
							</div>
							<div
								onClick={() => alert('Еще не реализовано!')}
								className={classNames(styles.playerbtnshuffle, styles._btnicon)}
							>
								<svg className={styles.playerBtnShuffleSvg}>
									<use href='/img/icon/sprite.svg#icon-shuffle'></use>
								</svg>
							</div>
						</div>
						<BarVolumeBlock audioRef={audioRef} />
					</div>
				</div>
			</div>
		</div>
	);
}
