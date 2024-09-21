import classNames from "classnames";
import styles from "./FilterItem.module.css";
import { tree } from "next/dist/build/templates/app-page";

interface Props {
  title: string;
  filterList: string[];
  isActive: boolean;
  handleFilter: Function;
}

const FilterItem = ({ title, filterList, isActive = false, handleFilter }: Props) => {
  let filterButtonClass = classNames({
    [styles.filterButton]: true,
    [styles["_btn-text"]]: true,
    [styles.active]: isActive,
  });

  let filerPopupClass = classNames({
    [styles.filerPopupContainer]: true,
    [styles.active]: isActive,
  });

  return (
    <>
      <div className={styles.filterContainer}>
        <div className={filterButtonClass} onClick={() => handleFilter(title)}>
          {title}
        </div>
        <div className={filerPopupClass}>
          <ul className={styles.filterPopup}>
            {filterList.map((item, index) => (
              <li className={styles.filterPopupItem} key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FilterItem;
