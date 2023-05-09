import React, { FormEvent } from "react";
import styles from "./styles.module.css";
import SignUpButton from "../SignUpButton";

import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  secondName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const UserSchema: ZodType<FormData> = z
    .object({
      firstName: z
        .string()
        .min(2, "Name must be at least 2 characters long.")
        .max(25),
      secondName: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(25),
      email: z
        .string()
        .email({ message: "Please enter a valid email address." }),
      phoneNumber: z
        .string()
        .length(10, { message: "Phone number must be ten digits long." })
        .regex(/^\d{4}[- ]?\d{6}$/, {
          message: "Phone number must be in the following format: 07XXXXXXXX",
        }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." }),
      confirmPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });

  const submitData = (data: FormData) => {
    console.log("SUBMITTED", data);
    console.trace();
  };

  // const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState("");

  const handleButtonPress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("button pressed?");
    console.log(UserSchema.parse);
  };

  return (
    <form
      className={styles.signUpForm}
      onSubmit={handleSubmit(submitData)}
      // onSubmit={handleButtonPress}
    >
      <div className={`inputContainer ${styles.firstNameContainer}`}>
        <label className={styles.FirstName} htmlFor="">
          First Name
        </label>
        <input
          type="text"
          className={styles.firstName}
          {...register("firstName")}
        />
        {errors.firstName && (
          <span className={styles.textSmall}> {errors.firstName.message}</span>
        )}
      </div>

      <div className={`inputContainer ${styles.secondNameContainer}`}>
        <label className={styles.SecondName} htmlFor="">
          Second Name
        </label>
        <input
          type="text"
          className={styles.secondName}
          {...register("secondName")}
        />
        {errors.secondName && (
          <span className={styles.textSmall}> {errors.secondName.message}</span>
        )}
      </div>

      <div className={`inputContainer ${styles.emailContainer}`}>
        <label className={styles.Email} htmlFor="">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          className={styles.email}
          placeholder="john@you.com"
        />
        {errors.email && (
          <span className={styles.textSmall}> {errors.email.message}</span>
        )}
      </div>

      <div className={`inputContainer ${styles.phoneNumberContainer}`}>
        <label className={styles.PhoneNumber} htmlFor="">
          Phone Number
        </label>
        <input
          {...register("phoneNumber")}
          type="tel"
          className={styles.phoneNumber}
          placeholder="07XXXXXXXX"
        />
        {errors.phoneNumber && (
          <span className={styles.textSmall}>
            {" "}
            {errors.phoneNumber.message}
          </span>
        )}
      </div>

      <div className={`inputContainer ${styles.passwordContainer}`}>
        <label className={styles.Password} htmlFor="">
          Password
        </label>
        <input
          type="password"
          className={styles.password}
          {...register("password")}
        />
        {errors.password && (
          <span className={styles.textSmall}> {errors.password.message}</span>
        )}
      </div>

      <div className={`inputContainer ${styles.confirmPasswordContainer}`}>
        <label className={styles.ConfirmPassword} htmlFor="">
          Confirm Password
        </label>
        <input
          type="password"
          //           name="confirmPassword"
          //           'name' is specified more than once, so this usage will be overwritten.ts(2783)
          // SignUpForm.tsx(146, 11): This spread always overwrites this property.
          className={styles.confirmPassword}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className={styles.textSmall}>
            {" "}
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.signUpButton}>Create Account</button>
      </div>
    </form>
  );
};

export default SignUpForm;
