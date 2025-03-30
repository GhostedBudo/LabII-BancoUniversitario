import styles from "./About.module.css";
import { useState, useEffect } from "react";

import objetivoImage from "../../../assets/img/imagenEstudiantes.png";
import misionImage from "../../../assets/img/imgenGraduando.png";
import visionImage from "../../../assets/img/imagenCuenta.png";

import ValueCard from "./ValueCard";

const About = () => {
  const [currentItem, setCurrentItem] = useState('mision');
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const items = {
    mision: {
      title: "Mision",
      content:
        "Somos una confiable institución financiera comprometida con los estudiantes universitarios, brindando soluciones financieras ágiles y eficientes. Nuestra misión es facilitar la gestión de sus recursos y contribuir al crecimiento económico y personal de nuestros clientes.",
      backgroundUrl: misionImage,
    },

    vision: {
      title: "Vision",
      content:
        "Queremos ser la principal opción financiera para estudiantes universitarios en el país. Deseamos ser reconocidos por nuestros servicios innovadores, la calidad de atención al cliente y nuestro compromiso con la educación y el desarrollo social.",
      backgroundUrl: visionImage,
    },

    objetivos: {
      title: "Objetivos",
      content:
        "Brindar a los universitarios un servicio eficiente y de calidad en la gestión de sus recursos financieros, a través de una banca digital. Mantener una cultura de innovación y mejora continua en nuestros procesos, productos y servicios.",
      backgroundUrl: objetivoImage,
    },
  };


  return (
    <div className={styles.box1}>
      <h1>Sobre Nosotros</h1>

      <div className={styles.box2}>
        <nav className={styles.navbar}>
          {Object.keys(items).map((key) => (
            <h2
              key={key}
              onClick={() => setCurrentItem(key)}
            >
              {items[key].title}
            </h2>
          ))}
        </nav>

        <div className={styles.valueCardsContainer}>
          {/* Versión desktop: mostrar todas las tarjetas */}
          {!isMobile &&
            Object.entries(items).map(([key, item]) => (
              <ValueCard key={key} info={item} />
            ))}

          {/* Versión mobile: mostrar solo la tarjeta activa */}
          {isMobile && (
            <ValueCard
              key={currentItem}
              info={items[currentItem]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
