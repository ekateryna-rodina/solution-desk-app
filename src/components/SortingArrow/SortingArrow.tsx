import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Column, Order } from "../../constants";
import { sort } from "../../features/usersSorting/usersSorting-slice";
import CaretDownIcon from "../icons/CaretDownIcon";
import CaretUpIcon from "../icons/CaretUpIcon";

type SortingArrowProps = {
  current: Column;
};
const SortingArrow = ({ current }: SortingArrowProps) => {
  const { order, column } = useAppSelector((state) => state.usersSorting);
  const dispatch = useAppDispatch();
  const onSortHandler = () => {
    const newOrder =
      current == column
        ? order == Order.Ascending
          ? Order.Descending
          : Order.Ascending
        : Order.Descending;
    dispatch(sort({ order: newOrder, column: current }));
  };
  return (
    <>
      <button className="outline-none border-0 p-0" onClick={onSortHandler}>
        {current == column ? (
          order == Order.Ascending ? (
            <CaretDownIcon fill={"fill-slate-400"} />
          ) : (
            <CaretUpIcon fill={"fill-slate-400"} />
          )
        ) : (
          <CaretDownIcon fill={"fill-slate-400"} />
        )}
      </button>
    </>
  );
};

export default SortingArrow;
