import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { trackType } from '../../types';

// Тип состояния (PlayList)
type PlaylistStateType = {
	currentTrack: null | trackType;
	trackArray: null | trackType[];
	isPlaying: boolean;
};

// Начальное состояние
const initialState: PlaylistStateType = {
	currentTrack: null,
	trackArray: null,
	isPlaying: false,
};

// Слайс для управления состоянием плейлиста
const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	reducers: {
		// Устанавливаем текущий трек
		setCurrentTrack: (state, action: PayloadAction<trackType>) => {
			state.currentTrack = action.payload;
		},
		// Устанавливаем массив треков
		setTrackArray: (state, action: PayloadAction<trackType[] | null>) => {
			state.trackArray = action.payload;
		},
		// Устанавливаем состояние воспроизведения
		setIsPlaying: (state, action: PayloadAction<boolean>) => {
			state.isPlaying = action.payload;
		},
	},
});

// Экспортируем действия и редьюсер
export const { setCurrentTrack, setTrackArray, setIsPlaying } =
	playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
