import moment from "moment";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editUserInfo } from "../../features/userInfo/userInfo-slice";
import { PropertyTypes, User } from "../../types";
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

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "white" : "rgb(30 41 59)",
    background: state.isSelected
      ? "#020D92"
      : state.isFocused
      ? "#020D9237"
      : "white",
  }),
  control: (provided: any, state: any) => {
    const borderRadius = ".3rem";
    const fontSize = "1rem";
    const borderColor = "rgb(203 213 225)";
    return {
      ...provided,
      borderRadius,
      fontSize,
      color: borderColor,
      borderColor,
    };
  },
  noOptionsMessage: (provided: any, state: any) => {
    const color = "rgb(30 41 59)";
    return { ...provided, color };
  },
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const color = "rgb(30 41 59)";

    return { ...provided, opacity, transition, color };
  },
  dropdownIndicator: (provided: any, state: any) => {
    const color = "rgb(203 213 225)";
    const zIndex = 2000;
    return { ...provided, color, zIndex };
  },
  indicatorSeparator: (provided: any, state: any) => {
    const display = "none";
    return { ...provided, display };
  },
};

const PropertyTypeEditableWise = ({
  property,
}: PropertyTypeEditableWiseProps) => {
  const { value, name } = property;
  const { isEditMode } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.filter);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onEditHandler = (value: number | string | Date) => {
    dispatch(editUserInfo({ name, value }));
  };

  const render = () => {
    const dataTypeMap: Record<PropertyTypes, any> = {
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
      select: () => {
        const options = properties[name].map((c) => ({ value: c, label: c }));
        return isEditMode && property.isEditable ? (
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur } }) => (
              <Select
                onChange={(obj) => {
                  // change the state in the store
                  onEditHandler(
                    (obj as Record<"value" | "label", string>).value
                  );
                  //  change useForm state
                  return onChange(
                    (obj as Record<"value" | "label", string>).value
                  );
                }}
                onBlur={onBlur}
                options={options}
                value={options.filter(
                  (option: { value: string; label: string }) =>
                    option.label == value
                )}
                styles={customStyles}
                id={`${name}IdSelect`}
                instanceId={`${name}InstanceSelect`}
              />
            )}
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
