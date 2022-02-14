import React from "react";
import styles from "../FormInput.module.css";

type DateFormInputProps = {
  validated: any;
  id: string;
  label: string;
  required: boolean;
};
const DateFormInput = ({
  validated,
  id,
  label,
  required,
}: DateFormInputProps) => {
  return (
    <input
      {...validated(id, { required })}
      className={styles.formInput}
      type="date"
      id={id}
      placeholder={label}
      aria-label={label}
    />
  );
};

export default DateFormInput;
