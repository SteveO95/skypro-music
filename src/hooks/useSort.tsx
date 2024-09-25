import { sortPlaylist } from "@/store/features/trackSlice";
import { useAppDispatch } from "@/store/store";
import { SortType } from "@/types/sort";
import { useCallback, useState } from "react";

export type sortInitialValues = {
  name: string;
  type: Partial<SortType["type"]>;
  direction: Partial<SortType["direction"]>;
};

const useSort = (initialValues: sortInitialValues[]) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const dispatch = useAppDispatch();

  const values = initialValues.map((item) => item.name);

  const sort = useCallback(
    (value: string) => {
      const newValue = selectedValue === value ? undefined : value;

      setSelectedValue(newValue);
      const direction = initialValues.find((item) => item.name === newValue)?.direction;
      const type = initialValues.find((item) => item.name === newValue)?.type;

      if (!direction || !type) return;

      dispatch(sortPlaylist({ direction, type }));
    },
    [dispatch, initialValues, selectedValue]
  );

  return { selectedValue, values, sort };
};

export default useSort;
