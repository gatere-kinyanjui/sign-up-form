import React from "react";
import styles from "./styles.module.css";

const LogIn = () => {
  return (
    <div className={styles.logInContainer}>
      <p>Already have an account?</p>
      <a href="#" className={styles.logInLink}>
        Log In
      </a>
    </div>
  );
};

export default LogIn;
