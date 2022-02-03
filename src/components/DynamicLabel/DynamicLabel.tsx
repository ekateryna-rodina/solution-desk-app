import React from "react";
import { Direction } from "../../constants";

type DynamicLabelProps = {
  value: string;
};
const DynamicLabel = ({ value }: DynamicLabelProps) => {
  const direction = value.startsWith("+") ? Direction.Up : Direction.Down;

  return (
    <div
      className={`px-3 rounded-lg ${
        direction == Direction.Up
          ? "bg-emerald-500/50 text-emerald-900"
          : "bg-red-500/50 text-red-900"
      }`}
    >
      {value}
    </div>
  );
};

export default DynamicLabel;
