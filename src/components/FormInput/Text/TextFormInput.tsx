import React from "react";
import styles from "../FormInput.module.css";

type TextFormInputProps = {
  validated: any;
  id: string;
  label: string;
  required: boolean;
};
const TextFormInput = ({
  validated,
  id,
  label,
  required,
}: TextFormInputProps) => {
  return (
    <input
      {...validated(id, { required })}
      className={styles.formInput}
      type="text"
      id={id}
      placeholder={label}
      aria-label={label}
    />
  );
};

export default TextFormInput;
