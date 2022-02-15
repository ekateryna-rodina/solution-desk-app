import React from "react";
import styles from "../FormInput.module.css";

type TextFormInputProps = {
  validated: any;
  id: string;
  label: string;
  required: boolean;
  pattern?: {
    value: RegExp;
    message: string;
  };
};
const TextFormInput = ({
  validated,
  id,
  label,
  required,
  pattern,
}: TextFormInputProps) => {
  return (
    <input
      {...validated(id, { required, pattern })}
      className={styles.formInput}
      type="text"
      id={id}
      placeholder={label}
      aria-label={label}
    />
  );
};

export default TextFormInput;
