import React from "react";
import { ResponsiveColsMap } from "../../../pages/constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeUserInfo,
  openUserInfo,
} from "../../features/userInfo/userInfo-slice";
import { IUser } from "../../types";
import CaretDownIcon from "../icons/CaretDownIcon";
import CaretUpIcon from "../icons/CaretUpIcon";
import { UserInfo } from "../UserInfo";

type UserTableRowProps = {
  user: IUser;
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
        <>
          <td className="h-28 shadow-2xl md:hidden " colSpan={3}>
            <UserInfo />
          </td>
          <td
            className="h-28 shadow-2xl hidden md:table-cell lg:hidden"
            colSpan={5}
          >
            <UserInfo />
          </td>
          <td
            className="h-28 shadow-2xl hidden lg:table-cell xl:hidden"
            colSpan={7}
          >
            <UserInfo />
          </td>
          <td
            className="h-28 shadow-2xl hidden xl:table-cell 2xl:hidden"
            colSpan={10}
          >
            <UserInfo />
          </td>
          <td className="h-28 shadow-2xl hidden 2xl:table-cell" colSpan={17}>
            <UserInfo />
          </td>
        </>
      ) : (
        Object.keys(user).map((property: string) => (
          <td
            className={`p-4 ${ResponsiveColsMap[property]}`}
            key={user[property].toString()}
          >
            {user[property].toString()}
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
