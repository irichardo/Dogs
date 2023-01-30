import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments } from './redux/actions';
const Form = () => {
  //Falta hacer las validaciones de todo el form completo;
  // falta hacer la validacion del objeto useState;

  //OPCIONAL, AGREGAR UNA A , PARA LA VALIDACION;

  const dispatch = useDispatch();



  let validationLifeSpan = /^\d{2}-\d{2}$/;
  let validation = /^\d+$/;
  let validator = /^[a-zA-Z\s]{1,20}$/;
  const temperaments = useSelector(state => state.temperaments);


  const [form, setForm] = useState({
    name: '',
    height: '',
    weight: '',
    life_span: '',
    temperamentos: '',
    image: ''
  })


  const [validform, setvalidForm] = useState({
    name: '',
    height: '',
    weight: '',
    life_span: '',
    temperamentos: '',
    image: ''
  })



  const [temperament] = useState([]);

  const handlerSortByTemp = (e) => {
    e.preventDefault(e);


    e.target.value !== 'Temperamentos' && !temperament.includes(e.target.value) && temperament.push(e.target.value);


    //  console.log(temperament)
    setForm({ ...form, temperamentos: temperament })
  }


  //------------------------------------------------------------------------------------------------

  //Cambio el estado validador, para luego hacer las verifcaciones:

  const [url, setURL] = useState(false);
  const [name, setName] = useState(false);
  const [weight, setWeight] = useState(false);
  const [lifeSpan, setLifeSpan] = useState(false);
  const [height, setHeight] = useState(false);



  const setHandler = (event) => {
    event.preventDefault(event);
    let value = event.target.value;
    if (event.target.name === 'name') {
      setvalidForm({ ...validform, [event.target.name]: value })
    }
    // setvalidForm({...validation,[event.target.name]})
    if (event.target.name === 'weight') {
      setvalidForm({ ...validform, [event.target.name]: value })
    }

    if (event.target.name === 'height') {
      setvalidForm({ ...validform, [event.target.name]: value })
    }

    if (event.target.name === 'life_span') {
      setvalidForm({ ...validform, [event.target.name]: value })
    }

    if (event.target.name === 'image') {
      setvalidForm({ ...validform, [event.target.name]: value })
    }

  }









  //-------------------------------------------------------------------------------------------------


  const handlerHeight = () => {
    setHeight(false);
    try {
      if (!validation.test(validform.height.split('-').join('')) && validform.height !== '') {
        throw new Error;
      }
      if (validform.height.length >= 5) {
        if (validationLifeSpan.test(validform.height) || validform.height == '') {
          setForm({ ...form, height: validform.height });
          setHeight(false);
        }
        else {
          throw new Error;
        }
      }
    }

    catch {
      setHeight(true)
    }
  }

  console.log(height)


  const handlerImageURL = (event) => {


  }

  const validationName = () => {
    setName(false)
    try {
      if (validator.test(validform.name) || validform.name == '') {
        setForm({ ...form, name: validform.name });
        setName(false);
      }
      else {
        throw new Error;
      }
    }
    catch {
      setName(true);
    }

  }




  const validationWeight = () => {
    setWeight(false)
    try {
      if (!validation.test(validform.weight.split('-').join('')) && validform.weight !== '') {
        throw new Error;
      }
      if (validform.weight.length >= 5) {
        if (validationLifeSpan.test(validform.weight) || validform.weight == '') {
          setForm({ ...form, weight: validform.weight });
          setWeight(false);
        }
        else {
          throw new Error;
        }
      }
    }

    catch {
      setWeight(true)
    }
  }


  const validationLife_Span = () => {

    setLifeSpan(false)

    try {

      if (!validation.test(validform.life_span.split('-').join('')) && validform.life_span !== '') {
        throw new Error;
      }
      if (validform.life_span.length >= 5) {

        if (validationLifeSpan.test(validform.life_span) || validform.life_span == '') {
          setForm({ ...form, life_span: validform.life_span });
          setLifeSpan(false);
        }
        else {
          throw new Error;
        }
      }
    }

    catch {
      setLifeSpan(true)
    }
  }



  const validationUrl = () => {
    setURL(false);

    try {

      if (validform.image == '' || validform.image.split('.').length > 2 && (validform.image.split('.').includes('jpg') || validform.image.split('.').includes('png'))) {
        setForm({ ...form, image: validform.image });
        setURL(false);
      }
      else {
        throw new Error
      }

    }

    catch {

      setURL(true)

    }


  }



  useEffect(() => {
    validationName();
    validationWeight();
    validationLife_Span();
    handlerHeight();
    validationUrl();
  }, [validform])

  console.log(validform);
  console.log(temperament)


  const dataValidator = (form.name !== '' && form.height !== '' && form.weight !== '' && form.life_span !== '' && form.temperamentos !== '') ? true : false;

  // eslint-disable-next-line no-console
  useEffect(() =>
    dispatch(getTemperaments())
    , [dispatch])


  return (<>
    <Link to={'/home'}><button>Home</button></Link>


    <form>
      <div>
        <label>
          Introduce el nombre del perro:<br />
          <input type="text"
            name="name"
            onChange={(e) => { setHandler(e) }}
            value={validform.name} />
          {
            name && <div>{`${validform.name} no es un nombre válido, solo se permiten letras`}</div>

          }
        </label>
        <br />

        {/* ------------------------------------------------   */}

        <label>
          Suele pesar entre:<br />
          <input
            type="text"
            name="weight"
            onChange={(e) => { setHandler(e) }}
            value={validform.weight} />
          {
            weight && <div>{`Solo numeros ordenados de esta manera 00-00`}</div>
          }

        </label> <br />


        {/* ------------------------------------------------   */}

        <label>
          Puede medir entre: <br />
          <input type="text"
            name="height"
            onChange={(e) => setHandler(e)}
            value={validform.height} />
          {
            height && <div>{`Solo numeros ordenados de esta manera 00-00`}</div>
          }
        </label><br />

        {/* ------------------------------------------------   */}

        <label>
          Vive entre: <br />
          <input type="text"
            name="life_span"
            onChange={(e) => { setHandler(e) }}
            value={validform.span} />
          {
            lifeSpan && <div>{`Solo numeros ordenados de esta manera 00-00`}</div>
          }

        </label><br />

        {/* ------------------------------------------------   */}




        <label>
          Agrega una URL con la imagen de tu perro: <br />

          <input type="text"
            name="image"
            onChange={(e) => { setHandler(e) }}
            value={validform.image} />
        </label><br />

        {

          url && <div>{`Ingresa una URL Valida, solo JPG o PNG`}</div>

        }




        {/* ------------------------------------------------   */}


        <label>Select temperament <br />
          <select name='sort by temp' onChange={handlerSortByTemp}>
            <option  >Temperamentos</option>

            {


              temperaments.length ? temperaments.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0).map(a =>

                (<option key={a.name} value={a.name}>{a.name}</option>))

                : false

            }

          </select>

        </label>




      </div>
    </form>

  </>)
}

export default Form