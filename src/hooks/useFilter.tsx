import { filterPlaylist } from "@/store/features/trackSlice";
import { useAppDispatch } from "@/store/store";
import { FilterType } from "@/types/filter";
import { useCallback, useState } from "react";

const useFilter = (type: FilterType["type"]) => {
  const [values, setValues] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const filter = useCallback(
    (value: string) => {
      const isValueSelected = values.includes(value);
      const newValues = isValueSelected ? values.filter((v) => v !== value) : [...values, value];

      setValues(newValues);

      const operation = isValueSelected ? "delete" : "add";

      dispatch(filterPlaylist({ operation, filter: { type, value } }));
    },
    [dispatch, type, values]
  );

  return { values, filter };
};

export default useFilter;
