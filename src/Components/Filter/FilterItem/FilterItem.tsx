import styles from "../Filter.module.css";

type FilterItemProps = {
  title: string;
  isActive: boolean;
  list: string[];
  multiple?: boolean;
  handleFilter: (value: string) => void;
  onToggle: () => void;
};

const FilterItem = ({
  title,
  isActive,
  list,
  multiple = false,
  handleFilter,
  onToggle,
}: FilterItemProps) => {
  return (
    <div className={styles.filterWrapper}>
      <div onClick={onToggle} className={styles.filterButton}>
        {title}
      </div>
      {isActive && (
        <ul className={styles.filterList}>
          {list.map((item) => (
            <li
              key={item}
              className={styles.filterListItem}
              onClick={() => handleFilter(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterItem;
