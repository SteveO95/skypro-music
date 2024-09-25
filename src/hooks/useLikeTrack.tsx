import { handleError } from "@/components/Toast/Toast";
import { dislikeTrack, likeTrack } from "@/services/api";
import { setDislikeTrack, setLikeTrack } from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const useLikeTrack = (trackID: number) => {
  const dispatch = useAppDispatch();

  const tokens = {
    access: useAppSelector((state) => state.auth.accessToken),
    refresh: useAppSelector((state) => state.auth.refreshToken),
  };
  const likedTraks = useAppSelector((state) => state.track.likedPlaylistState);

  // Получаем состояние лайка из избранных треков
  // или получать в качестве пропса
  const isLiked = !!likedTraks ? !!likedTraks.find((track) => track.id === trackID) : false;

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!tokens.access || !tokens.refresh) return handleError("Вы не авторизованы");

    const action = isLiked ? dislikeTrack : likeTrack;

    try {
      await action({
        trackId: trackID,
        access: tokens.access,
        refresh: tokens.refresh,
      });

      if (isLiked) {
        dispatch(setDislikeTrack(trackID));
      } else {
        dispatch(setLikeTrack(trackID));
      }
    } catch (error) {
      handleError("Непредвиденная ошибка");
      console.error(error);
    }
  };

  return { handleLike, isLiked };
};

export default useLikeTrack;
