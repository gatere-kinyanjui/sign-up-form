import React from "react";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <p className={styles.intro}>
        This is <strong>not</strong> a real online service! You know you need
        something like this in your life to help you realize your deepest
        dreams. Sign up now to get started. You <i>know</i> you want to.
      </p>
    </div>
  );
};

export default Header;
