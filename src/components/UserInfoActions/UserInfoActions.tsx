import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { enableEditMode } from "../../features/userInfo/userInfo-slice";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import OkIcon from "../icons/OkIcon";

const UserInfoActions = () => {
  const dispatch = useAppDispatch();
  const onEditModeHandler = () => {
    if (isEditMode) {
    } else {
      dispatch(enableEditMode());
    }
  };
  const { isEditMode } = useAppSelector((state) => state.userInfo);
  return (
    <div className="absolute top-4 left-0">
      <div className="flex flex-row justify-start items-center gap-2 px-4">
        <button>
          <DeleteIcon fill={"fill-blueExtend/50"} />
        </button>
        {isEditMode ? (
          <button onClick={onEditModeHandler}>
            <OkIcon fill={"fill-emerald-500"} />
          </button>
        ) : (
          <button onClick={onEditModeHandler}>
            <EditIcon stroke={"stroke-blueExtend/50"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfoActions;
