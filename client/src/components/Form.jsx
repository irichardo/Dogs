import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Form =() =>{
//Falta hacer las validaciones de todo el form completo;
// falta hacer la validacion del objeto useState;

//OPCIONAL, AGREGAR UNA A , PARA LA VALIDACION;


const[validator, setValitador] = useState(false);

const[form, setForm] = useState({
    name:'',
    height: '',
    weight:'',
    life_span:'',
    temperamentos:[]
})

console.log(form)

const handlerWeight = (event) => {
    let value = event.target.value;
    let validator = /^\d+$/;
    console.log(value);
    if(validator.test(value.split('-').join('')) || value.length == 0){
    if(value.length === 6) return false;
    else if(value.length == 2){
    value = value + '-'
    }
    else if(value.length <= 3){
       value = value.replace('-', '')
      }
    
    setForm({...form,[event.target.name]:value})
    }
}

const handlerHeight = (event) => {
  let value = event.target.value;
  let validator = /^\d+$/;
  if(validator.test(value.split('-').join('')) || value.length == 0){
  if(value.length === 6) return false;
  else if(value.length == 2){
  value = value + '-'
  }
  else if(value.length <= 3){
     value = value.replace('-', '')
    }
  
  setForm({...form,[event.target.name]:value})
  }
}


const handlerName = (event) =>{
  let value = event.target.value;
  console.log(value);
  let validator = /^[a-zA-Z\s]{1,20}$/;
  if(validator.test(value) || value.length == 0){
  setForm({...form,[event.target.name]:value})
  }
}

const handlerLife_Span = (event) =>{
  let value = event.target.value;
  let validator = /^\d+$/;
  console.log(value.replace('a',''))
  if(validator.test(value.split('a').join('')) || value.length == 0){
  if(value.length === 9) return false;
  else if(value.length == 2){
  value = value + ' a '
  }
  else if(value.length <= 10){
     console.log('validador de borrado',value)
     value = value.replace(/ /g,'').replace('a', '')
    }
  
  setForm({...form,[event.target.name]:value})
}

}


//el name del input hace que el handler pueda reconocer el objetico con el que se esta trabajando,
//NO OLVIDAR

return (<>
<Link to={'/home'}><button>Home</button></Link>
<div>
  <label>
    Introduce el nombre del perro:
     <input type="text"
            name="name"
            onChange={(e)=>{handlerName(e)}}
            value={form.name}/>
  </label> <br/>


   {/* ------------------------------------------------   */}

   <label>
    ¿Cuanto es su peso promedio? de:
     <input 
            type="text"
            name="weight"
            onChange={(e)=>{handlerWeight(e)}}
            value={form.weight}/>
  </label> <br/>


  {/* ------------------------------------------------   */}

  <label>
    ¿Cuanto será su tamaño promedio? de:
     <input type="text"
            name="height"
            onChange={(e)=>handlerHeight(e)}
            value={form.height}/>
  </label>cm{} <br/>

  {/* ------------------------------------------------   */}

  <label>
    ¿Cual es su esperanza de vida? de:
     <input type="text"
            name="life_span"
            onChange={(e)=>{handlerLife_Span(e)}}
            value={form.life_span}/>
  </label>años <br/>

  {/* ------------------------------------------------   */}


  <label>
    ¿Cual es su temperamento?
    <input type="text"
            name="max_weight"
            onChange={(e)=>{}}
            value={form.max_weight}/>
  </label> <br/>


  {/* ------------------------------------------------   */}


  <label>
    Agrega una URL con la imagen de tu perro:
   
    <input type="text"
            name="max_weight"
            onChange={(e)=>{}}
            value={form.max_weight}/>

  </label>

</div>





</>)
}

export default Form