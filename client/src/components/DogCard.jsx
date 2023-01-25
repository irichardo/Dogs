import React from "react";
import style from './modules/dogcard.module.css'
import { Link } from "react-router-dom";

export const DogCard =({name, height,image, temperament,id})=>{
    //jsx, ¿Que es jsx?, Antes tu tenias que poner la información
    // uno por uno , Ahora con jsx, puedes hacer que css reciba variables.
    return(
        <>
        
        
        <div>
        <Link to={`/dogdetail/${id}`}><img className={style.img} src={image} alt = "Imagen no encontrada"></img></Link>
        <div>{name}</div>
        { height.length === 2?
          <div>{`Altura: de ${height[0]}cm a ${height[1]}cm`}</div>
        : <div>{`Altura: de ${height[0]}cm`}</div>
        }
        <div>{`Comportamientos: ${temperament}`}</div>
        </div>
        
        
        </>
    )




} 

export default DogCard;