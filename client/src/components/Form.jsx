import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Form =() =>{
//Falta hacer las validaciones de todo el form completo;
// falta hacer la validacion del objeto useState;

//OPCIONAL, AGREGAR UNA A , PARA LA VALIDACION;


//const[validator, setValitador] = useState(false);
const[url,setURL] = useState({image:''})
const[form, setForm] = useState({
    name:'',
    height: '',
    weight:'',
    life_span:'',
    temperamentos:'',
    image:''
})

const handlerWeight = (event) => {
    let value = event.target.value;
    let validator = /^\d+$/;
    if(validator.test(value.split('-').join('')) || value.length === 0 || (value < 6 && value.filter(a=> a === '-').length > 1)){
    if(value.length === 6) return false;
    else if(value.length === 2){
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
  let cortado1 = value.slice(0,2);
  let cortado3 = value.slice(3,5);
  let cortado2 = value.slice(2,3)?value.slice(2,3).replace(validator,'-'):'';
  let valorFinal = ''
  
  if(cortado1.split(' ') !== '-' && cortado3.split(' ') !== '-')
  if(validator.test(cortado1)) valorFinal=cortado1;
  valorFinal += cortado2
  if(validator.test(cortado3)) valorFinal +=cortado3;
  // if(valorFinal.length <= 6) cortado2.replace(' - ', '')
  // if(validator.test(cortado3)) valorFinal+= cortado3;



   /* let verificadorDeGuiones = separador.find(a=>a == '-');
   if(validator.test(value.split('-').join('')) || value.length == 0){
   if(verificadorDeGuiones && value[2] !== '-') return false
   if(value.length === 6) return false;
   else if( value.length == 2){
     separador.push('-')// Por algun motivo no me leia el length al poner el guion asi que decidi usar un push con un split;
     value = separador.join('')//con esto lo vuelvo palabra de nuevo
     console.log(value.length)
   }
 else if(value.length == 3 && separador[2] !== '-'){//Esto es el validador en caso quiera borrar y desaparezca el guion para no ignorar el validador del guion;
  //   //separador[2] = '-';
     separador.splice(2,1,'-')
     value = separador.join('');
   }
  else if(value.length == 3 && value[value.length-1] =='-'){
    value = value.replace('-', '');
  }
} */
setForm({...form,[event.target.name]:valorFinal})
}


const handlerName = (event) =>{
  let value = event.target.value;
  let validator = /^[a-zA-Z\s]{1,20}$/;
  if(validator.test(value) || value.length === 0){
  setForm({...form,[event.target.name]:value})
  }
}

const handlerLife_Span = (event) =>{
  let value = event.target.value;
  let validator = /^\d+$/;
  console.log(value.replace('a',''))
  if(validator.test(value.split('a').join('')) || value.length === 0){
  if(value.length === 9) return false;
  else if(value.length === 2){
  value = value + ' a '
  }
  else if(value.length <= 10){
     console.log('validador de borrado',value)
     value = value.replace(/ /g,'').replace('a', '')
    }
  
  setForm({...form,[event.target.name]:value})
}

}

const handlerTemperament = (event) =>{
  let value = event.target.value;
  let validator = /^[a-zA-Z\s]{1,20}$/;
  if(validator.test(value) || value.length === 0){
  setForm({...form,[event.target.name]:value})
  }
}

console.log(form)
console.log(url.image)
const handlerImageURL = (event)=>{
 let value = event.target.value
 
 



 setURL({...url,[event.target.name]:value})

 

}

const dataValidator = (form.name !=='' && form.height !== '' && form.weight !== '' && form.life_span !== '' && form.temperamentos !== '')?true:false;



console.log(form)
console.log(dataValidator)
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
            name="temperamentos"
            onChange={(e)=>{handlerTemperament(e)}}
            value={form.temperamentos}/>
  </label> <br/>


  {/* ------------------------------------------------   */}


  <label>
    Agrega una URL con la imagen de tu perro:
   
    <input type="text"
            name="image"
            onChange={(e)=>{handlerImageURL(e)}}
            value={url.image}/>

  </label>

</div>





</>)
}

export default Form