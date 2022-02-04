import Image from "next/image";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useGetAllUsersQuery } from "../../app/solutionDeskApi";
import {
  DateAttributes,
  PersonalInformationStructure,
} from "../../constants/index";
import { User } from "../../types";
import { formatDate, formatTitle } from "../../utils/string";
import { DynamicProperty } from "../DynamicProperty";
import SendMailIcon from "../icons/SendMailIcon";
import { Rewards } from "../Rewards";
import { UserInfoRow } from "../UserInfoRow";

const UserInfo = () => {
  const {
    current: { id },
  } = useAppSelector((state) => state.userInfo);
  const { page, limit } = useAppSelector((state) => state.usersPagination);
  const { applied } = useAppSelector((state) => state.filter);
  const { order, column } = useAppSelector((state) => state.usersSorting);
  const { search } = useAppSelector((state) => state.usersSearch);
  const { user, isLoading }: { user: User; isLoading: boolean } =
    useGetAllUsersQuery(
      {
        page: page.toString(),
        limit: limit.toString(),
        filter: encodeURIComponent(JSON.stringify(applied)),
        order: order.toString(),
        column: column.toString(),
        search,
      },
      {
        selectFromResult: ({ data, error, isLoading }) => ({
          user: data?.data.filter((u) => u["_id"] === id)[0],
          error,
          isLoading,
        }),
      }
    );

  const children = (attr: keyof User, propertyValue: string) => {
    console.log(attr, propertyValue);
    if (DateAttributes.includes(attr)) {
      return (
        <span className="text-slate-800">{formatDate(propertyValue)}</span>
      );
    } else if (attr == "email") {
      // TODO: fix magic strings -> enum or discriminant?
      return (
        <a
          href={`mailto:${propertyValue}?subject=Important!&body=Hi.`}
          target="_blank"
        >
          <SendMailIcon fill={"fill-blueExtend/50"} />
        </a>
      );
    } else if (
      attr == "responseRateWithDynamic" ||
      attr == "customerServiceWithDynamic"
    ) {
      return <DynamicProperty value={propertyValue} />;
    } else if (attr == "medals") {
      return <Rewards count={+propertyValue} />;
    } else {
      return <span className="text-slate-800">{propertyValue}</span>;
    }
  };
  if (isLoading || !user) return <h1>Loading</h1>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2 justify-center items-center">
      <div className="grid grid-cols-1 grid-rows-3 justify-center items-center py-4">
        <div className="row-span-2 rounded-full border w-28 h-28 shadow-lg relative overflow-hidden mr-auto ml-auto">
          <Image
            src={user.avatar}
            alt="avatar"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold">{user.name}</span>
          <span className="text-slate-400 text-sm">{user.characteristic}</span>
          <span className="text-slate-400 text-sm">
            {user.department} Department
          </span>
        </div>
      </div>
      {Object.keys(PersonalInformationStructure).map((title) => (
        <div className="grid grid-rows-6 gap-2 px-4 py-8" key={title}>
          <div className=" font-bold text-slate-400">{formatTitle(title)}</div>
          {PersonalInformationStructure[title].map((attr: keyof User) => (
            <UserInfoRow
              propertyName={attr}
              propertyValue={user[attr]}
              key={attr}
            >
              {children(attr, user[attr] as string)}
            </UserInfoRow>
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(UserInfo);
