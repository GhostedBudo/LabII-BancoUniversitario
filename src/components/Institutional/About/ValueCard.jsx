import React, { useState, useEffect } from "react";
import styles from "./NewValueCard.module.css";
const ValueCard = ({ info, isActive }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(
    () => {
      setShouldAnimate(false)
      setIsVisible(false)
    }, [isActive]
  )
  const toggleDialog = (e) => {
    e.preventDefault();
    setShouldAnimate(true)
    // toggle
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div
        className={`${styles.cardBody} ${
          isActive ? styles.active : styles.inactive
        }`}
      >
        <h2 className={`${isActive ? styles.cardTitle  : styles.inactive}`}>{info.title}</h2>
        <div className={styles.cardContent}>
          <div
            className={styles.bg}
            onClick={toggleDialog}
            style={{
              backgroundImage: "url(" + info.backgroundUrl + ")",
              backgroundSize: "cover",
            }}
          ></div>

          <div
            id="dialog"
            className={`${styles.dialog} ${
              shouldAnimate // Only animate when active
                ? (isVisible ? styles.slideUp : styles.slideDown)
                : ''
            }`}
            onClick={toggleDialog}
          >
            <p>{info.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ValueCard;
