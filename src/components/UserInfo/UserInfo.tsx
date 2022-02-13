import React from "react";
import { useAppSelector } from "../../app/hooks";
import { UserInfoActions } from "../UserInfoActions";
import { UserInfoEdit } from "../UserInfoEdit";
import { UserInfoView } from "../UserInfoView";
import style from "./UserInfo.module.css";

const UserInfo = () => {
  const { isEditMode } = useAppSelector((state) => state.userInfo);

  return (
    <div className="relative">
      {isEditMode ? (
        <form className={`grid ${style.gridInfo}`}>
          <UserInfoEdit />
        </form>
      ) : (
        <div className={`grid ${style.gridInfo}`}>
          <UserInfoView />
        </div>
      )}
      <UserInfoActions />
    </div>
  );
};

export default React.memo(UserInfo);
