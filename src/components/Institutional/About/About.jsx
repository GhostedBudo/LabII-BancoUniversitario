import styles from "./NewAbout.module.css";
import { useState } from "react";

import objetivoImage from "../../../assets/img/imagenEstudiantes.png";
import misionImage from "../../../assets/img/imgenGraduando.png";
import visionImage from "../../../assets/img/imagenCuenta.png";

import ValueCard from "./ValueCard";
import ChevronLeft from "./chevron/ChevronLeft";
import ChevronRight from "./chevron/ChevronRight";

const About = () => {
  const [currentItem, setCurrentItem] = useState("Mision");
  const items = [
    {
      title: "Mision",
      content:
        "Somos una confiable institución financiera comprometida con los estudiantes universitarios, brindando soluciones financieras ágiles y eficientes. Nuestra misión es facilitar la gestión de sus recursos y contribuir al crecimiento económico y personal de nuestros clientes.",
      backgroundUrl: misionImage,
    },

    {
      title: "Vision",
      content:
        "Queremos ser la principal opción financiera para estudiantes universitarios en el país. Deseamos ser reconocidos por nuestros servicios innovadores, la calidad de atención al cliente y nuestro compromiso con la educación y el desarrollo social.",
      backgroundUrl: visionImage,
    },

    {
      title: "Objetivos",
      content:
        "Brindar a los universitarios un servicio eficiente y de calidad en la gestión de sus recursos financieros, a través de una banca digital. Mantener una cultura de innovación y mejora continua en nuestros procesos, productos y servicios.",
      backgroundUrl: objetivoImage,
    },
  ];

  const itemsList = items.map((i) => (
    <ValueCard isActive={currentItem === i.title} key={i.title} info={i} />
  ));

  

  return (
    <div className={styles.primaryContainer}>
      <h1 className={styles.sobreNosotros}>Sobre Nosotros</h1>

      <div className={styles.bg}>
        <div className={styles.slider}>
          <ChevronLeft
            color={"black"}
            hidden={currentItem == "Mision"}
            
          />
          <div className={styles.cards}>{itemsList}</div>
          <ChevronRight color={"black"}  />
        </div>

        <div className={styles.sliderDots}>
          <input
            type="radio"
            name="aboutItems" // Unique name for the group
            id="radioMision"
            onClick={() => setCurrentItem("Mision")}
            checked={currentItem === "Mision"} // Add checked property
          />
          <input
            type="radio"
            name="aboutItems" // Unique name for the group
            id="radioVision"
            onClick={() => setCurrentItem("Vision")}
            checked={currentItem === "Vision"} // Add checked property
          />
          <input
            type="radio"
            name="aboutItems" // Unique name for the group
            id="radioObjetivos"
            onClick={() => setCurrentItem("Objetivos")}
            checked={currentItem === "Objetivos"} // Add checked property
          />
        </div>
      </div>
    </div>
  );
};

export default About;
