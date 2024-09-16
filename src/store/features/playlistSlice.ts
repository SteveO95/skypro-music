import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavoriteTracks } from '../../api/playlist';
import { PlaylistType } from '../../types/playlist';

export const getFavoriteTrack = createAsyncThunk(
	'playlist/getFavoriteTracks',
	async (tokens: { access: string; refresh: string }) => {
		const favoriteTracks = await fetchFavoriteTracks(tokens);
		return favoriteTracks;
	}
);

type PlaylistStateType = {
	currentTrack: null | PlaylistType;
	playlist: PlaylistType[];
	shuffledPlaylist: PlaylistType[];
	isShuffle: boolean;
	likedPlaylist: PlaylistType[];
};

const initialState: PlaylistStateType = {
	currentTrack: null,
	playlist: [],
	shuffledPlaylist: [],
	isShuffle: false,
	likedPlaylist: [],
};

const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	reducers: {
		setCurrentTrack: (
			state,
			action: PayloadAction<{ track: PlaylistType; tracks: PlaylistType[] }>
		) => {
			state.currentTrack = action.payload.track;
			state.playlist = action.payload.tracks;
			state.shuffledPlaylist = [...action.payload.tracks].sort(
				() => 0.5 - Math.random()
			);
		},
		setNextTrack: state => {
			const playlist = state.isShuffle
				? state.shuffledPlaylist
				: state.playlist;
			const currentTrackIndex = playlist.findIndex(
				track => track._id === state.currentTrack?._id
			);
			const newTrack = playlist[currentTrackIndex + 1];
			if (newTrack) {
				state.currentTrack = newTrack;
			}
		},
		setPrevTrack: state => {
			const playlist = state.isShuffle
				? state.shuffledPlaylist
				: state.playlist;
			const currentTrackIndex = playlist.findIndex(
				track => track.id === state.currentTrack?.id
			);
			const newTrack = playlist[currentTrackIndex - 1];
			if (newTrack) {
				state.currentTrack = newTrack;
			}
		},
		setIsShuffle: (state, action: PayloadAction<boolean>) => {
			state.isShuffle = action.payload;
		},
		setLikeTrack: (state, action: PayloadAction<number>) => {
			const trackId = action.payload;
			// добавить в likedPlaylist
			const track = state.playlist.find(track => track.id === trackId);
			if (track && !state.likedPlaylist.includes(track)) {
				state.likedPlaylist.push(track);
			}
		},
		setDisLikeTrack: (state, action: PayloadAction<number>) => {
			const trackId = action.payload;
			// убрать из likedPlaylist
			state.likedPlaylist = state.likedPlaylist.filter(
				track => track.id !== trackId
			);
		},
	},
	extraReducers(builder) {
		builder.addCase(getFavoriteTrack.fulfilled, (state, action) => {
			state.likedPlaylist = action.payload;
		});
		builder.addCase(getFavoriteTrack.rejected, state => {});
	},
});

export const {
	setCurrentTrack,
	setNextTrack,
	setPrevTrack,
	setIsShuffle,
	setDisLikeTrack,
	setLikeTrack,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
