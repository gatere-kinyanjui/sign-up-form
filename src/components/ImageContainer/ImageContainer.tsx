import React from "react";
import Image from "../../assets/odin-lined.png";
import BackgroundImage from "../../assets/sign-up-form-background.jpg";
import "./ImageContainer.css";

const ImageContainer = () => {
  return (
    <div className="imageContainer">
      <div className="logoContainer">
        <img src={Image} alt="transparent odin logo" className="logo" />
        <h3 className="odinName">ODIN</h3>
      </div>
    </div>
  );
};

export default ImageContainer;
