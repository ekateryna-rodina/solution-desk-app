import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useAppSelector } from "../../app/hooks";
import { FormInputProps, User } from "../../types";

const SelectFormInput = ({
  name,
  value,
  onChangeHandler,
  control,
}: FormInputProps<User>) => {
  const { properties } = useAppSelector((state) => state.filter);

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
  const options = properties[name].map((o) => ({ label: o, value: o }));
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur } }) => (
        <Select
          onChange={(obj) => {
            if (typeof onChangeHandler == "function") {
              onChangeHandler((obj as Record<"value" | "label", string>).value);
            }
            onChange((obj as Record<"value" | "label", string>).value);
          }}
          onBlur={onBlur}
          options={options}
          value={options.filter(
            (option: { value: string; label: string }) => option.label == value
          )}
          styles={customStyles}
          id={`${name}IdSelect`}
          instanceId={`${name}InstanceSelect`}
        />
      )}
    />
  );
};

export default SelectFormInput;
