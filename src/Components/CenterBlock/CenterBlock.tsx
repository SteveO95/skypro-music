"use client"

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "@/store/features/filtersSlice";
import styles from "./CenterBlock.module.css";
import Filter from "@/components/Filter/Filter";
import Playlist from "@/components/Playlist/Playlist";
import Search from "@/components/Search/Search";
import useFilteredTracks from "@/hooks/useFilteredTracks";
import { PlaylistType } from "@/types/playlist";
import { FiltersState } from "@/store/features/filtersSlice";

type CenterBlockProps = {
  tracks: PlaylistType[];
  title?: string;
  error?: string;
};

const CenterBlock = ({ tracks = [], error, title }: CenterBlockProps) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: { filters: FiltersState }) => state.filters);

  const filteredTracks = useFilteredTracks(tracks, filters);

  const handleFilterUpdate = (newFilters: Partial<FiltersState>) => {
    dispatch(updateFilters(newFilters));
  };

  const handleSearch = (keyword: string) => {
    handleFilterUpdate({ keyword });
  };

  return (
    <div className={styles.mainCenterblock}>
      <Search onSearch={handleSearch} />
      <h2 className={styles.centerblockHeader}>{title || "Треки"}</h2>
      <Filter tracks={tracks} filters={filters} onFilterUpdate={handleFilterUpdate} />
      {error && <div className={styles.error}>{error}</div>}
      {/* <Playlist tracks={filteredTracks} /> */}
      {filteredTracks.length > 0 ? (
        <Playlist tracks={filteredTracks} />
      ) : (
        <div className={styles.noTracks}>Треки не найдены</div>
      )}
    </div>
  );
};

export default CenterBlock;
