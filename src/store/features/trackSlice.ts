'use client';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavoriteTracks, getAllTracks } from '../../services/api';
import { TrackType } from '../../types/tracks';

type TrackStateType = {
	initialPlaylistState?: TrackType[];
	currentPlaylistState?: TrackType[];
	likedPlaylistState: TrackType[];
	currentTrackState: TrackType | undefined;
	currentPlaylistTypeState: 'All' | 'Favorites' | 'Сollection';
	isPlayingState: boolean;
	isShuffleState: boolean;
};

const initialState: TrackStateType = {
	initialPlaylistState: undefined,
	currentPlaylistState: undefined,
	likedPlaylistState: [],
	currentTrackState: undefined,
	currentPlaylistTypeState: 'All',
	isPlayingState: false,
	isShuffleState: false,
};

export const getInitialPlaylist = createAsyncThunk(
	'playlist/getInitialPlaylist',
	async (_, { dispatch }) => {
		try {
			const data = await getAllTracks();
			const tracks = data.map((track: { _id: string; [key: string]: any }) => {
				const { _id, ...rest } = track;
				return { id: _id, ...rest };
			});
			dispatch(setInitialPlaylist(tracks));
		} catch (err) {
			dispatch(setInitialPlaylist([]));
		}
	}
);

export const getFavoriteTrack = createAsyncThunk(
	'playlist/getFavoriteTracks',
	async (
		{
			accessToken,
			refreshToken,
		}: { accessToken: string; refreshToken: string },
		{ rejectWithValue }
	) => {
		try {
			const data = await fetchFavoriteTracks({ accessToken, refreshToken });

			const tracks = data.data.map(
				(track: { _id: string; [key: string]: any }) => {
					const { _id, ...rest } = track;
					return { id: _id, ...rest };
				}
			);
			return tracks;
		} catch (err) {
			return rejectWithValue('Произошла ошибка при получении любимых треков');
		}
	}
);

const trackSlice = createSlice({
	name: 'track',
	initialState,
	reducers: {
		setPlaylistType: (
			state,
			action: PayloadAction<'All' | 'Favorites' | 'Сollection'>
		) => {
			state.currentPlaylistTypeState = action.payload;
		},
		setTrack: (state, action: PayloadAction<TrackType | undefined>) => {
			state.currentTrackState = action.payload;
		},
		setInitialPlaylist: (state, action: PayloadAction<TrackType[]>) => {
			state.currentPlaylistState = action.payload;
			state.initialPlaylistState = action.payload;
		},
		setPreviousTrack: state => {
			if (state.currentPlaylistState === undefined) return;

			const currentTrackIndex = state.currentPlaylistState.findIndex(
				track => track.id === state.currentTrackState?.id
			);
			if (currentTrackIndex === -1 || currentTrackIndex <= 0) return;
			state.currentTrackState =
				state.currentPlaylistState[currentTrackIndex - 1];
			state.isPlayingState = true;
		},
		setNextTrack: state => {
			if (state.currentPlaylistState === undefined) return;

			const currentTrackIndex = state.currentPlaylistState.findIndex(
				track => track.id === state.currentTrackState?.id
			);

			if (
				currentTrackIndex === -1 ||
				currentTrackIndex + 1 >= state.currentPlaylistState.length
			)
				return;

			state.currentTrackState =
				state.currentPlaylistState[currentTrackIndex + 1];
			state.isPlayingState = true;
		},
		setPlaying: (state, action: PayloadAction<boolean>) => {
			state.isPlayingState = action.payload;
		},
		setShufflePlaylist: (state, action: PayloadAction<boolean>) => {
			if (state.initialPlaylistState === undefined) return;

			state.currentPlaylistState = !action.payload
				? state.initialPlaylistState
				: state.initialPlaylistState.toSorted((a, b) => Math.random() - 0.5);

			state.isShuffleState = action.payload;
		},
		setDislikeTrack: (state, action: PayloadAction<number>) => {
			const trackID = action.payload;
			state.likedPlaylistState = state.likedPlaylistState.filter(
				track => track.id !== trackID
			);

			if (state.currentPlaylistTypeState === 'Favorites') {
				if (state.currentPlaylistState !== undefined) {
					state.currentPlaylistState = state.currentPlaylistState.filter(
						track => track.id !== trackID
					);
				}
				if (state.initialPlaylistState !== undefined) {
					state.initialPlaylistState = state.initialPlaylistState.filter(
						track => track.id !== trackID
					);
				}
			}
		},
		setLikeTrack: (state, action: PayloadAction<number>) => {
			if (state.currentPlaylistState === undefined) return;
			const trackID = action.payload;
			const track = state.currentPlaylistState.find(
				track => track.id === trackID
			);
			if (!track) return;
			state.likedPlaylistState.push(track);
		},
		setLikedPlaylist: (state, action: PayloadAction<TrackType[]>) => {
			state.likedPlaylistState = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(getFavoriteTrack.fulfilled, (state, action) => {
			state.likedPlaylistState = action.payload;
		});
		builder.addCase(getFavoriteTrack.rejected, (state, action) => {
			console.log('Произошла ошибка при получении любимых треков');
		});
	},
});

export const {
	setPlaylistType,
	setTrack,
	setNextTrack,
	setPreviousTrack,
	setPlaying,
	setInitialPlaylist,
	setShufflePlaylist,
	setDislikeTrack,
	setLikeTrack,
	setLikedPlaylist,
} = trackSlice.actions;
export const trackReducer = trackSlice.reducer;
