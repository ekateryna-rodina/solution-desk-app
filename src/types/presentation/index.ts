import { Control, FieldValues } from "react-hook-form/dist/types";

export type IconProps = {
  fill?: string;
  stroke?: string;
};

export type FormInputProps<T> = {
  name: keyof T;
  control: Control<FieldValues, object>;
  value?: number | string | Date;
  onChangeHandler?: (val: number | string | Date) => void;
};
