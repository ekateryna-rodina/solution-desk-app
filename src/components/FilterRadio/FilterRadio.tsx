import React from "react";
import { FilterRadioType } from "../../constants";
import styles from "./FilterRadio.module.css";

const FilterRadio = () => {
  return (
    <>
      <div className={`mt-[2.5rem] ${styles.inputRow}`}>
        <input
          type="radio"
          id="is"
          value={FilterRadioType.Is}
          name="filterRadioType"
        />

        <label className={styles.label} htmlFor="is">
          Is
        </label>
      </div>
      <div className={styles.inputRow}>
        <input
          type="radio"
          id="contains"
          value={FilterRadioType.Contains}
          name="filterRadioType"
        />
        <label className={styles.label} htmlFor="contains">
          Contains
        </label>
      </div>
      <div className={styles.inputRow}>
        <input
          type="radio"
          id="not"
          value={FilterRadioType.Not}
          name="filterRadioType"
        />
        <label className={styles.label} htmlFor="not">
          Not
        </label>
      </div>
    </>
  );
};

export default FilterRadio;
