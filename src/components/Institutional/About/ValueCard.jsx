import React, { useState } from "react";
import styles from "./ValueCard.module.css";
const ValueCard = ({ info, isActive }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleDialog = (e) => {
    e.preventDefault();
    if (!hasInteracted) setHasInteracted(true);
    // toggle
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className={`${styles.box4} ${isActive ? styles.active : ""}`}>
        <div
          className={styles.bg}
          onClick={toggleDialog}
          style={{
            backgroundImage: "url(" + info.backgroundUrl + ")",
            backgroundSize: "cover",
          }}
        >
          <h2>{info.title}</h2>
        </div>

        <div
          id="dialog"
          className={`${styles.dialog} ${
            hasInteracted ? (isVisible ? styles.slideDown : styles.slideUp) : ""
          }`}
          onClick={toggleDialog}
        >
          <p>{info.content}</p>
        </div>
      </div>
    </>
  );
};

export default ValueCard;
