import React, { useState, useEffect } from "react";
import styles from "./carouselSliderHero.module.css";
import Woman from "../../../assets/img/mujer-plano-medio-trabajando-agencia-viajes_52683-136430.jpg";
import Graduates from "../../../assets/img/grupo-diversos-graduados-tirando-gorras-cielo_53876-56031.jpg";
import Bank from "../../../assets/img/gente-retira-dinero-usando-maquina_53876-15925.jpg";

const CarouselSliderHero = () => {
  const slides = [
    {
      id: 1,
      image: Woman,
      title: "Comprometidos con tus\n finanzas",
      description: "Ahora puedes acceder\n y administrar todas\n tus transacciones \ndesde un solo lugar.",
    },
    {
      id: 2,
      image: Graduates,
      title: "Becas\nUniversitarias",
      description: "Elimina las barreras financieras y enfocate en  tu crecimiento y aprendizaje. \n\nAprovecha esta oportunidad para explorar nuevas fronteras y construir el futuro que deseas.",
    },
    {
      id: 3,
      image: Bank,
      title: "Retiro de\n fondos",
      description: "Accede a tu mundo sin límites: retira efectivo de forma rápida y segura y aprovecha cada oportunidad que la vida universitaria te ofrece",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div id="home" className={styles["carousel-container"]}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ""}`}
          style={{ 
            backgroundImage: `linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(8,95,99,1) 110%), url(${slide.image})`,
            backgroundSize: "cover",
          }}
        >
          <div className={styles["slide-content"]}>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarouselSliderHero;