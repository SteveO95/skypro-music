import { fetchWithAuth } from '../utils/fetchWithAuth';
const BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com/';
const API_URL = 'https://skypro-music-api.skyeng.tech/catalog/track/all/';

export async function getPlaylist() {
	const res = await fetch(API_URL);
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	return res.json();
}

export async function likeTrack({
	trackId,
	access,
	refresh,
}: {
	trackId: number;
	access: string;
	refresh: string;
}) {
	const res = await fetchWithAuth(
		BASE_URL + `/track/${trackId}/favorite/`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${access}`,
			},
		},
		refresh
	);

	return res.json();
}

export async function disLikeTrack({
	trackId,
	access,
	refresh,
}: {
	trackId: number;
	access: string;
	refresh: string;
}) {
	const res = await fetchWithAuth(
		BASE_URL + `/track/${trackId}/favorite/`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${access}`,
			},
		},
		refresh
	);

	return res.json();
}

export async function fetchFavoriteTracks({
	access,
	refresh,
}: {
	access: string;
	refresh: string;
}) {
	const res = await fetchWithAuth(
		BASE_URL + `/track/favorite/all/`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${access}`,
			},
		},
		refresh
	);
	return res.json();
}

export async function refreshToken(refresh: string) {
	const res = await fetch(BASE_URL + `/user/token/refresh/`, {
		method: 'POST',
		body: JSON.stringify({
			refresh,
		}),
		headers: {
			// API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
			'Content-Type': 'application/json',
		},
	});
	if (!res.ok) {
		throw new Error('Не удалось обновить токен');
	}
	return res.json();
	// .then((json) => console.log(json));
}
