import React from "react";
import { FilterRadioType } from "../../constants";
import styled from "./Radio.module.css";

type RadioProps = {
  checked: boolean;
  name: string;
  groupName: string;
  value: any;
  onCheckedHandler: (type: any) => void;
};
const Radio = ({
  checked,
  name,
  groupName,
  value,
  onCheckedHandler,
}: RadioProps) => {
  return (
    <label
      className={styled.container}
      onClick={() => onCheckedHandler(FilterRadioType[name])}
    >
      <input
        type="radio"
        aria-checked={checked}
        name={groupName}
        value={value}
        onChange={() => null}
      />
      <span className={styled.checkmark}></span>
      <span className={styled.label}>{name}</span>
    </label>
  );
};

export default Radio;
