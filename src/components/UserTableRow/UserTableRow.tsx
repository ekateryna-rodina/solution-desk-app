import React from "react";
import { ResponsiveColsMap } from "../../../pages/constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { ResponsiveColsMap } from "../../constants";
import {
  closeUserInfo,
  openUserInfo,
} from "../../features/userInfo/userInfo-slice";
import { IUser } from "../../types";
import CaretDownIcon from "../icons/CaretDownIcon";
import CaretUpIcon from "../icons/CaretUpIcon";
import { UserInfo } from "../UserInfo";

type UserTableRowProps = {
  user: IUser & { name: string };
};
const UserTableRow = ({ user }: UserTableRowProps) => {
  const { current } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const onToggleUserInfo = (userId: string) => {
    const isOpened = current && current.id === userId;
    if (isOpened) {
      dispatch(closeUserInfo());
    } else {
      dispatch(closeUserInfo());
      dispatch(openUserInfo(userId));
    }
  };
  return (
    <tr key={user.name}>
      {current && current.id == user["_id"] ? (
        <td className="h-28 shadow-2xl" colSpan={8}>
          <UserInfo />
        </td>
      ) : (
        Object.values(user).map((c: any, i) => (
          <td className={`p-4 ${ResponsiveColsMap[i]}`} key={c.toString()}>
            {c.toString()}
          </td>
        ))
      )}
      <td className="bg-slate-400 w-8 ">
        <button
          className="w-full h-12 flex justify-center items-center"
          onClick={() => onToggleUserInfo(user["_id"])}
        >
          {current && current.id === user["_id"] ? (
            <CaretUpIcon fill={"fill-slate-600"} />
          ) : (
            <CaretDownIcon fill={"fill-slate-600"} />
          )}
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;
