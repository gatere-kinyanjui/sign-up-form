import React, { FormEvent, useState } from "react";
import styles from "./styles.module.css";
import SignUpButton from "../SignUpButton";

import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import firebase from "../../firebase_services/Firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

type FormData = {
  firstName: string;
  secondName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  // Defining the UserSchema object with Zod.
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

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    secondName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // Defining the form submission handler.
  // const submitData = (data: FormData) => {
  //   console.log("SUBMITTED", data);
  //   setFormData({
  //     firstName: "",
  //     secondName: "",
  //     email: "",
  //     phoneNumber: "",
  //     password: "",
  //     confirmPassword: "",
  //   });
  // };

  //Redefingin form submission handler for firebase integration
  const submitData = async (data: FormData) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      console.log("New user created.", user);
      setFormData({
        firstName: "",
        secondName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
    } catch (signUpError) {
      console.error("Error occurred during sign-up:", signUpError);
    }

    try {
      const firestore = getFirestore(firebase);
      const collectionRef = collection(firestore, "users");
      await addDoc(collectionRef, data);
      console.log("Data stored in Firebase Firestore.");
      setFormData({
        firstName: "",
        secondName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error occurred while submitting form data:", error);
    }
  };

  // User sign-up
  // const signUpUser = async (data: FormData) => {
  //   try {
  //     const auth = getAuth();
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       data.email,
  //       data.password
  //     );
  //     const user = userCredential.user;
  //     console.log("New user created.", user);
  //   } catch (signUpError) {
  //     console.error("Error occurred during sign-up:", signUpError);
  //   }
  // };

  // Defining the form element and its input elements.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });

  return (
    <form className={styles.signUpForm} onSubmit={handleSubmit(submitData)}>
      <div className={`inputContainer ${styles.firstNameContainer}`}>
        <label className={styles.FirstName} htmlFor="">
          First Name
        </label>
        <input
          type="text"
          className={styles.firstName}
          {...register("firstName", { required: true })}
          placeholder="John"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
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
          placeholder="You"
          value={formData.secondName}
          onChange={(e) =>
            setFormData({ ...formData, secondName: e.target.value })
          }
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
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          placeholder="0712345678"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />
        {errors.phoneNumber && (
          <span className={styles.textSmall}>{errors.phoneNumber.message}</span>
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
          placeholder="********"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
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
          className={styles.confirmPassword}
          {...register("confirmPassword")}
          placeholder="********"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        {errors.confirmPassword && (
          <span className={styles.textSmall}>
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
