import React from "react";
import styles from "../FormInput.module.css";

type EmailFormInputProps = {
  validated: any;
  id: string;
  label: string;
  required: boolean;
};
const EmailFormInput = ({
  validated,
  id,
  label,
  required,
}: EmailFormInputProps) => {
  return (
    <input
      {...validated(id, { required })}
      className={styles.formInput}
      type="email"
      id={id}
      placeholder={label}
      aria-label={label}
    />
  );
};

export default EmailFormInput;
