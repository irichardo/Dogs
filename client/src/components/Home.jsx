import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { getBreed, searchDog, sortByName, sortByWeight } from './redux/actions';
import DogCard  from './DogCard';
import { useSelector} from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

  
  const Home = () =>{
  const dispatch = useDispatch();
  const breed = useSelector(state=>state.breed);
  const [breeds, setBreeds] = useState([]);
  const [value, SetValue] = useState('');
  const [render, setRender] = useState(1);


    const Handler = (name) =>{ 
    SetValue(name);
    }
  
    const handlerFilter = (e) =>{
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setRender(render+1)
    }

    const handlerWeight = (e) =>{
      e.preventDefault();
      dispatch(sortByWeight(e.target.value));
      setRender(render+1)
    }

    useEffect(() => {
      dispatch(getBreed());
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(searchDog(value));
    }, [dispatch, value]);
  
    useEffect(() => {
      setBreeds(breed);
    }, [breed]);


  return (
              <>
              <Link to={'/createdog'}><button>CreateActivity</button></Link>
              <input onChange={e=>Handler(e.target.value)}></input>
              <button value={'Z-A'} onClick={handlerFilter}>Z-A</button>
              <button value={'A-Z'} onClick={handlerFilter}>A-Z</button>
              <button value={'Max-Min'} onClick={handlerWeight}>Max-min</button>
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
              })
              :value.length>12?<><h1>{`Vaya, que nombre tan raro para un perrito.`}</h1></>
              :<><h1>{`¿Estas seguro de que se llama ${value}?`}</h1></>
              
              }
              </div>
    </>
    
  )




}

export default Home;