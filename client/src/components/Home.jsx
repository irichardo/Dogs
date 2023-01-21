import React, { useEffect } from 'react';
import {connect, useDispatch} from 'react-redux';
import { getBreed, searchDog } from './redux/actions';
import DogCard  from './DogCard';
import { useSelector} from 'react-redux';
import { useState } from 'react';

  
  const Home = () =>{
  const breed = useSelector(state=>state.breed);
  const dispatch = useDispatch();
  const [breeds, setBreeds] = useState([]);
  const [value, SetValue] = useState('')
   
  const Handler = (name) =>{ SetValue(name);}
  
  useEffect(()=>{
  dispatch(getBreed());
  },[dispatch]);
  
  useEffect(()=>{
    dispatch(searchDog(value))
  },[value])

  useEffect(()=>{
  setBreeds(breed);
  },[breed]);

  return (
              <>
              <input onChange={e=>Handler(e.target.value)}></input>
              <div>
              {
              breeds !== 'error'?breeds.map((breed)=>{
              return <DogCard key={breed.id}
              id={breed.id}
              name={breed.name}
              height={breed.height}
              weight={breed.weight}
              image={breed.image}
              temperament={breed.temperaments}/>
              }):value.length>12?<><h1>{`Vaya, que nombre tan raro para un perrito.`}</h1></>:<><h1>{`¿Estas seguro de que se llama ${value}?`}</h1></>}
              </div>
    </>
    
  )




}

export default Home;