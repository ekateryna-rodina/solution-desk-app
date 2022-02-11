import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { enableEditMode } from "../../features/userInfo/userInfo-slice";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";

const UserInfoActions = () => {
  const dispatch = useAppDispatch();
  const onEditModeHandler = () => {
    dispatch(enableEditMode());
  };
  return (
    <div className="absolute top-4 left-0">
      <div className="flex flex-row justify-start items-center gap-2 px-4">
        <button onClick={onEditModeHandler}>
          <EditIcon stroke={"stroke-blueExtend/50"} />
        </button>
        <button>
          <DeleteIcon fill={"fill-blueExtend/50"} />
        </button>
      </div>
    </div>
  );
};

export default UserInfoActions;
