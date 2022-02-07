import React from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useAppSelector } from "../../app/hooks";
import { useCreateUserMutation } from "../../app/solutionDeskApi";
import { User } from "../../types";
import styles from "./AddNewUser.module.css";
const AddNewUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    properties: { city, country, gender, department },
  } = useAppSelector((state) => state.filter);
  const [addUser, { status, error, data }] = useCreateUserMutation();
  const cityOptions = city.map((c) => ({ value: c, label: c }));
  const countryOptions = country.map((c) => ({ value: c, label: c }));
  const genderOptions = gender.map((c) => ({ value: c, label: c }));
  const departmentOptions = department.map((c) => ({ value: c, label: c }));
  const onAddUserHandler = (userData: Partial<User>) => {
    addUser(userData);
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
  return (
    <form
      className="p-8 h-full overflow-auto"
      onSubmit={handleSubmit(onAddUserHandler)}
    >
      <h1 className="text-slate-700 text-lg font-bold">Add New User</h1>
      {error ?? <div>{"jiio"}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <label htmlFor="firstName">
          <span className="block">First Name</span>
          <input
            {...register("firstName", { required: true })}
            className={styles.formInput}
            type="text"
            id="firstName"
            placeholder="First name"
            aria-label="First Name"
          />
          {errors.firstName && (
            <p className={`${styles.validationError}`}>
              Please enter employee's first name.
            </p>
          )}
        </label>

        <label htmlFor="firstName">
          <span className="block">Last Name</span>
          <input
            className={styles.formInput}
            type="text"
            id="lastName"
            {...register("lastName", { required: true })}
            placeholder="Last name"
            aria-label="Last Name"
          />
          {errors.lastName && (
            <p className={`${styles.validationError}`}>
              Please enter employee's last name.
            </p>
          )}
        </label>

        <label className="col-span-full" htmlFor="characteristic">
          <span className="block">Characteristic (role)</span>
          <input
            {...register("characteristic", { required: true })}
            className={styles.formInput}
            type="text"
            id="role"
            placeholder="Characteristic"
            aria-label="Characteristic"
          />
          {errors.characteristic && (
            <p className={`${styles.validationError}`}>
              Please enter employee's role.
            </p>
          )}
        </label>

        <label htmlFor="department">
          <span>Department</span>

          <Select styles={customStyles} options={departmentOptions} />
        </label>
        <label htmlFor="gender">
          <span>Gender</span>
          <Select options={genderOptions} />
        </label>
        <label htmlFor="dob">
          <span className="block">Date of birth</span>
          <input
            id="dob"
            className={styles.formInput}
            {...register("dob", { required: true })}
            type="date"
          ></input>
          {errors.email && (
            <p className={`${styles.validationError}`}>
              Please enter employee's date of birth.
            </p>
          )}
        </label>
        <label htmlFor="employed">
          <span className="block">Date of employment</span>
          <input
            id="employed"
            className={styles.formInput}
            {...register("employed", { required: true })}
            type="date"
          ></input>
          {errors.email && (
            <p className={`${styles.validationError}`}>
              Please enter employment date.
            </p>
          )}
        </label>
        <label htmlFor="experience">
          <span className="block">Experience</span>
          <input
            className={styles.formInput}
            id="experience"
            {...register("experience", { required: true })}
            type="number"
            min="0"
          ></input>
          {errors.experience && (
            <p className={`${styles.validationError}`}>
              Please enter employee's experience prior to employment in the
              company.
            </p>
          )}
        </label>

        <label htmlFor="phone">
          <span className="block">Phone</span>
          <input
            className={styles.formInput}
            type="text"
            {...register("phone", { required: true })}
            id="phone"
          />
          {errors.phone && (
            <p className={`${styles.validationError}`}>
              Please enter employee's phone number.
            </p>
          )}
        </label>

        <label htmlFor="email">
          <span className="block">Email</span>
          <input
            className={styles.formInput}
            type="email"
            {...register("email", { required: true })}
            id="email"
          />
          {errors.email && (
            <p className={`${styles.validationError}`}>
              Please enter employee's email.
            </p>
          )}
        </label>

        <label htmlFor="ipAddress">
          <span className="block">IP Address</span>
          <input
            className={styles.formInput}
            type="text"
            {...register("ipAddress", { required: true })}
            id="ipAddress"
          />
          {errors.email && (
            <p className={`${styles.validationError}`}>
              Please enter employee's ip address.
            </p>
          )}
        </label>

        <label htmlFor="country">
          <span>Country</span>
          <Select options={countryOptions} />
        </label>
        <label htmlFor="city">
          <span>City</span>
          <Select options={cityOptions} />
        </label>
        <div className="col-span-full flex justify-end gap-2">
          <button className={`${styles.btn} ${styles.btnSecondary}`}>
            Cancel
          </button>
          <input
            className={`${styles.btn} ${styles.btnPrimary}`}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};
export default AddNewUser;
