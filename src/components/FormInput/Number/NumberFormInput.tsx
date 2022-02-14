import React from "react";
import styles from "../FormInput.module.css";

type NumberFormInputProps = {
  validated: any;
  id: string;
  label: string;
  required: boolean;
  min: number;
};
const NumberFormInput = ({
  validated,
  id,
  label,
  required,
  min,
}: NumberFormInputProps) => {
  return (
    <input
      className={styles.formInput}
      id={id}
      {...validated(id, { required })}
      type="number"
      min={min.toString()}
    ></input>
  );
};

export default NumberFormInput;
