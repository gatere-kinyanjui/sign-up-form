import React from "react";
import styles from "./styles.module.css";

const SignUpButton = () => {
  const handleSubmit = () => {
    console.log("button pressed?");
  };

  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.signUpButton}
        type="submit"
        onClick={handleSubmit}
      >
        Create Account
      </button>
    </div>
  );
};

export default SignUpButton;
