import styles from "./ValueCard.module.css";
const ValueCard = ({ info, isActive }) => {
  
  return (
    <>
      <li
        className={styles.cardBody}
      >
        <h2 className={styles.cardTitle}>{info.title}</h2>
        <div className={styles.cardContent}>
          <div
            className={styles.bg}
            
            style={{
              backgroundImage: "url(" + info.backgroundUrl + ")",
              backgroundSize: "cover",
              
            }}
          ></div>

            <div className={styles.text}>

            <p>{info.content}</p>
            </div>
         
        </div>
      </li>
    </>
  );
};

export default ValueCard;
