import styles from "./Search.module.css";

const Search = () => {
  return (
    <div className={styles.centerblockSearch}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.searchText}
        name="search"
        placeholder="Поиск"
        type="search"
      />
    </div>
  );
};

export default Search;
