import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBreed, searchDog, sortByName, sortByWeight, getTemperaments, filterByTemps } from './redux/actions';
import DogCard from './DogCard';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from './Pagination';
import styles from './modules/home.module.css';
import loader from './modules/assets/loading2.gif'

const Home = () => {
  const dispatch = useDispatch();
  //ESTADOS LOCALES//
  const breed = useSelector(state => state.breed);
  const temperaments = useSelector(state => state.temperaments);
  const byTemps = useSelector(state => state.filter_by_temps);

  //-----------------------------------------------------------------//

  const [temper, setTemper] = useState([]);

  const [breeds, setBreeds] = useState([]);

  const [value, SetValue] = useState('');

  const [render, setRender] = useState(1);

  const [loading, setLoading] = useState(null);




  // ---------------------------------------------------------------------------------// PAGINADO  

  const [pagina, setPagina] = useState(1)

  let elementsPerPage = 8

  // let newElementsPerPage = breed.filter(a=> a.temperaments[0] && a.temperaments[0].name?a.temperaments[0].name:false); // Cree una condicion que suma los elementos creados atra vez de la base de datos, usando 
  // console.log('SUEMA DE ELEMENTOS TOTALES',newElementsPerPage.length)
  // como motivo del filtrado el hecho de que tengan obejtos dentro.
  // Para despues debo crear una distincion en la base de datos en lugar de buscar una como esta.


  const ultimaPagina = pagina * elementsPerPage;//primera pagina * 8

  const inicio = ultimaPagina - elementsPerPage;//8-8  0
  //  0            8
  //  8            16
  const PerrosActuales = breed.slice(inicio, ultimaPagina);

  const PerrosFiltradosActuales = byTemps.slice(inicio, ultimaPagina);

  let Error = breeds.length && breeds !== 'error' ? !!breeds.filter(a => a.name.toLowerCase().includes(value.toLowerCase())).length : false; //Esto verifica el error de la busqueda en tiempo real, guardado para proxima implementacion del catch.



  const paginado = (pageNumber) => {//HANDLER PAGINADO
    setPagina(pageNumber)
  };  //Esto va a poner la pagina actual;

  const prevHandler = (init) => {


    if (pagina > 1) {
      setPagina(pagina - 1);
    }

    if (init === 'init') {
      setPagina(1)
    }

  }


  const nextHandler = (final) => {//Verifico si estoy tomando de mis elementos filtrados o mis elementos sin filtrar para que no llegue al limite del index y lo supere

    if (pagina === temper.length ? Math.ceil(temper.length / elementsPerPage) : Math.ceil(breeds.length / elementsPerPage)) {
      setPagina(temper.length ? Math.ceil(temper.length / elementsPerPage) : Math.ceil(breeds.length / elementsPerPage))
    }


    if (pagina < Math.ceil(temper.length ? temper.length / elementsPerPage : breeds.length / elementsPerPage)) {//verifico que no superar el limite de cualquiera de mis elementos.
      setPagina(pagina + 1);
    }

    if (final === 'final') {
      setPagina(Math.ceil(temper.length ? temper.length / elementsPerPage : breeds.length / elementsPerPage))//Es el handler que me lleva hasta la pagina final para no perder ni la
    }
  }

  //------------------------------------------------------------------------------------------// 
  const Handler = (name) => {
    SetValue(name);
  }
  const handlerFilter = async (e) => {
    e.preventDefault();
    await dispatch(sortByName(e.target.value));
    setRender(render + 1)
  }


  const handlerWeight = async (e) => {
    e.preventDefault();
    await dispatch(sortByWeight(e.target.value));
    setRender(render + 1)
  }


  const handlerSortByTemp = (e) => {
    e.preventDefault(e);
    dispatch(filterByTemps(e.target.value))
    setRender(render + 1)
  }

  //------------------------------------------------------------------------------------------------------------//
  //RESET
  const [reset, setReset] = useState(false);


  const resetFilters = async (e) => {
    e.preventDefault()
    setLoading(true);
    document.getElementsByName("inputName")[0].value = "";
    await dispatch(filterByTemps('All'));
    await dispatch(getBreed());
    setReset(true);
    setBreeds(breed);
    setReset(false);
    setLoading(false);
  }




  //--------------------------------------------------------------------------------------------------------------




  useEffect(() => {
    setLoading(true);
    dispatch(getTemperaments());
    dispatch(getBreed());
    setLoading(false);
  }, [dispatch]);


  // eslint-disable-next-line no-console
  useEffect(() => {

      setLoading(true);
      dispatch(searchDog(value));
      // eslint-disable-next-line no-console
      setBreeds(breed);
      if (value.length === 0 && value.length !== "") {
        setTemper([])
      }
      setLoading(false);
  }, [dispatch, value]);


  useEffect(() => {
    setBreeds(breed);

  }, [breed]);

  useEffect(() => {

    setTemper(byTemps);
    setPagina(1)
  }, [byTemps])





  return (
    //SECCION DEL MENU DE TEMPERAMENTOS
    <>

      <div className={styles.body}>
        <div className={styles.background}>


          <div className={styles.menuContainer}>

            <div className={styles.menu}>




              <div >
              <label>Select temperament: 

                <select name='sortbytemp' onChange={handlerSortByTemp}>

                  <option value="All">Temperamentos</option>

                  {

                    temperaments.length ? temperaments.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0).map(a =>
                      (<option key={a.name} value={a.name}>{a.name}</option>)) : false
                  }

                </select>
              </label>
              <Link to={'/createdog'} className={styles.linkColor}><button className={styles.homeButton} >CreateBreed</button></Link>
              <button className={styles.homeButton} key={Math.random()} value={'A-Z'} onClick={handlerFilter}>A-Z</button>
              <button className={styles.homeButton} value={'Z-A'} onClick={handlerFilter}>Z-A</button>
              <button className={styles.homeButton} value={'Max-Min'} onClick={handlerWeight}>Max-min</button>
              <button className={styles.homeButton} value={'Min-Max'} onClick={handlerWeight}>Min-Max</button>
              <button className={styles.homeButton} onClick={resetFilters}>Reset Filters</button>
              <input  name='inputName' onChange={e => Handler(e.target.value)}></input>
              </div>

            </div>
          </div>

          <div className={styles.cardContent}>
            {


              loading || !breed.length ? <> <div className={styles.loadingContainer}><img className={styles.loading} src={loader} alt='imagen no encontrada'></img><img className={styles.loading} src={loader} alt='imagen no encontrada'></img><img className={styles.loading} src={loader} alt='imagen no encontrada'></img></div></>

                : temper === 'Error' || Error === false ? <><h1>Creo que no podemos encontrar lo que buscas</h1></>

                  : temper.length ?

                    PerrosFiltradosActuales && PerrosFiltradosActuales !== 'Error' && PerrosFiltradosActuales.map((breed) => {//Arreglar para el filtro
                      return <DogCard key={breed.id}
                        id={breed.id}
                        name={breed.name}
                        height={breed.height}
                        weight={breed.weight}
                        image={breed.image}
                        temperament={breed.temperaments} />
                    }) //   Pude haber trabajado todo en un solo estado


                    : breeds !== 'error' ?
                      PerrosActuales.length && PerrosActuales.map((breed) => {
                        return <DogCard key={breed.id}
                          id={breed.id}
                          name={breed.name}
                          height={breed.height}
                          weight={breed.weight}
                          image={breed.image}
                          temperament={breed.temperaments} />
                      })



                      : value.length > 12 ? <><h1>{`Vaya, que nombre tan raro para un perrito.`}</h1></>
                        : <><h1>{`¿Estas seguro de que se llama ${value}?`}</h1></>

            }

          </div>




          <div className={styles.pagination}>
            <Pagination elementsPerPage={elementsPerPage} allElements={temper.length && temper !==''? temper.length : breeds.length} paginado={paginado} prevHandler={prevHandler} nextHandler={nextHandler} reset={reset} />{/*el valor de la funcion de paginado aumenta segun el bucle for en el componente Paginate*/}
          </div>
        </div>
      </div>
    </>

  )




}

export default Home;