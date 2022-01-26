import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { applyFilter } from "../../features/filter/filter-slice";
import { Autocomplete } from "../Autocomplete";
import { FilterRadio } from "../FilterRadio";
import styles from "./WordSearchFilter.module.css";

type WordSearchFilterProps = {
  data: string[];
  group: string;
  tabindex: string | number;
};
const WordSearchFilter = ({ tabindex, data, group }: WordSearchFilterProps) => {
  const {
    current: { term, filterType, option },
  } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const onApplyHandler = () => {
    dispatch(applyFilter({ option, term, filterType }));
  };
  return (
    <>
      <Autocomplete data={data} tabindex={+tabindex} />
      <FilterRadio group={group} />
      <div className="flex justify-between items-center mt-4">
        <button className={styles.btn}>Cancel</button>
        <button
          onClick={onApplyHandler}
          className={`${styles.btn} ${styles.primary} ${
            !term.length ? styles.disabled : ""
          }`}
        >
          Apply
        </button>
      </div>
    </>
  );
};
export default React.memo(WordSearchFilter);
