import React from "react";
import styles from "./styles.module.css";

const ButtonContainer = () => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.signUpButton} type="submit">
        Create Account
      </button>
    </div>
  );
};

export default ButtonContainer;
