import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { getBreed, searchDog, sortByName, sortByWeight, getTemperaments, filterByTemps } from './redux/actions';
import DogCard  from './DogCard';
import { useSelector} from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

  
  const Home = () =>{
  const dispatch = useDispatch();
  const breed = useSelector(state=>state.breed);
  const temperaments = useSelector(state=>state.temperaments)
  const byTemps = useSelector(state=>state.filter_by_temps)
  const [temper, setTemper] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [value, SetValue] = useState('');
  const [render, setRender] = useState(1);
  const [loading, setLoading] = useState(false);



    const Handler = (name) =>{ 
    SetValue(name);
    }
  
    const handlerFilter = (e) =>{
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setRender(render+1)
    }

    const handlerWeight = async(e) =>{
      e.preventDefault();
      await dispatch(sortByWeight(e.target.value));
      setRender(render+1)
    }

    
    const handlerSortByTemp = (e)=>{
      e.preventDefault(e);
      console.log(e.target.value)
      dispatch(filterByTemps(e.target.value))
    }
    
    const resetFilters = async(e)=>{
      setLoading(true);
      document.getElementsByName("inputName")[0].value = "";
      await dispatch(getBreed());
      setBreeds(breed);
      setTemper([]);
      setLoading(false);
    }


    useEffect(() => {
    setLoading(true);
     dispatch(getTemperaments());
     dispatch(getBreed());
      setLoading(false);
    }, [dispatch]);
  

    useEffect(() => {
    async function a(){
      setLoading(true);
      await dispatch(searchDog(value));
      setLoading(false);
    }
    a();
    }, [dispatch, value]);
  

    useEffect(() => {
      setBreeds(breed);
    }, [breed]);

    useEffect(()=>{
      setTemper(byTemps);
    },[byTemps])


  return (
              <>
              <label>Select temperament
                <select name = 'sort by temp' onChange={handlerSortByTemp}>
                <option value="All" >All</option>
                {
                  temperaments?temperaments.sort((a,b)=> a.name>b.name?1:a.name<b.name?-1:0).map(a=>
                (<option value={a.name}>{a.name}</option>))
                :<option value={'Null'}>{'No encontrado'}</option>
                }
                </select>
              </label>
              <Link to={'/createdog'}><button>CreateActivity</button></Link>
              <input name='inputName' onChange={e=>Handler(e.target.value)}></input>
              <button value={'A-Z'} onClick={handlerFilter}>A-Z</button>
              <button value={'Z-A'} onClick={handlerFilter}>Z-A</button>
              <button value={'Max-Min'} onClick={handlerWeight}>Max-min</button>
              <button value={'Min-Max'} onClick={handlerWeight}>Min-Max</button>
              <button onClick={resetFilters}>Reset Filters</button>
              <div>
              {
              loading?<>loading...</>:temper ==='Error'?<><h1>Creo que no podemos encontrar lo que buscas</h1></>:temper.length?temper.map((breed)=>{
                return <DogCard key={breed.id}
                id={breed.id}
                name={breed.name}
                height={breed.height}
                weight={breed.weight}
                image={breed.image}
                temperament={breed.temperaments}/>
              })
              :breeds !== 'error'?breeds.map((breed)=>{
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