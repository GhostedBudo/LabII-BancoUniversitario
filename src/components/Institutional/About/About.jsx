import React, { useEffect } from 'react'
import styles from './About.module.css'
import { useState } from 'react'

import objetivoImage from '../../../assets/img/imagenEstudiantes.png'
import misionImage from '../../../assets/img/imgenGraduando.png'
import visionImage from '../../../assets/img/imagenCuenta.png'


const About = () => {

    const mision = {
        title: 'Mision', 
        content: '...', 
        backgroundUrl: misionImage
    }

    const vision = {
        title: 'Vision', 
        content: '...', 
        backgroundUrl: visionImage
    }

    const objetivos = {
        title: 'Objetivos', 
        content: '...', 
        backgroundUrl: objetivoImage
    }

    const [currentItem, setCurrentItem] = useState(vision);

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

            {/* Cuarto contenedor */}
            <div className={styles.box4} style={{backgroundImage: 'url(' + currentItem.backgroundUrl + ')' }}>
                <h2>{currentItem.title}</h2>
                {/* <img src={currentItem.backgroundUrl} alt="imagen" /> */}
            </div>

            <div></div>
        </div>
    </div>
  )
}

export default About