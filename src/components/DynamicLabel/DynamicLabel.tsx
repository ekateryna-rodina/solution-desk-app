import React from "react";
import { DynamicDirection } from "../../constants";

type DynamicLabelProps = {
  value: string;
};
const DynamicLabel = ({ value }: DynamicLabelProps) => {
  const direction = value.startsWith("+")
    ? DynamicDirection.Up
    : DynamicDirection.Down;

  return (
    <div
      className={`px-3 rounded-lg ${
        direction == DynamicDirection.Up
          ? "bg-emerald-500/50 text-emerald-900"
          : "bg-red-500/50 text-red-900"
      }`}
    >
      {value}
    </div>
  );
};

export default DynamicLabel;
