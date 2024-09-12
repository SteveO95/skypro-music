const API_URL = 'https://webdev-music-003b5b991590.herokuapp.com/';
const TRACKS_URL = `${API_URL}catalog/track/`;
export async function getPlaylist() {
	const res = await fetch(TRACKS_URL + `all/`);
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	const data = await res.json();
	return data.data;
}
