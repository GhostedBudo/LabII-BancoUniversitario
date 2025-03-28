import React, { useState } from 'react'
import styles from './ValueCard.module.css'
const ValueCard = ({info}) => {

    const [isClosed, setIsClosed] = useState(true)

    const toggleDialog = (e) => {
        console.log('Clickeando...')
        e.preventDefault(); 
        const dialog = document.querySelector('#dialog');
        isClosed ? 
          dialog.style.display = 'none'
        : dialog.style.display = 'block'; 
       
        setIsClosed(!isClosed); 
    }

    return (
        <>
            <div
            onClick={toggleDialog}
             className={styles.box4} style={{ backgroundImage: 'url(' + info.backgroundUrl + ')' }}>
                <h2>{info.title}</h2>
                {/* <img src={currentItem.backgroundUrl} alt="imagen" /> */}
                <div id='dialog' className={styles.dialog}  onClick={toggleDialog}>
                    <p>
                        {info.content}
                    </p>
                </div>
            </div>
        </>
    )  
}

export default ValueCard