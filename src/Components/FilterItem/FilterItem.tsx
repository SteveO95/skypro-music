import styles from "./FilterItem.module.css";
type FilterList = {
  name: string;
  id: number;
};
type FilterItemProps = {
  filterList: FilterList[];
};
export default function FilterItem({ filterList }: FilterItemProps) {
  return (
    <div className={styles.wrapList}>
      <ul className={styles.list}>
        {filterList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
