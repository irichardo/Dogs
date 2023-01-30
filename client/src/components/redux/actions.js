import axios from 'axios';
import { GET_BREED, SEARCH_DOG, DOG_DETAIL, SORT_BY_NAME, SORT_BY_WEIGHT, GET_TEMPERAMENTS, GET_FILTER_BY_TEMPS} from './index';

export const getBreed = () =>{
    return async function(dispatch){
    try{
      const res = await axios('http://localhost:3001/dogs');//Llamo a la api local
      // console.log('aaaaaaa',res.data.find(a=>a.temperaments[0].name))
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

export const searchDog = (name) =>{
  return async function(dispatch){
  try{
     const res = await axios(`http://localhost:3001/dogs?name=${name}`)
     if(res){
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
      if(res.data[0]){
        return dispatch({
          type: DOG_DETAIL,
          payload: res.data
        })
      }
      else{
        throw new Error();
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
      const  rest = await axios.post('http://localhost:3001/dogs',create)
      return rest;
    }
    catch{
      throw new Error;
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
  catch{
    throw new Error()
  }
}
}

export const filterByTemps = (payload) =>{
return{
  type: GET_FILTER_BY_TEMPS,
  payload
}

}

