import Image from "../../assets/odin-lined.png";
import styles from "./styles.module.css";

const ImageContainer = () => {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.logoContainer}>
        <img src={Image} alt="transparent odin logo" className={styles.logo} />
        <h3 className={styles.odinName}>ODIN</h3>
      </div>
    </div>
  );
};

export default ImageContainer;
