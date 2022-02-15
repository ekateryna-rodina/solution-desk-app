import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useCreateUserMutation } from "../../app/solutionDeskApi";
import { toggleAddNewUser } from "../../features/addNewUser/addNewUser-slice";
import { User } from "../../types";
import { FileUploader } from "../FileUploader";
import { DateFormInput, TextFormInput } from "../FormInput";
import EmailFormInput from "../FormInput/Email/EmailFormInput";
import NumberFormInput from "../FormInput/Number/NumberFormInput";
import { SelectFormInput } from "../SelectFormInput";
import styles from "./AddNewUser.module.css";

const AddNewUser = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const {
    properties: { city, country, gender, department },
  } = useAppSelector((state) => state.filter);
  const [addUser, { status, error, data }] = useCreateUserMutation();
  const [file, setFile] = useState<File | null>(null);
  const [noFileError, setNoFileError] = useState(false);
  const dispatch = useAppDispatch();
  const dropFileHandler = (file: File | null) => {
    setFile(file);
  };

  const submitFileToStorage = async () => {
    if (file?.name) {
      const [cloudName, uploadPreset] = [
        process.env.CLOUD_NAME ?? "",
        process.env.UPLOAD_PRESET ?? "",
      ];
      if (!cloudName || !uploadPreset) return;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        return response.data.public_id;
      } catch (error) {
        return null;
      }
    }
  };
  const onAddUserHandler = async (userData: Partial<User>) => {
    if (!file) {
      setNoFileError(true);
      return;
    }

    const imageId = await submitFileToStorage();
    if (!imageId) {
      setNoFileError(true);
    }
    addUser({ ...userData, avatar: imageId });
  };
  const closeAddNewUser = (e) => {
    e.preventDefault();
    dispatch(toggleAddNewUser());
  };

  useEffect(() => {
    if (file) {
      setNoFileError(false);
    }
  }, [file]);
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <form
      className="p-8 h-full overflow-auto"
      onSubmit={handleSubmit(onAddUserHandler)}
    >
      <h1 className="text-slate-700 text-lg font-bold">Add New User</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <label htmlFor="firstName">
          <span className="block">First Name</span>
          <TextFormInput
            id="firstName"
            label="First Name"
            required={true}
            validated={register}
          />

          {errors.firstName && (
            <p className={`${styles.validationError}`}>
              Please enter employee's first name.
            </p>
          )}
        </label>
        <label htmlFor="lastName">
          <span className="block">Last Name</span>
          <TextFormInput
            id="lastName"
            label="Last Name"
            required={true}
            validated={register}
          />
          {errors.lastName && (
            <p className={`${styles.validationError}`}>
              Please enter employee's last name.
            </p>
          )}
        </label>
        <div className="col-span-full">
          <FileUploader
            setFile={dropFileHandler}
            file={file}
            error={noFileError}
          />
        </div>
        <label className="col-span-full" htmlFor="characteristic">
          <span className="block">Characteristic (role)</span>
          <TextFormInput
            id="characteristic"
            label="Characteristic"
            required={true}
            validated={register}
          />
          {errors.characteristic && (
            <p className={`${styles.validationError}`}>
              Please enter employee's role.
            </p>
          )}
        </label>
        <label htmlFor="department">
          <span>Department</span>
          <SelectFormInput name="department" control={control} />
          {errors.department && (
            <p className={`${styles.validationError}`}>
              Please enter employee's department.
            </p>
          )}
        </label>
        <label htmlFor="gender">
          <span>Gender</span>
          <SelectFormInput name="gender" control={control} />
          {errors.gender && (
            <p className={`${styles.validationError}`}>
              Please enter employee's gender.
            </p>
          )}
        </label>
        <label htmlFor="dob">
          <span className="block">Date of birth</span>
          <DateFormInput
            id="dob"
            label="Date of birth"
            required={true}
            validated={register}
          />
          {errors.email && (
            <p className={`${styles.validationError}`}>
              Please enter employee's date of birth.
            </p>
          )}
        </label>
        <label htmlFor="employed">
          <span className="block">Date of employment</span>
          <DateFormInput
            id="employed"
            label="Employment date"
            required={true}
            validated={register}
          />
          {errors.email && (
            <p className={`${styles.validationError}`}>
              Please enter employment date.
            </p>
          )}
        </label>
        <label htmlFor="experience">
          <span className="block">Experience</span>
          <NumberFormInput
            id="experience"
            label="Experience"
            validated={register}
            required={true}
            min={0}
          />
          {errors.experience && (
            <p className={`${styles.validationError}`}>
              Please enter employee's experience prior to employment in the
              company.
            </p>
          )}
        </label>
        <label htmlFor="phone">
          <span className="block">Phone</span>
          <TextFormInput
            id="phone"
            label="Phone"
            required={true}
            validated={register}
            pattern={{
              value:
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              message: "Invalid Phone Number",
            }}
          />
          {errors.phone && (
            <p className={`${styles.validationError}`}>
              {"Please enter valid employee's phone number."}
            </p>
          )}
        </label>
        <label htmlFor="email">
          <span className="block">Email</span>
          <EmailFormInput
            id="email"
            label="Email"
            validated={register}
            required={true}
          />
          {errors.email && (
            <p className={`${styles.validationError}`}>
              Please enter employee's email.
            </p>
          )}
        </label>

        <label htmlFor="ipAddress">
          <span className="block">IP Address</span>
          <TextFormInput
            id="ipAddress"
            label="IP Address"
            required={true}
            validated={register}
            pattern={{
              value:
                /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)(?:\:(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/,
              message: "invalid IP address",
            }}
          />
          {errors.ipAddress && (
            <p className={`${styles.validationError}`}>
              Please enter valid employee's ip address.
            </p>
          )}
        </label>
        <label htmlFor="country">
          <span>Country</span>
          <SelectFormInput name="country" control={control} />
          {errors.country && (
            <p className={`${styles.validationError}`}>
              Please enter employee's country.
            </p>
          )}
        </label>
        <label htmlFor="city">
          <span>City</span>
          <SelectFormInput name="city" control={control} />
          {errors.city && (
            <p className={`${styles.validationError}`}>
              Please enter employee's city.
            </p>
          )}
        </label>
        <div className="col-span-full flex justify-end gap-2">
          <button
            onClick={closeAddNewUser}
            className={`${styles.btn} ${styles.btnSecondary}`}
          >
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
