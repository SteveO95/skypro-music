"use client";
import FilterItem from "./FilterItem/FilterItem";
import { getUniqueValues } from "@/helpers/getUniqueValues";
import { useMemo, useState } from "react";
import { useAppSelector } from "@/store/store";
import styles from "./Filter.module.css";
import useFilter from "@/hooks/useFilter";
import { SortType } from "@/types/sort";
import useSort, { sortInitialValues } from "@/hooks/useSort";

const dates: sortInitialValues[] = [
  { name: "По умолчанию", direction: "default", type: "release_date" },
  { name: "Сначала новые", direction: "asc", type: "release_date" },
  { name: "Сначала старые", direction: "desc", type: "release_date" },
];

const Filter = () => {
  const tracks = useAppSelector((state) => state.track.initialPlaylistState);

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const authorList = useMemo(() => {
    return tracks ? getUniqueValues(tracks, "author") : [];
  }, [tracks]);
  const genreList = useMemo(() => {
    return tracks ? getUniqueValues(tracks, "genre") : [];
  }, [tracks]);

  const { values: currentAuthors, filter: filterAuthor } = useFilter("author");
  const { values: currentGenres, filter: filterGenre } = useFilter("genre");
  const { selectedValue: selectedSort, values: currentDates, sort: sortDate } = useSort(dates);

  const toggleOpen = (newFilter: string) => {
    setSelectedFilter((currentFilter) => (currentFilter === newFilter ? null : newFilter));
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <FilterItem
        title={"исполнителю"}
        isActive={selectedFilter == "исполнителю"}
        filterList={authorList}
        toggleOpen={toggleOpen}
        currentValues={currentAuthors}
        handleItemClick={filterAuthor}
      />
      <FilterItem
        title={"году выпуска"}
        isActive={selectedFilter == "году выпуска"}
        toggleOpen={toggleOpen}
        filterList={currentDates}
        currentValues={selectedSort ? [selectedSort] : undefined}
        handleItemClick={sortDate}
      />
      <FilterItem
        title={"жанру"}
        isActive={selectedFilter == "жанру"}
        filterList={genreList}
        toggleOpen={toggleOpen}
        currentValues={currentGenres}
        handleItemClick={filterGenre}
      />
    </div>
  );
};

export default Filter;
