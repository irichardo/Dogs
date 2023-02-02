import React from "react";
import { Link } from "react-router-dom";
import styles from './modules/landingPage.module.css';


const LandingPage = () => {




    
 
    return(
    <>  
        <div className={styles.background}>
         <div>

            <div className={styles.contentTittle}>
            <h1 className={styles.titulo}>DOGS</h1>
            </div>
        <div className="contenedor">
        <div className="items"><div className={styles.content}>
            <h2 className={styles.buttonTittle}><Link to='/home'>Empecemos!</Link></h2>
            </div></div>
        </div>
         </div>
        </div>
    </>
 );


};

export default LandingPage;