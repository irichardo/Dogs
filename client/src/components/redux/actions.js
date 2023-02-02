import axios from 'axios';
import { GET_BREED, SEARCH_DOG, DOG_DETAIL, SORT_BY_NAME, SORT_BY_WEIGHT, GET_TEMPERAMENTS, GET_FILTER_BY_TEMPS} from './index';

export const getBreed = (payload) =>{
    return async function(dispatch){

      console.log(payload);
    let res = '';
    try{

      res = await axios('http://localhost:3001/dogs');//Llamo a la api local
      if(!payload){
        return dispatch({
          type: GET_BREED, //Nombro el tipo de action que voy a usar
          payload: res.data //Envio un payload con toda la data recogida de esa accion.
        })
      }
      if(payload){
        if(payload === "DB"){
        return dispatch({
              type: GET_BREED, //Nombro el tipo de action que voy a usar
              payload: res.data.filter(a=>a.indb) //Envio un payload con toda la data recogida de esa accion.
            })
        };
        if(payload === 'API'){
          return dispatch({
            type: GET_BREED, //Nombro el tipo de action que voy a usar
            payload: res.data.filter(a=>!a.indb) //Envio un payload con toda la data recogida de esa accion.
          })
        }
      }
      
    }
    
    catch(error){//Catch que atrapara el error y me lo mostrara en un console.log
       console.log(error);
    }

    }};

export const searchDog = (name) =>{
  return async function(dispatch){
  try{
     const res = await axios.get(`http://localhost:3001/dogs?name=${name}`)
     console.log(res.data==='error')
     if(res.data){
      return dispatch({
        type: SEARCH_DOG,
        payload: res.data
      })
     }

  }
  catch(error){
      console.log(error)
    }
  }
}

export const dogDetail = (id)=>{
  return async function(dispatch){
    try{
      const res = await axios(`http://localhost:3001/dogs/${id}`)
      if(res.data){
        return dispatch({
          type: DOG_DETAIL,
          payload: res.data
        })
      }
    }
    catch(error){
      console.log(error)
    }
  }
}


export const createBreed = (create) =>{
  return async function(){
    try{
      if(create){

        const  rest = await axios.post('http://localhost:3001/dogs',create)
        return rest;
      }
      else{
        throw new Error('Faltan datos')
    }
    }
    catch(error){
      console.log(error)
    }
  }
}


export const sortByName = (order) =>{
  return{
    type: SORT_BY_NAME,
    payload: order
  }


}

export const sortByWeight = (order)=>{
  return{
    type: SORT_BY_WEIGHT,
    payload:order
  }

}

export const getTemperaments = ()=>{
return async function(dispatch){
  try{
   const  res = await axios('http://localhost:3001/temperaments')
   
   if(res){
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: res.data
    })}

  } 
  catch(error){
    console.log(error.message)
  }
}
}

export const filterByTemps = (payload) =>{
return{
  type: GET_FILTER_BY_TEMPS,
  payload
}

}

