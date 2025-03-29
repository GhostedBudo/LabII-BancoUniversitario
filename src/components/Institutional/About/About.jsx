import styles from './About.module.css'
import { useState } from 'react'

import objetivoImage from '../../../assets/img/imagenEstudiantes.png'
import misionImage from '../../../assets/img/imgenGraduando.png'
import visionImage from '../../../assets/img/imagenCuenta.png'

import ValueCard from './ValueCard'

const About = () => {

    const mision = {
        title: 'Mision', 
        content: 'Somos una confiable institución financiera comprometida con los estudiantes universitarios, brindando soluciones financieras ágiles y eficientes. Nuestra misión es facilitar la gestión de sus recursos y contribuir al crecimiento económico y personal de nuestros clientes.', 
        backgroundUrl: misionImage
    }

    const vision = {
        title: 'Vision', 
        content: 'Queremos ser la principal opción financiera para estudiantes universitarios en el país. Deseamos ser reconocidos por nuestros servicios innovadores, la calidad de atención al cliente y nuestro compromiso con la educación y el desarrollo social.', 
        backgroundUrl: visionImage
    }

    const objetivos = {
        title: 'Objetivos', 
        content: 'Brindar a los universitarios un servicio eficiente y de calidad en la gestión de sus recursos financieros, a través de una banca digital. Mantener una cultura de innovación y mejora continua en nuestros procesos, productos y servicios.', 
        backgroundUrl: objetivoImage
    }

    const [currentItem, setCurrentItem] = useState(mision);

    const changeItem = (item) => {
        switch (item) {
            case 'Mision': setCurrentItem(mision); break; 
            case 'Vision': setCurrentItem(vision); break; 
            case 'Objetivos': setCurrentItem(objetivos); break; 
        }
    }

  return (
    <div className={styles.box1}> 
    {/* Primer contenedor */}
       
        <h1>Sobre Nosotros</h1>
        {/* Segundo contenedor */}
        <div className={styles.box2}> 
            {/* Tercer contenedor */}
            <nav className={styles.navbar}>
                <h2 onClick={() => { changeItem('Mision')  }}>Mision</h2>
                <h2 onClick={() => { changeItem('Vision')  }}>Vision</h2>
                <h2 onClick={() => { changeItem('Objetivos')  }}>Objetivos</h2>
            </nav>

            
            <ValueCard 
            key={currentItem.title}
            info={currentItem}/>

            
        </div>
    </div>
  )
}

export default About