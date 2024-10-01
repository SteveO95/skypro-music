import { useState } from "react";
import { PlaylistType } from "@/types/playlist";
import styles from "./Filter.module.css";
import { getUniqueValues } from "@/utils/getUniqueValues";
import FilterItem from "./FilterItem/FilterItem";
import { FiltersState } from "@/store/features/filtersSlice";
import { useRouter } from "next/router";

type FilterProps = {
  tracks: PlaylistType[];
  filters: FiltersState;
  onFilterUpdate: (newFilters: Partial<FiltersState>) => void;
};

const SORT_OPTIONS = ["По умолчанию", "Сначала новые", "Сначала старые"];

const Filter = ({ tracks, filters, onFilterUpdate }: FilterProps) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  
  const handleSortOption = (sortOption: string) => {
    onFilterUpdate({ sortOption });
  };

  const handleMultipleFilter = (key: keyof FiltersState, value: string) => {
    const currentFilter = filters[key];

    if (Array.isArray(currentFilter)) {
      const newValues = currentFilter.includes(value)
        ? currentFilter.filter((item) => item !== value)
        : [...currentFilter, value];
      onFilterUpdate({ [key]: newValues });
    }
  };

  const toggleFilter = (filterName: string) => {
    setOpenFilter((prev) => (prev === filterName ? null : filterName));
  };

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <FilterItem
        title="исполнителю"
        isActive={openFilter === "исполнителю"}
        list={getUniqueValues(tracks, "author")}
        multiple={true}
        handleFilter={(value) => handleMultipleFilter("authors", value)}
        onToggle={() => toggleFilter("исполнителю")}
      />
      <FilterItem
        title="году выпуска"
        isActive={openFilter === "году выпуска"}
        list={SORT_OPTIONS}
        handleFilter={(value) => handleSortOption(value)}
        onToggle={() => toggleFilter("году выпуска")}
      />
      <FilterItem
        title="жанру"
        isActive={openFilter === "жанру"}
        list={getUniqueValues(tracks, "genre")}
        multiple={true}
        handleFilter={(value) => handleMultipleFilter("genres", value)}
        onToggle={() => toggleFilter("жанру")}
      />
    </div>
  );
};

export default Filter;
