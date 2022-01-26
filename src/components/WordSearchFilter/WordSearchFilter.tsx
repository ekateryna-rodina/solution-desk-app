import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  applyFilter,
  clearCurrentFilter,
  setCurrentFilterProperty,
} from "../../features/filter/filter-slice";
import { Autocomplete } from "../Autocomplete";
import { TermSearchFilter } from "../TermSearchFilter";
import styles from "./WordSearchFilter.module.css";

type WordSearchFilterProps = {
  data: string[];
  group: string;
  tabindex: string | number;
};
const WordSearchFilter = ({ tabindex, data, group }: WordSearchFilterProps) => {
  const {
    current: { term, termSearchFilterType, property },
  } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const onApplyHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(applyFilter({ property, term, termSearchFilterType }));
    dispatch(clearCurrentFilter());
  };
  const onCloseCurrentFilterHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    dispatch(clearCurrentFilter());
    dispatch(setCurrentFilterProperty(null));
  };
  return (
    <>
      <Autocomplete data={data} tabindex={+tabindex} />
      <TermSearchFilter group={group} />
      <div className="flex justify-between items-center mt-4">
        <button onClick={onCloseCurrentFilterHandler} className={styles.btn}>
          Cancel
        </button>
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
