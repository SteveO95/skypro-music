import { disLikeTrack, likeTrack } from '../api/playlist';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setDisLikeTrack, setLikeTrack } from '../store/features/playlistSlice';

const useLikeTrack = (trackId: number) => {
	const dispatch = useAppDispatch();
	// const tokens = useAppSelector(state =. state.auth.tokens)
	const tokens = {
		access: '',
		refresh: '',
	};
	const likeTracks = useAppSelector(state => state.playlist.likedPlaylist);
	//   получаем состояние лайка из избранных треков
	const isLiked = !!likeTracks.find(track => track.id === trackId);
	//   !! - двойное отрицание на типы
	const handleLike = async () => {
		if (!tokens.access || !tokens.refresh) return alert('Вы не авторизованы');
		const action = isLiked ? disLikeTrack : likeTrack;
		try {
			await action({
				trackId: trackId,
				access: tokens.access,
				refresh: tokens.refresh,
			});
			if (isLiked) {
				dispatch(setDisLikeTrack(trackId));
			} else {
				dispatch(setLikeTrack(trackId));
			}
		} catch (error) {
			console.error(error);
		}
	};
	return { handleLike, isLiked };
};

export default useLikeTrack;
