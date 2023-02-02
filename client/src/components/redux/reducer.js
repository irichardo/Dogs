const { GET_BREED, SEARCH_DOG, DOG_DETAIL, SORT_BY_NAME, SORT_BY_WEIGHT, GET_TEMPERAMENTS, GET_FILTER_BY_TEMPS} = require("./index")

const initialState={
    breed:[],
    breed_detail:{},
    temperaments:[],
    filter_by_temps:[]
}//Declaro el estado inicial

//creare un arbol de acciones para el reducer;

const rootReducer = (state=initialState, action)=>{//Action es la inforamcion llegara desde la seccion de actions con el contenido del payload;

    switch(action.type){//aqui uso 
//ese payload viene con con los datos y el tiempo de caso que estoy presentando
    
    case GET_BREED:
        
        if(!action.payload.length){
            return{...state, breed:'error',  breed_detail:{}, filter_by_temps:[]}
        }
        return{...state, breed:action.payload, breed_detail:{}, filter_by_temps:[]}
    
    
    case SEARCH_DOG:

        return{...state, breed: action.payload} 
    
    
    case DOG_DETAIL:
        
        return{...state, breed_detail: action.payload}
    
    
    case SORT_BY_NAME:
        let sort = '';
        if(action.payload === 'A-Z'){
           sort = state.filter_by_temps.length?state.filter_by_temps.sort((a,b)=>{return a.name>b.name?1:a.name<b.name?-1:0})
          :state.breed.sort((a,b)=>{return a.name>b.name?1:a.name<b.name?-1:0});
        }
        if(action.payload === 'Z-A'){
           sort = state.filter_by_temps.length?state.filter_by_temps.sort((a,b)=>{return a.name>b.name?-1:a.name<b.name?1:0})
          :state.breed.sort((a,b)=>{return a.name>b.name?-1:a.name<b.name?1:0});
        }
        return state.filter_by_temps.length?{...state, filter_by_temps: sort}:{...state, breed:sort}
    
    
    
    case SORT_BY_WEIGHT:
             let sorted = ''
        if(action.payload === 'Min-Max'){ //Al despertar identificar los NaN del array;
            sorted = state.filter_by_temps.length?state.filter_by_temps.sort((a,b)=>{
                let primero = parseInt(a.weight[0]) + parseInt(a.weight[1]);
                let segundo = parseInt(b.weight[0]) + parseInt(b.weight[1]);
                return primero > segundo ?1 
                      :segundo > primero ?-1
                      :0
            })
            :state.breed.sort((a,b)=>{
                let primero = parseInt(a.weight[0]) + parseInt(a.weight[1]);
                let segundo = parseInt(b.weight[0]) + parseInt(b.weight[1]);
                return primero > segundo ?1 
                      :segundo > primero ?-1
                      :0})
            }
        if(action.payload === 'Max-Min'){ //Al despertar identificar los NaN del array;
            sorted = state.filter_by_temps.length?state.filter_by_temps.sort((a,b)=>{
                let primero = parseInt(a.weight[0]) + parseInt(a.weight[1]);
                let segundo = parseInt(b.weight[0]) + parseInt(b.weight[1]);
    
                return primero > segundo ?-1 
                      :segundo > primero ?1
                      :0
            })
            :state.breed.sort((a,b)=>{
            let primero = parseInt(a.weight[0]) + parseInt(a.weight[1]);
            let segundo = parseInt(b.weight[0]) + parseInt(b.weight[1]);

            return primero > segundo ?-1 
                  :segundo > primero ?1
                  :0
        })
        }
            return state.filter_by_temps.length?{...state, filter_by_temps:sorted}:{...state,breed:sorted}
    case GET_TEMPERAMENTS:

        return {...state, temperaments: action.payload}

    case GET_FILTER_BY_TEMPS:
       let filtrado = '';
       let filtradoDB= ''; 
       if(action.payload === 'All'){
           
           return{...state, filter_by_temps:''}//tambien puedo usarlo para vacear el filtro más adelante cuando quite los filtros
           
        }
        if(action.payload !== 'All'){        //state.breed y lo de referencia supongamos el de temperamentos
                                             //
            filtrado = state.breed !== 'error'?state.breed.filter(a=> a.temperaments.includes(action.payload)):'Error';
            filtradoDB = state.breed !== 'error'?state.breed.filter(a=> a.temperaments[0] && a.temperaments[0].name? a.temperaments[0].name.includes(action.payload)?a.temperaments[0].name:false:false):false;
          
        }
        
        if(filtrado.length && filtradoDB){
           let Combinados = [...filtrado, ...filtradoDB];
           return{...state, filter_by_temps:Combinados}
        }

        if(filtrado.length){
           return{...state,filter_by_temps:filtrado}
        }
        
        else{

        return{...state, filter_by_temps:'Error'}

       }
    //    let result = action.payload == 'All'? false: state.breed.filter(a=> a.temperaments.includes(action.payload));
    //    console.log(result)
    default:
        return{...state}
    }//Siempre poner el default o puede generar errores.
}


export default rootReducer;