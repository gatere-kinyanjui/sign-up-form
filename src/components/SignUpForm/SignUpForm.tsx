import React from "react";
import styles from "./styles.module.css";
import SignUpButton from "../SignUpButton";

const SignUpForm = () => {
  return (
    <form className={styles.signUpForm}>
      <div className={`inputContainer ${styles.firstNameContainer}`}>
        <label className={styles.FirstName} htmlFor="">
          First Name
        </label>
        <input
          type="text"
          name="first name"
          className={styles.firstName}
          id=""
        />
      </div>

      <div className={`inputContainer ${styles.secondNameContainer}`}>
        <label className={styles.SecondName} htmlFor="">
          Second Name
        </label>
        <input
          type="text"
          name="second name"
          className={styles.secondName}
          id=""
        />
      </div>

      <div className={`inputContainer ${styles.emailContainer}`}>
        <label className={styles.Email} htmlFor="">
          Email
        </label>
        <input type="email" name=" email" className={styles.email} id="" />
      </div>

      <div className={`inputContainer ${styles.phoneNumberContainer}`}>
        <label className={styles.PhoneNumber} htmlFor="">
          Phone Number
        </label>
        <input
          type="tel"
          name=" phoneNumber"
          className={styles.phoneNumber}
          id=""
        />
      </div>

      <div className={`inputContainer ${styles.passwordContainer}`}>
        <label className={styles.Password} htmlFor="">
          Password
        </label>
        <input
          type="password"
          name="password"
          className={styles.password}
          id=""
        />
      </div>

      <div className={`inputContainer ${styles.confirmPasswordContainer}`}>
        <label className={styles.ConfimrPassword} htmlFor="">
          Confirm Password
        </label>
        <input
          type="password"
          name="password"
          className={styles.confirmPassword}
          id=""
        />
      </div>

      <SignUpButton />
    </form>
  );
};

export default SignUpForm;
