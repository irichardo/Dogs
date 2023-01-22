const axios = require('axios');
const {Dog, Temperaments} = require('../db.js')
const {API_KEY} = process.env;
const {Router} = require ('express');
const router = Router();

const API = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
// router.get('/', async(req,res,next)=>{
  
//    const dogs = await axios.get(API);
//    try{
//        if(dogs){
//          res.send(dogs.data)
//        }
//    }
//    catch(error){
//     console.log(error)
//    }
// });/////CANCELADO PORQUE NO TRAIA LOS DE LA DATABASE 
//const landingpage = 'landinpage';
//const home = 'home';
// _________________________________________
// |                 |                     |  
// |    HOME         |     LANDINGPAGE     |
// |_________________|_____________________|
//${landinpage}

     const contenedorParaPerrosAPI = async()=>{ //Lo que quiero hacer en esta funcion es llamar a los perros de la API;
     try{
     const contenedorApi = await axios.get(API);
     const contenedorInfo = await contenedorApi.data.map(perro=>{
     let temperamento = [];
     perro.temperament?temperamento=perro.temperament.split(','):temperamento='no se ha encontrado un temperamento';
     //if(perro.temperament) temperamento = perro.temperament.split(','); //Verifico que el temperamento exista, y hago que se separe por comas en el array
     let altura = []; // 50 - 60
     if(perro.height.metric) altura = perro.height.metric.replace(/ /g,'').split('-');//Quito los guiones para que se separe en 2 elementos la altura
     let peso = [];
     if(perro.weight.metric) peso = perro.weight.metric.replace(/ /g,'').split('-'); //Hago exactamente lo mismo que con la altura.
     //retorno un objeto con las cosas recolectadas en el Contenedor de la INFO;
     return{
        id: perro.id,
        name: perro.name,
        height: altura,
        weight: peso,
        temperaments: temperamento,
        life_span: perro.life_span,
        image: perro.image.url
     }});
     return contenedorInfo;
  }
    catch(error){
      console.log(error);
    }
};

const contenedorParaPerrosDB = async()=>{
    try{
        const contenedorDB = await Dog.findAll({
            include:{
                model: Temperaments,
                attributes:['name'],
                through:{
                    attributes:[]
                }
            }
        });
        return contenedorDB
    }

    catch(error){
        console.log(error)
    }
}



router.get('/', async(req,res)=>{
    
    const DatosApi = await contenedorParaPerrosAPI();
    const DatosDB  = await contenedorParaPerrosDB();
    const combinar = [...DatosApi,...DatosDB];

    const{name}= req.query;
                                         //toLowerCasePara no tener problemas con las mayusculas
    if(name) {const perroBuscado = combinar.filter(a=>a.name.toLowerCase().includes(name.toLowerCase()))//<---
    perroBuscado.length?res.send(perroBuscado): res.send('error')                               //   |
                                                                                                        //   |    
    }                                                                                                   //Uso todos los elementos recolectados con un filter, los paso a miniscula para no
                                                                                                        //para hacerlo case sensitive, luego uso el name del query junto con include para
                                                                                                        //verificar que no tenga ningun elemento con ese nombre
    else res.send(combinar);



    // let dog = await Dog.findAll();//Buscara todas las razas que pueda encontrar en mi base de datos.
    // let dogs = await Promise.all(dog.map(async perros=>{//voy a iterar sobre los objetos que estan dentro de dog.
    // let temperaments = await perros.getTemperaments()//Traigo todos los temperamentos de cada uno de los perros.
    // perros = perros.dataValues;
    // temperaments = temperaments.map(el=> el.dataValues.name);


    // }));//Esto va a ser un contenedor para todos mis perros.
                                   // promise.all va a ejecutar el codigo despues de que todas mis promesas se hayan cumplido.
});

router.get('/:id', async(req,res)=>{
const {id} = req.params;
const datosAPI = await contenedorParaPerrosAPI();//Tomo los datos de la api
const datosDB = await contenedorParaPerrosDB(); // TOMO LOS DATOS DE LA BASE DE DATOS
const combinar = [...datosAPI, ...datosDB]; //LOS UNO NUEVAMENTE
const findDog = combinar.filter(a=> {return a.id == id});//VERIFICO QUE EXISTE CON UN FILTER
findDog.length?res.send(findDog):res.send('error')//Si encuentro alguno lo mando como respuesta, sino aviso de que no existe.
console.log(findDog)
})








router.post('/', async(req,res)=>{
const {name, weight, height, life_span, temperamentos, image} = req.body;
let weight_ = weight.split('-');
let height_ = height.split('-');
const totalWeight = [weight_];
const totalHeight = [height_];
let create = await Dog.create({
    name,
    height:totalHeight,
    weight:totalWeight,
    life_span,
    temperamentos,
    image
})//Los datos los recibe atravez de un array;
const relacion = await Temperaments.findAll({
    where:{
        name:temperamentos
    }
})
 create.addTemperaments(relacion)
 res.send('Se ha creado exitosamente')

});

module.exports = router;
