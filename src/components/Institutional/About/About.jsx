import styles from "./About.module.css";
import { useState, useRef, useEffect } from "react";

import objetivoImage from "../../../assets/img/imagenEstudiantes.png";
import misionImage from "../../../assets/img/imgenGraduando.png";
import visionImage from "../../../assets/img/imagenCuenta.png";

import ValueCard from "./ValueCard";

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

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

  const itemsList = items.map((i, index) => (
    <ValueCard isActive={activeIndex === index} key={i.title} info={i} />
  ));

  // Update scroll position when activeIndex changes
  useEffect(() => {
    if (containerRef.current) {
      const scrollPosition = activeIndex * containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const handleScroll = (direction) => {
    const newIndex = activeIndex + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    setActiveIndex(newIndex);
  };

  // Direct navigation with dots
  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div   className={styles.primaryContainer}>
      <h1 id="about" className={styles.sobreNosotros}>Sobre Nosotros</h1>

      <div className={styles.bg}>
        <div className={styles.slider}>
          <div className={styles.cards} ref={containerRef}>
            {itemsList}
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.arrowleft}
              onClick={() => handleScroll(-1)}
              disabled={activeIndex === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              className={styles.arrowright}
              onClick={() => handleScroll(1)}
              disabled={activeIndex === items.length - 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.sliderDots}>
          {items.map((_, index) => (
            <input
              key={index}
              type="radio"
              name="aboutItems"
              id={`radio${items[index].title}`}
              onClick={() => goToSlide(index)}
              checked={activeIndex === index}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;