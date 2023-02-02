import React from "react";
import loader from './modules/assets/loading2.gif';
import styles from './modules/loading.module.css'

export const Loading = () =>{

return(<>

<div className={styles.loadingContainer}><img className={styles.loading} src={loader} alt='imagen no encontrada'></img><img className={styles.loading} src={loader} alt='imagen no encontrada'></img><img className={styles.loading} src={loader} alt='imagen no encontrada'></img></div>
</>)
}


