import { useDispatch } from "react-redux";
import styles from "./Search.module.css";
import { filterPlaylist } from "@/store/features/trackSlice";

const Search = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.search}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        onChange={(e) => {
          dispatch(
            filterPlaylist({
              operation: "add",
              filter: { type: "search", value: e.currentTarget.value },
            })
          );
        }}
        className={styles.searchText}
        name="search"
        placeholder="Поиск"
        type="search"
      />
    </div>
  );
};

export default Search;
