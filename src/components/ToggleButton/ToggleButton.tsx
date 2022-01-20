import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleNavigation } from "../../features/layout/layout-slice";
import ToggleMenuIcon from "../icons/ToggleMenuIcon";

const ToggleButton = () => {
  const { isNavigating } = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();
  const onToggleHandler = () => {
    dispatch(toggleNavigation());
  };
  return (
    <button
      onClick={onToggleHandler}
      className={`w-8 h-8 bg-opacity-40 flex justify-center items-center ${
        isNavigating ? "bg-white" : "bg-blueExtend"
      }`}
    >
      <ToggleMenuIcon
        fill={isNavigating ? "fill-blueExtend" : "fill-slate-100"}
      />
    </button>
  );
};

export default ToggleButton;
