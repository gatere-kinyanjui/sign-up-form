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
  phoneNumber: number;
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
      phoneNumber: z.number(),
      // .lte(10, { message: "Please use this format; '07XX XXXXXX'." })
      // .gte(10, { message: "Please use this format; '07XX XXXXXX'." }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." }),
      confirmPassword: z.string().min(8),
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
    console.log(UserSchema.parse(data));
    console.log("button pressed");
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
        {errors.firstName && <span> {errors.firstName.message}</span>}
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
        {errors.secondName && <span> {errors.secondName.message}</span>}
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
        {errors.email && <span> {errors.email.message}</span>}
      </div>

      <div className={`inputContainer ${styles.phoneNumberContainer}`}>
        <label className={styles.PhoneNumber} htmlFor="">
          Phone Number
        </label>
        <input
          {...register("phoneNumber", { valueAsNumber: true })}
          type="tel"
          className={styles.phoneNumber}
          placeholder="07XX-XXXXXX"
        />
        {errors.phoneNumber && <span> {errors.phoneNumber.message}</span>}
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
        {errors.password && <span> {errors.password.message}</span>}
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
          <span> {errors.confirmPassword.message}</span>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.signUpButton}>Create Account</button>
      </div>
    </form>
  );
};

export default SignUpForm;
