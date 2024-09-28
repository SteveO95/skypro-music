import { useMemo } from "react";
import { PlaylistType } from "@/types/playlist";

type FiltersState = {
  genres: string[];
  authors: string[];
  keyword: string;
  sortOption: string;
};

const useFilteredTracks = (tracks: PlaylistType[], filters: FiltersState) => {
  const filteredTracks = useMemo(() => {
    let result = tracks;

    // Фильтрация по жанрам
    if (filters.genres.length > 0) {
      result = result.filter((track) =>
        filters.genres.some((genre) => track.genre.includes(genre))
      );
    }

    // Фильтрация по авторам
    if (filters.authors.length > 0) {
      result = result.filter((track) =>
        filters.authors.includes(track.author)
      );
    }

    // Фильтрация по ключевому слову
    if (filters.keyword) {
      const lowerKeyword = filters.keyword.toLowerCase();
      result = result.filter(
        (track) =>
          track.name.toLowerCase().includes(lowerKeyword)
      );
    }

    // Сортировка треков
    if (filters.sortOption !== "По умолчанию") {
      result = [...result].sort((a, b) => {
        const dateA = new Date(a.release_date).getTime();
        const dateB = new Date(b.release_date).getTime();

        return filters.sortOption === "Сначала новые" ? dateB - dateA : dateA - dateB;
      });
    }

    return result;
  }, [tracks, filters]);

  return filteredTracks;
};

export default useFilteredTracks;
