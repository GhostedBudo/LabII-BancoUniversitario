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
        <div className={styles.box4}>
            <div className='bg'
            onClick={toggleDialog}
             style={{ backgroundImage: 'url(' + info.backgroundUrl + ')',
                backgroundSize: 'cover'
              }}>

                <h2>{info.title}</h2>
                
            </div>

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