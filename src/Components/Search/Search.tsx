import React, { ChangeEvent } from "react";
import styles from "./Search.module.css";

type SearchProps = {
  onSearch: (keyword: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className={styles.centerblockSearch}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.searchText}
        name="search"
        placeholder="Поиск"
        type="search"
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
