import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleAddNewUser } from "../../features/addNewUser/addNewUser-slice";

const AddNewButton = () => {
  const dispatch = useAppDispatch();
  const { isAddNewShown } = useAppSelector((state) => state.addNewUser);
  const onAddNewHandler = () => {
    dispatch(toggleAddNewUser());
  };
  return (
    <button
      className="py-1 px-2 rounded bg-blueExtend text-white hover:bg-blueExtend/80 border-bg-blueExtend transition ease-out shadow-md"
      onClick={onAddNewHandler}
    >
      Add New User
    </button>
  );
};

export default AddNewButton;
