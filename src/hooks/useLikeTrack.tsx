import { disLikeTrack, likeTrack } from "@/api/playlist";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setDisLikeTrack, setLikeTrack } from "@/store/features/playlistSlice";

const useLikeTrack = (trackId: number) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);

  const likeTracks = useAppSelector((state) => state.playlist.likedPlaylist);
  const isLiked = !!(
    likeTracks && likeTracks.find((track) => track._id === trackId)
  );

  const handleLike = async () => {
    if (!tokens || !tokens.access || !tokens.refresh)
      return alert("Вы не авторизованы");
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
    } catch (error: any) {
      console.error("Ошибка при изменении состояния трека:", error);
      if (error.response) {
        alert(
          `Ошибка: ${error.response.data.message || "Не удалось обновить статус трека"}`
        );
      } else if (error.request) {
        alert("Ошибка: Нет ответа от сервера");
      } else {
        alert(`Ошибка: ${error.message || "Что-то пошло не так"}`);
      }
    }
  };
  return { handleLike, isLiked };
};

export default useLikeTrack;
