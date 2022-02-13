import moment from "moment";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editUserInfo } from "../../features/userInfo/userInfo-slice";
import { User } from "../../types";
import { formatDate } from "../../utils/string";
import { DynamicProperty } from "../DynamicProperty";
import SendMailIcon from "../icons/SendMailIcon";
import { Rewards } from "../Rewards";
import styles from "./PropertyTypeEditableWise.module.css";

type PropertyTypeEditableWiseProps = {
  property: {
    __typename: string;
    name: keyof User;
    isEditable: boolean;
    value: string | number | Date;
  };
};

const PropertyTypeEditableWise = ({
  property,
}: PropertyTypeEditableWiseProps) => {
  const { value, name } = property;
  const { isEditMode } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const onEditHandler = (value: number | string | Date) => {
    dispatch(editUserInfo({ name, value }));
  };
  const render = () => {
    const dataTypeMap = {
      date: () => {
        return isEditMode && property.isEditable ? (
          <input
            type="date"
            className={styles.formInput}
            value={moment(value).format("YYYY-MM-DD")}
            onChange={(e) => onEditHandler(e.currentTarget.value)}
          />
        ) : (
          <span className="text-slate-800">
            {formatDate(value as string | Date)}
          </span>
        );
      },
      email: () => {
        return isEditMode && property.isEditable ? (
          <input
            type="email"
            className={styles.formInput}
            value={value as string}
            onChange={(e) => onEditHandler(e.currentTarget.value)}
          />
        ) : (
          <a
            href={`mailto:${value}?subject=Important!&body=Hi.`}
            target="_blank"
          >
            <SendMailIcon fill={"fill-blueExtend/50"} />
          </a>
        );
      },
      dynamic: () => <DynamicProperty value={value as string} />,
      multipleIcons: () => {
        return isEditMode && property.isEditable ? (
          <input
            type="number"
            className={styles.formInput}
            value={value as string}
            onChange={(e) => onEditHandler(e.currentTarget.value)}
          />
        ) : (
          <Rewards count={+value} />
        );
      },
      string: () => {
        return isEditMode && property.isEditable ? (
          <input
            className={styles.formInput}
            type="text"
            value={value as string}
            onChange={(e) => onEditHandler(e.currentTarget.value)}
          />
        ) : (
          <span className="text-slate-800">{value}</span>
        );
      },
      number: () => {
        return isEditMode && property.isEditable ? (
          <input
            type="number"
            className={styles.formInput}
            value={value as string}
            onChange={(e) => onEditHandler(e.currentTarget.value)}
          />
        ) : (
          <span className="text-slate-800">{value}</span>
        );
      },
    };
    return dataTypeMap[property.__typename]();
  };
  return <>{render()}</>;
};

export default PropertyTypeEditableWise;
