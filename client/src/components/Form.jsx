import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments } from './redux/actions';
import styles from './modules/form.module.css';
import button from './modules/assets/button.png';
import {createBreed} from './redux/actions';
import { useHistory } from 'react-router-dom';
const Form = () => {
  //Falta hacer las validaciones de todo el form completo;
  // falta hacer la validacion del objeto useState;

  //OPCIONAL, AGREGAR UNA A , PARA LA VALIDACION;

  const dispatch = useDispatch();
  const history = useHistory();

  const validationLifeSpan = /^\d{2}-\d{2}$/;
  const validation = /^\d+$/;
  const validator = /^[a-zA-Z\s]{1,20}$/;


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







  //------------------------------------------------------------------------------------------------

  //Cambio el estado validador, para luego hacer las verifcaciones:

  const [temperament, setTemperament] = useState([]);
  const [url, setURL] = useState(null);
  const [name, setName] = useState(null);
  const [weight, setWeight] = useState(null);
  const [lifeSpan, setLifeSpan] = useState(null);
  const [height, setHeight] = useState(null);
  const [image, setImage] = useState('');
  const [errorMes, setErrorMessage] = useState({
    errorName: '',
    errorWeight: '',
    errorHeight: '',
    errorTarget: '',
    errorLifeSpan: '',
    errorImage: ''
  });


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

    setHeight(null)
    let validForm = validform.height.split('-');

    try {
      if (validform.height.length && validform.height.includes('-') && validForm[1] !== '' && validForm[1] < validForm[0]) {

        throw new Error(`El peso ${validform.height} no tiene sentido`);
      }

      if (validForm[0] === validForm[1]) throw new Error(`La altura no puede ser la misma`);

      if (!validation.test(validform.height.split('-').join('')) && validform.height !== '') {

        throw new Error('No puedes poner esos caracteres');

      }

      if (validform.height.length >= 5) {

        if (validationLifeSpan.test(validform.height) || validform.height === '') {

          setForm({ ...form, height: validform.height });

          setHeight(false);
        }
        else {
          throw new Error('Peso no valido');
        }
      }
    }

    catch (error) {
      setHeight(true);
      setErrorMessage({ ...errorMes, errorHeight: error.message })
    }

  }


  //------------------------------------------------------------------------------------------------------

  const validationName = () => {
    setName(null);
    try {
      if (validator.test(validform.name) && validform.name.split(' ').length < 3) {

        setForm({ ...form, name: validform.name });
        setName(false);

      }
      else if (validform.name === '') {

        setName(false);

      }

      else {

        throw new Error('Nombre invalido');

      }
    }
    catch (error) {
      setName(true);
      setErrorMessage({ ...errorMes, errorName: error.message })
    }

  }




  const validationWeight = () => {

    setWeight(null);
    let validForm = validform.weight.split('-');

    try {

      if (validform.weight.length && validform.weight.includes('-') && validForm[1] !== '' && validForm[1] < validForm[0]) {
        throw new Error(`La esperanza de vida ${validform.weight} no tiene sentido`);
      }
      if (validForm[0] === validForm[1]) throw new Error(`Las esperanza de vida no puede ser igual`);

      if (!validation.test(validform.weight.split('-').join('')) && validform.weight !== '') {
        throw new Error('No puedes poner esos caracteres');
      }

      if (validform.weight.length >= 5) {

        if (validationLifeSpan.test(validform.weight) || validform.weight === '') {

          setForm({ ...form, weight: validform.weight });

          setWeight(false);
        }
        else {
          throw new Error('Peso no valido');
        }
      }
    }

    catch (error) {
      setWeight(true);
      // console.log(error.message);
      setErrorMessage({ ...errorMes, errorWeight: error.message })
    }
  }


  const validationLife_Span = () => {

    setLifeSpan(null)
    let validForm = validform.life_span.split('-');

    try {
      if (validform.life_span.length && validform.life_span.includes('-') && validForm[1] !== '' && validForm[1] < validForm[0]) {
        throw new Error(`La esperanza de vida ${validform.life_span} no tiene sentido`);
      }
      if (validForm[0] === validForm[1]) throw new Error(`Las esperanza de vida no puede ser igual`);

      if (!validation.test(validform.life_span.split('-').join('')) && validform.life_span !== '') {
        throw new Error('No puedes poner esos caracteres');
      }

      if (validform.life_span.length >= 5) {

        if (validationLifeSpan.test(validform.life_span) || validform.life_span === '') {

          setForm({ ...form, life_span: validform.life_span });

          setLifeSpan(false);
        }
        else {
          throw new Error('Esperanza de vida no valida');
        }
      }
    }

    catch (error) {
      setLifeSpan(true);
      setErrorMessage({ ...errorMes, errorLifeSpan: error.message })
    }
  }



  const validationUrl = () => {
    setURL(null);
    try {
      const imageExtension = validform.image.split(".").pop();
      if (!validform.image) {
        return null;
      }
      // if(validform.image&& validform.image !== ''){
      //   urlVal.src =validform.image
      //   urlVal.onerror = function() {
      //     setErrorMessage({...errorMes,errorImage:'La url no contiene una imagen'})
      //     setImage(null)
      //     setURL(true);
      //   };
      // }
      if (/^(http|https):\/\/[^ "]+\.(jpe?g|png)$/i.test(validform.image) &&
        (imageExtension === "jpg" || imageExtension === "jpeg" || imageExtension === "png")
      ) {
        setForm({ ...form, image: validform.image });
        setImage(validform.image);
        setURL(false);
      } else {
        throw new Error("Se necesita un URL válido, solo JPG o PNG");
      }

    }

    catch (error) {
      setImage(null);
      setURL(true);
      setErrorMessage({ ...errorMes, errorImage: error.message })
    }

  }

  // -----------------------------------------------------------------------------------------------------------------------------------------------



  const handlerSortByTemp = (e) => {
    e.preventDefault(e);


    if (e.target.value !== 'Temperamentos' && !temperament.includes(e.target.value) && temperament.push(e.target.value)) {

      setForm({ ...form, temperamentos: temperament })

    };

  }


  const temperamentDeleteHandle = (value) => {
    let filter = temperament.filter(a => a !== value.target.value)
    setTemperament(filter);
  }




  //-------------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    validationName();
    validationWeight();
    validationLife_Span();
    handlerHeight();
    validationUrl();
  }, [validform])

  // console.log(validform);
  // console.log(temperament)


  const dataValidator = (
    validform.name === '' ||
    (validform.height === '' || validform.height.length !== 5)
    || (validform.weight === '' || validform.weight.length !== 5)
    || (validform.life_span === '' || validform.life_span.length !== 5)
    || validform.image === '' || !temperament.length
  ) ? false : true;


  // console.log(dataValidator);


  const formValidator = !name && !lifeSpan && !height && !weight && !url && dataValidator ? true : false;  //Aqui hago la validacion de dos datos, Primero que lleguen a 5 los que necesito
  //Segundo, para evitar spam pongo un verificador de vacios;
  // Y finalmente todos los verificadores de errores los manejor por separado
  //asi finalmente se activara mi boton de submit

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createBreed({
        ...form,
        life_span: `${form.life_span} years`,
      })
    );
    alert("The new dog was added successfully");
    history.push("/home");
    setForm({
      name: '',
      height: '',
      weight: '',
      life_span: '',
      temperamentos: '',
      image: ''
    });
  };
  // alert("The new dog was added successfully");
  // history.push("./");


// eslint-disable-next-line no-console
useEffect(() =>
  dispatch(getTemperaments())
  , [dispatch])


return (<>

  <div className={styles.contain}>
    <div className={styles.background}>
      <form onSubmit={handleSubmit}>
        <nav className={styles.formContent}>
          <div className={styles.formElements}>
            <div className={styles.buttonContent}><Link to={'/home'}><img className={styles.buttonAnimation} src={button} /></Link></div><br />
            {
              image && !url ? <img className={styles.dogCreate} src={image} /> : null
            }
          </div>
          <div className={styles.formElements}>
            <label>
              Introduce el nombre del perro<br />
              <input type="text"
                className={styles.inputstyle}
                name="name"
                onChange={(e) => { setHandler(e) }}
                placeholder='nombre de la raza perro...'
                value={validform.name} />
              {
                name && <div className={styles.fail}>{`${errorMes.errorName}`}</div>

              }
            </label>
            <br />
          </div>

          {/* ------------------------------------------------   */}
          <div className={styles.formElements}>
            <label>
              Suele pesar entre<br />
              <input
                type="text"
                name="weight"
                placeholder='de menor a mayor... 00-00'
                className={styles.inputstyle}
                onChange={(e) => { setHandler(e) }}
                value={validform.weight} />
              {
                weight && <div className={styles.fail}>{`${errorMes.errorWeight}`}</div>
              }

            </label> <br />
          </div>

          {/* ------------------------------------------------   */}
          <div className={styles.formElements}>
            <label>
              Puede medir entre <br />
              <input type="text"
                name="height"
                className={styles.inputstyle}
                onChange={(e) => setHandler(e)}
                placeholder='de menor a mayor... 00-00'
                value={validform.height} />
              {
                height && <div className={styles.fail}>{`${errorMes.errorHeight}`}</div>
              }
            </label><br />

          </div>
          {/* ------------------------------------------------   */}
          <div className={styles.formElements}>
            <label>
              Vive entre <br />
              <input type="text"
                className={styles.inputstyle}
                name="life_span"
                placeholder='de menor a mayor... 00-00'
                onChange={(e) => { setHandler(e) }}
                value={validform.span} />
              {
                lifeSpan && <div className={styles.fail}>{errorMes.errorLifeSpan}</div>
              }
            </label><br />
          </div>

          {/* ------------------------------------------------   */}

          <div className={styles.formElements}>
            <label>
              Agrega una URL con la imagen de tu perro<br />

              <input type="text"
                className={styles.inputstyle}
                name="image"
                placeholder='Agrega un URL...JPG o PNG'
                onChange={(e) => { setHandler(e) }}
                value={validform.image} />
            </label><br />

            {

              url && validform.image !== '' && <div className={styles.fail} >{`${errorMes.errorImage}`}</div>

            }

          </div>



          {/* ------------------------------------------------   */}


          <label>Select temperament <br />
            <select className={styles.select} name='sort by temp' onChange={handlerSortByTemp}>
              <option  >Temperamentos</option>

              {


                temperaments.length ? temperaments.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0).map(a =>

                  (<option key={a.name} value={a.name}>{a.name}</option>))

                  : false

              }

            </select>

          </label>




          <div className={styles.formElements}>
            {!formValidator ?
              <>
                <button type="submit" className={styles.submitStyle}>Submit</button><br />
                <div className={styles.submiteMessage}>Completa el formulario para poder enviar los datos</div>
              </>


              : <button type="submit" className={styles.submitStyle2}>Submit</button>
            }
          </div>
          <div>

          </div>
        </nav>
        {
          temperament.length ?
            <div className={styles.temperamentList}>
              {
                temperament.map(a => {

                  return (

                    <><button name={a} key={a} id={a} className={styles.buttonTemp} value={a} onClick={(value) => temperamentDeleteHandle(value)}>{a}</button></>
                  )
                })
              }
            </div> : null
        }
      </form>
    </div>
  </div>
</>)
}

export default Form