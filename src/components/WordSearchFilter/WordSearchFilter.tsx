import React from "react";
import { Autocomplete } from "../Autocomplete";
import { FilterRadio } from "../FilterRadio";
import styles from "./WordSearchFilter.module.css";

type WordSearchFilterProps = {
  data: string[];
  group: string;
  tabindex: string | number;
};
const WordSearchFilter = ({ tabindex, data, group }: WordSearchFilterProps) => {
  return (
    <>
      <Autocomplete data={data} tabindex={+tabindex} />
      <FilterRadio group={group} />
      <div className="flex justify-between items-center mt-4">
        <button className={styles.btn}>Cancel</button>
        <button className={`${styles.btn} ${styles.primary}`}>Apply</button>
      </div>
    </>
  );
};
export default React.memo(WordSearchFilter);
