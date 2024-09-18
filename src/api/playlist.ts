import { fetchWithAuth } from '../utils/fetchWithAuth';
const BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com/';
const USER_URL = `${BASE_URL}user/`;
const TRACKS_URL = `${BASE_URL}catalog/track/`;

export async function getPlaylist() {
	const res = await fetch(TRACKS_URL + `all/`);
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	const data = await res.json();
	return data.data;
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
		TRACKS_URL + `${trackId}/favorite/`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${access}`,
			},
		},
		refresh
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(
			`Ошибка ${res.status}: ${errorData.message || 'Неизвестная ошибка'}`
		);
	}
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
		TRACKS_URL + `${trackId}/favorite/`,
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
//Просмотр избранного
export async function fetchFavoriteTracks({
	access,
	refresh,
}: {
	access: string;
	refresh: string;
}) {
	const res = await fetchWithAuth(
		TRACKS_URL + `favorite/all/`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${access}`,
			},
		},
		refresh
	);
	const data = await res.json();
	return data.data;
}

export async function signInUser({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const response = await fetch(USER_URL + `login/`, {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const json = await response.json();

	if (!response.ok) {
		throw new Error('Ошибка входа');
	}

	return json;
}

export async function signUpUser({
	email,
	password,
	username,
}: {
	email: string;
	password: string;
	username: string;
}) {
	const response = await fetch(USER_URL + `signup/`, {
		method: 'POST',
		body: JSON.stringify({ email, password, username }), // Передача данных нового пользователя
		headers: {
			'Content-Type': 'application/json', // Установка заголовков
		},
	});

	// Преобразование ответа в JSON
	const json = await response.json();

	if (!response.ok) {
		throw new Error('Ошибка регистрации');
	}
}

//функция получения токенов
export async function getTokens({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const response = await fetch(USER_URL + `token/`, {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.detail);
	}

	return json;
}

export async function refreshToken(refresh: string) {
	const res = await fetch(USER_URL + `token/refresh/`, {
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
}
