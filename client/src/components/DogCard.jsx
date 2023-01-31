import React from "react";
import style from './modules/dogcard.module.css'
import { Link } from "react-router-dom";

export const DogCard = ({ name, height, image, temperament, id }) => {
    //jsx, ¿Que es jsx?, Antes tu tenias que poner la información
    // uno por uno , Ahora con jsx, puedes hacer que css y trabajar con JS reciba variables.


    return (
        <>

            <div key={name} className={style.Cardcontainer}>


                <Link to={`/dogdetail/${id}`}><img className={style.imgDog} src={image} alt="Imagen no encontrada"></img></Link>



                <div className={style.nameFont}>{name}</div>


                {



                    height.length === 2 ? <div>{`Altura: de ${height[0]}cm a ${height[1]}cm`}</div>
                        : <div>{`Altura: de ${height[0]}cm`}</div>


                }

                Comportamientos:<br /><div className={style.comportamiento}>{`${temperament[0].name && temperament[0].name.split(',').length < 1?
                                                                                temperament[0].name.join('-') 
                                                                               :temperament.join('-').split('-').length>3&&!temperament[0].name?`${temperament[0]}-${temperament[1]}-${temperament[2]}...`
                                                                               :temperament[0].name?temperament.map(a=>a.name).join(','):temperament}`//Perros DB
                                                                            }</div>
            

            </div>

  
        </>


    )


//     temperament[0].name.join('-') 
// :   temperament.join('-')}`
 
}

// temperament[0].name && temperament[0].name.split(',').length < 1?
//   temperament[0].name.join('-') :
//   (temperament[0].name.split(',').length >= 3 ? 
//     temperament[0].name.split(',').slice(0, 3).join(',') + '...' : 
//     temperament.join('-')
//   )

export default DogCard;