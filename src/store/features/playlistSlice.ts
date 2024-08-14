import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { trackType } from '../../types';
//Тип состояния (PlayList)
//currentTrack будет отвечать за текущий трек
type PlaylistStateType = {
	currentTrack: null | trackType;
};
// Начально состояние
const initialState: PlaylistStateType = {
	currentTrack: null,
};
// константа , в которой сохраняем результат вызова функции(пример из PlaylistStateType)
const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	//некоторые функции которые будут выполнять
	// манипуляции над нашим состоянием(обработка данных)
	reducers: {
		//trackType(объект) будем устанавливать трек
		setCurrentTrack: (state, action: PayloadAction<trackType>) => {
			//первое принимает состояние(актуальное на текущий момент)
			// из action мы будем получать данные которое мы передаем в вызове (этой)функции
			state.currentTrack = action.payload;
		},
	},
});

export const { setCurrentTrack } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
