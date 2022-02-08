import React from "react";
import { Direction } from "../../constants";

type DynamicLabelProps = {
  value: string;
};
const DynamicLabel = ({ value }: DynamicLabelProps) => {
  const direction = value.startsWith("+")
    ? Direction.Up
    : value.startsWith("-")
    ? Direction.Down
    : Direction.Undefined;

  return (
    <div
      className={`px-3 rounded-lg ${
        direction == Direction.Up
          ? "bg-emerald-500/50 text-emerald-900"
          : direction == Direction.Down
          ? "bg-red-500/50 text-red-900"
          : "bg-white border-[1px] border-slate-500"
      }`}
    >
      {value}
    </div>
  );
};

export default DynamicLabel;
