import React from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useAppSelector } from "../../app/hooks";
const AddNewUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    properties: { city, country, gender, department },
  } = useAppSelector((state) => state.filter);
  const cityOptions = city.map((c) => ({ value: c, label: c }));
  const countryOptions = country.map((c) => ({ value: c, label: c }));
  const genderOptions = gender.map((c) => ({ value: c, label: c }));
  const departmentOptions = department.map((c) => ({ value: c, label: c }));
  const onAddUserHandler = (data) => console.log(data);
  return (
    <form className="p-8" onSubmit={handleSubmit(onAddUserHandler)}>
      <h1>Add New User</h1>
      <label htmlFor="firstName">
        <span>First Name</span>
        <input
          {...register("firstName", { required: true })}
          className=""
          type="text"
          id="firstName"
          placeholder="First name"
          aria-label="First Name"
        />
      </label>
      {errors.firstName && <p>Please enter employee's first name.</p>}
      <label htmlFor="firstName">
        <span>Last Name</span>
        <input
          className=""
          type="text"
          id="lastName"
          {...register("lastName", { required: true })}
          placeholder="Last name"
          aria-label="Last Name"
        />
      </label>
      {errors.lastName && <p>Please enter employee's last name.</p>}
      <label htmlFor="characteristic">
        <span>Characteristic (role)</span>
        <input
          {...register("characteristic", { required: true })}
          className=""
          type="text"
          id="role"
          placeholder="Characteristic"
          aria-label="Characteristic"
        />
      </label>
      {errors.characteristic && <p>Please enter employee's role.</p>}
      <label htmlFor="department">
        <span>Department</span>

        <Select options={departmentOptions} />
      </label>
      <label htmlFor="gender">
        <span>Gender</span>
        <Select options={genderOptions} />
      </label>
      <label htmlFor="dob">
        <span>Date of birth</span>
        <input
          id="dob"
          {...register("dob", { required: true })}
          type="date"
        ></input>
      </label>
      <label htmlFor="employed">
        <span>Date of employment</span>
        <input
          id="employed"
          {...register("employed", { required: true })}
          type="date"
        ></input>
      </label>
      <label htmlFor="experience">
        <span>Experience</span>
        <input
          id="experience"
          {...register("experience", { required: true })}
          type="number"
        ></input>
      </label>
      {errors.experience && (
        <p>
          Please enter employee's experience prior to employment in the company.
        </p>
      )}
      <label htmlFor="phone">
        <span>Phone</span>
        <input
          type="text"
          {...register("phone", { required: true })}
          id="phone"
        />
      </label>
      {errors.phone && <p>Please enter employee's phone number.</p>}
      <label htmlFor="email">
        <span>Email</span>
        <input
          type="email"
          {...register("email", { required: true })}
          id="email"
        />
      </label>
      {errors.email && <p>Please enter employee's email.</p>}
      <label htmlFor="ipAddress">
        <span>IP Address</span>
        <input
          type="text"
          {...register("ipAddress", { required: true })}
          id="ipAddress"
        />
      </label>
      {errors.email && <p>Please enter employee's ip address.</p>}
      <label htmlFor="country">
        <span>Country</span>
        <Select options={countryOptions} />
      </label>
      <label htmlFor="city">
        <span>City</span>
        <Select options={cityOptions} />
      </label>
      <input type="submit" />
    </form>
  );
};
export default AddNewUser;
