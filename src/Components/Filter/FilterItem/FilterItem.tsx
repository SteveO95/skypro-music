import classNames from "classnames";
import styles from "./FilterItem.module.css";
import { tree } from "next/dist/build/templates/app-page";

interface Props {
  title: string;
  filterList: string[];
  isActive: boolean;
  currentValues?: string[];
  toggleOpen: (_: string) => void;
  handleItemClick?: (value: string) => void;
}

const FilterItem = ({
  title,
  filterList,
  isActive = false,
  currentValues,
  toggleOpen,
  handleItemClick,
}: Props) => {
  let filterButtonClass = classNames({
    [styles.filterButton]: true,
    [styles["_btn-text"]]: true,
    [styles.active]: isActive,
    [styles.filtered]: currentValues?.length,
  });

  let filerPopupClass = classNames({
    [styles.filerPopupContainer]: true,
    [styles.active]: isActive,
  });

  let filerPopupCountClass = classNames({
    [styles.filterPopupCount]: true,
    [styles.active]: currentValues?.length,
    // [styles.active]: isActive,
  });

  return (
    <>
      <div className={styles.filterContainer}>
        <div className={filterButtonClass} onClick={() => toggleOpen(title)}>
          {title}
        </div>
        <div className={filerPopupClass}>
          <ul className={styles.filterPopup}>
            {filterList.map((item, index) => (
              <li
                className={classNames({
                  [styles.filterPopupItem]: true,
                  [styles.selected]: currentValues?.includes(item),
                })}
                key={index}
                onClick={() => handleItemClick && handleItemClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={filerPopupCountClass}>{currentValues?.length}</div>
        {/* <div className={filerPopupCountClass}>{Object.values(filterList).length}</div> */}
      </div>
    </>
  );
};

export default FilterItem;
