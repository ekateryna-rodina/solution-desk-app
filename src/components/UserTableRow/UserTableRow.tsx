import React from "react";
import { ResponsiveColsMap } from "../../../pages/constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeUserInfo,
  openUserInfo,
} from "../../features/userInfo/userInfo-slice";
import { TypeWithDiscriminator, User } from "../../types";
import { DynamicProperty } from "../DynamicProperty";
import CaretDownIcon from "../icons/CaretDownIcon";
import CaretUpIcon from "../icons/CaretUpIcon";
import { UserInfo } from "../UserInfo";

type UserTableRowProps = {
  user: TypeWithDiscriminator<User>;
};
const UserTableRow = ({ user }: UserTableRowProps) => {
  const { current } = useAppSelector((state) => state.userInfo);
  const { search } = useAppSelector((state) => state.usersSearch);
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
  const highlightText = (text: string, property: string) => {
    if (!search) return text;
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <span
              key={`${i}_${property}_${user._id.value}`}
              className="bg-blueExtend/50 text-white"
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };
  if (!user.email) return <></>;
  return (
    <tr key={user["name"].value as string}>
      {current && current.id == user["_id"].value ? (
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
            colSpan={6}
          >
            <UserInfo />
          </td>
          <td
            className="h-28 shadow-2xl hidden xl:table-cell 2xl:hidden"
            colSpan={8}
          >
            <UserInfo />
          </td>
          <td className="h-28 shadow-2xl hidden 2xl:table-cell" colSpan={16}>
            <UserInfo />
          </td>
        </>
      ) : (
        Object.keys(ResponsiveColsMap).map((property: string, i) => {
          const key = `${user._id.value}_${property}`;
          return (
            <td
              className={`p-4 text-center ${ResponsiveColsMap[property]}`}
              key={key}
            >
              {property in user ? (
                user[property].__typename == "dynamic" ? (
                  <DynamicProperty value={user[property].value} />
                ) : (
                  highlightText(user[property].value.toString(), property)
                )
              ) : (
                <></>
              )}
            </td>
          );
        })
        // ResponsiveColsMap
        // Object.keys(user).map((property: string, i) => {
        //   const key = `${user._id.value}_${property}`;
        //   return (
        //     <td
        //       className={`p-4 text-center ${ResponsiveColsMap[property]}`}
        //       key={key}
        //     >
        //       {user[property].__typename == "dynamic" ? (
        //         <DynamicProperty value={user[property].value} />
        //       ) : (
        //         highlightText(user[property].value.toString())
        //       )}
        //     </td>
        //   );
        // })
      )}

      <td className="bg-slate-400 w-8 ">
        <button
          className="w-full h-12 flex justify-center items-center"
          onClick={() => onToggleUserInfo(user["_id"].value as string)}
        >
          {current && current.id === user["_id"].value ? (
            <CaretUpIcon fill={"fill-slate-600"} />
          ) : (
            <CaretDownIcon fill={"fill-slate-600"} />
          )}
        </button>
      </td>
    </tr>
  );
};

export default React.memo(UserTableRow);
