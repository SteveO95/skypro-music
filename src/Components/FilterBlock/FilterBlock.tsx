"use client";
import styles from "../FilterBlock/FilterBlock.module.css";
import FilterItem from "../FilterItem/FilterItem";
import classNames from "classnames";
import { useState } from "react";

export default function FilterBlock() {
  const [filterActive, setFilterActive] = useState("");
  const authors = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "John Smith" },
    { id: 4, name: "Jane Smith" },
    { id: 5, name: "John Johnson" },
  ];
  const years = [
    { id: 1, name: "2010" },
    { id: 2, name: "2011" },
    { id: 3, name: "2012" },
    { id: 4, name: "2013" },
    { id: 5, name: "2014" },
    { id: 6, name: "2015" },
    { id: 7, name: "2016" },
    { id: 8, name: "2017" },
  ];

  const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Comedy" },
    { id: 4, name: "Drama" },
    { id: 5, name: "Fantasy" },
  ];
  function activeChangeFilter(nameFilter: string) {
    if (filterActive === nameFilter) {
      setFilterActive("");
      return;
    }
    setFilterActive(nameFilter);
  }
  return (
    <div className={classNames(styles.centerBlockFilter, styles.filter)}>
      <div className={styles.filterTitle}>Искать по:</div>
      <div className={styles.wrapperFilters}>
        <div
          onClick={() => activeChangeFilter("author")}
          className={`${
            filterActive === "author"
              ? classNames(
                  styles.filterButtonActive,
                  styles.buttonAuthor,
                  styles.btnTextActive
                )
              : classNames(
                  styles.filterButton,
                  styles.buttonAuthor,
                  styles.btnText
                )
          } `}
        >
          исполнителю
        </div>
        {filterActive === "author" ? <FilterItem filterList={authors} /> : "" }
      </div>
      <div className={styles.wrapperFilters}>
        <div
          onClick={() => activeChangeFilter("year")}
          className={`${
            filterActive === "year"
              ? classNames(
                  styles.filterButtonActive,
                  styles.buttonYear,
                  styles.btnTextActive
                )
              : classNames(
                  styles.filterButton,
                  styles.buttonYear,
                  styles.btnText
                )
          } `}
        >
          году выпуска
        </div>
       {filterActive === "year" ? <FilterItem filterList={years} /> : "" } 
      </div>
      <div className={styles.wrapperFilters}>
        <div
          onClick={() => activeChangeFilter("genre")}
          className={`${
            filterActive === "genre"
              ? classNames(
                  styles.filterButtonActive,
                  styles.buttonGenre,
                  styles.btnTextActive
                )
              : classNames(
                  styles.filterButton,
                  styles.buttonGenre,
                  styles.btnText
                )
          } `}
        >
          жанру
        </div>
        {filterActive === "genre" ? <FilterItem filterList={genres} /> : "" }
      </div>
    </div>
  );
}
