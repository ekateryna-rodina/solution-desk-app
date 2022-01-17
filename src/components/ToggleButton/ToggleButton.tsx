import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { toggleNavigation } from "../../features/layout/layout-slice";
import ToggleMenuIcon from "../icons/ToggleMenuIcon";

const ToggleButton = () => {
  const dispatch = useAppDispatch();
  const onToggleHandler = () => {
    dispatch(toggleNavigation());
  };
  return (
    <button
      onClick={onToggleHandler}
      className="w-8 h-8 bg-white bg-opacity-40 flex justify-center align-center"
    >
      <ToggleMenuIcon color={"#020D92"} />
    </button>
  );
};

export default ToggleButton;
