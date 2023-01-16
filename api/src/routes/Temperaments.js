const axios = require('axios')
const {Temperaments} = require('../db.js')
const {API_KEY} = process.env;
const {Router} = require ('express');

const router = Router();
const API = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
router.get('/', async(req,res)=>{
    const datosApi = await axios.get(API);//Llamado a la api para que me traiga los datos
    const temperamentosAPI = datosApi.data.map(a=>a.temperament?a.temperament:false).filter(Boolean)//esto devuelvo un arreglo con los temperamento//Uso el filter(Boolean para detectar elementos null o falsos y asi no hacer un arreglo de ellos)
    const temperamentos = temperamentosAPI.toString().split(',');
    temperamentos.forEach(temp=>Temperaments.findOrCreate({where:{name:temp}}));
    const allTemp=await Temperaments.findAll();
    console.log(temperamentos.data)
    res.send(allTemp)
});











module.exports = router;