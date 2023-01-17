import axios from 'axios';
import { GET_BREED } from './index';

export const getBreed = () =>{
    return async function(dispatch){
    try{
      const res = await axios('http://localhost:3001/dogs');//Llamo a la api local
      if(res){
      return dispatch({
            type: GET_BREED, //Nombro el tipo de action que voy a usar
            payload: res.data //Envio un payload con toda la data recogida de esa accion.
      })}
    }
    
    catch(error){//Catch que atrapara el error y me lo mostrara en un console.log
       console.log(error);
    }

    }};