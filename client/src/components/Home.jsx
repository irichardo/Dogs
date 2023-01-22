import React, { useEffect } from 'react';
import {connect, useDispatch} from 'react-redux';
import { getBreed, searchDog } from './redux/actions';
import DogCard  from './DogCard';
import { useSelector} from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

  
  const Home = () =>{
  const breed = useSelector(state=>state.breed);
  const dispatch = useDispatch();
  const [breeds, setBreeds] = useState([]);
  const [value, SetValue] = useState('')
  const [loader, setLoader] = useState(false)


  const Handler = (name) =>{ 
    SetValue(name);}
  
  useEffect(()=>{
  setLoader(true);
  dispatch(getBreed());//Llamo a todas las razas tanto de db como de la API
  setLoader(false)
},[dispatch]);
  
  useEffect(()=>{
    dispatch(searchDog(value));//Hago una busqueda en tiempo real des perros
  },[value]);
  

  useEffect(()=>{
    SetValue([])
  },[]);

  useEffect(()=>{
  setBreeds(breed);
  },[breed]);

  return (
              <>
              <Link to={'/createdog'}><button>CreateActivity</button></Link>
              <input onChange={e=>Handler(e.target.value)}></input>
              <div>
              {
              loader?<><h1>Loading......</h1></>:
              breeds !== 'error'?breeds.map((breed)=>{
              return <DogCard key={breed.id}
              id={breed.id}
              name={breed.name}
              height={breed.height}
              weight={breed.weight}
              image={breed.image}
              temperament={breed.temperaments}/>
              })
              :value.length>12?<><h1>{`Vaya, que nombre tan raro para un perrito.`}</h1></>
              :<><h1>{`¿Estas seguro de que se llama ${value}?`}</h1></>
              
              }
              </div>
    </>
    
  )




}

export default Home;