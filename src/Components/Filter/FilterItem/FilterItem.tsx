import styles from "../Filter.module.css";

type FilterItemProps = {
  title: string;
  isActive: boolean;
  list: string[];
  handleFilter: () => void;
};

const FilterItem = ({
  title,
  isActive,
  list,
  handleFilter,
}: FilterItemProps) => {
  return (
    <div className={styles.filterWrapper}>
      <div onClick={handleFilter} className={styles.filterButton}>
        {title}
      </div>
      {isActive && (
        <ul className={styles.filterList}>
          {list.map((item) => (
            <li key={item} className={styles.filterListItem}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterItem;
