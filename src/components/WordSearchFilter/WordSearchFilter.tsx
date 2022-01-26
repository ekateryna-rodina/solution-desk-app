import React from "react";
import { useAppSelector } from "../../app/hooks";
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
    current: { term },
  } = useAppSelector((state) => state.filter);
  return (
    <>
      <Autocomplete data={data} tabindex={+tabindex} />
      <FilterRadio group={group} />
      <div className="flex justify-between items-center mt-4">
        <button className={styles.btn}>Cancel</button>
        <button
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
