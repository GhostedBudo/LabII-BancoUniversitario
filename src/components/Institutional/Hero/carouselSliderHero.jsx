import React, { useState, useEffect } from "react";
import "./CarouselSliderHero.css";
import Woman from "../../../assets/img/mujer-plano-medio-trabajando-agencia-viajes_52683-136430.jpg";
import Graduates from "../../../assets/img/grupo-diversos-graduados-tirando-gorras-cielo_53876-56031.jpg";
import Bank from "../../../assets/img/gente-retira-dinero-usando-maquina_53876-15925.jpg";


const CarouselSliderHero = () => {
    
  // Datos del carrusel (imágenes y textos)
  const slides = [
    {
      id: 1,
      image: Woman,
      title: "Comprometidos con tus finanzas",
      description: "Ahora puedes acceder y administrar todas tus transacciones desde un solo lugar.",
    },
    {
      id: 2,
      image: Graduates,
      title: "Becas Universitarias",
      description: "Elimina las barreras financieras y enfocate en  tu crecimiento y aprendizaje.Aprovecha esta oportunidad para explorar nuevas fronteras y construir el futuro que deseas.",
    },
    {
      id: 3,
      image: Bank,
      title: "Retiro de fondos",
      description: "Accede a tu mundo sin límites: retira efectivo de forma rápida y segura y aprovecha cada oportunidad que la vida universitaria te ofrece",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Cambio automático de slide cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="carousel-container">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-content">
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarouselSliderHero;