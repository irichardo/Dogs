const axios = require('axios')
const {Temperaments} = require('../db.js')
const {API_KEY} = process.env;
const {Router} = require ('express');

const router = Router();

const getTemperaments = async() =>{
    const API = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
    const datosApi = await axios.get(API);//Llamado a la api para que me traiga los datos ' ';
    const temperamentosAPI = datosApi.data.map(a=>a.temperament?a.temperament:false).filter(Boolean)//esto devuelvo un arreglo con los temperamento//Uso el filter(Boolean para detectar elementos null o falsos y asi no hacer un arreglo de ellos)
    let filtrarRepetidos = temperamentosAPI.toString().replace(/ /g,'').split(',');
    let repetidosArray = [...new Set(filtrarRepetidos)]
    const temperamentos = repetidosArray.toString().split(',');
    temperamentos.forEach(temp=>Temperaments.findOrCreate({where:{name:temp}}));
    const allTemp = await Temperaments.findAll();
    return allTemp
}



router.get('/', async(req,res)=>{
    
    try{

        let temperamentos = await getTemperaments()
        res.send(temperamentos)

    }
    catch{

        res.send('temperamentos no encontrados')

    }

});

// router.delete('/', async(req,res)=>{
//     const {name}= req.query;
    
//     console.log(name);
   
//     const count = await Temperaments.destroy({where:{name:name}});
// });









module.exports = router;