import { getTrackResponse } from '../../types';
// const baseUrl = ('https://webdev-music-003b5b991590.herokuapp.com/')

export function getTracks(): Promise<getTrackResponse> {
	return fetch(
		'https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/'
	)
		.then(res => {
			// Проверяем, что запрос выполнен успешно
			if (!res.ok) {
				throw new Error('Данные не получены');
			}
			return res.json();
		})
		.then(res => {
			// Возвращаем объект с данными и без ошибки()

			return {
				error: null,
				data: res.data,
			};
		})
		.catch((error: Error) => {
			// Возвращаем объект с ошибкой и без данных
			return { error: error.message, data: null };
		});
}
