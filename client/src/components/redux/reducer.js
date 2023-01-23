const { GET_BREED, SEARCH_DOG, DOG_DETAIL, SORT_BY_NAME, SORT_BY_WEIGHT} = require("./index")

const initialState={
    breed:[],
    breed_detail:[]
}//Declaro el estado inicial

//creare un arbol de acciones para el reducer;

const rootReducer = (state=initialState, action)=>{//Action es la inforamcion llegara desde la seccion de actions con el contenido del payload;

    switch(action.type){//aqui uso 
    case GET_BREED:
        return{...state, breed: action.payload}
    case SEARCH_DOG:
        return{...state, breed: action.payload} 
    case DOG_DETAIL:
        return{...state, breed_detail: action.payload}
    case SORT_BY_NAME:
        let sort = '';
        if(action.payload === 'A-Z'){
           sort = state.breed.sort((a,b)=>{return a.name>b.name?1:a.name<b.name?-1:0})
        }
        if(action.payload === 'Z-A'){
           sort = state.breed.sort((a,b)=>{return a.name>b.name?-1:a.name<b.name?1:0})
        }
        console.log(sort.slice(0,10))
        return {...state, breed: sort}
    case SORT_BY_WEIGHT:
        let sorted = ''
        if(action.payload === 'Max-Min'){ //Al despertar identificar los NaN del array;
                    sorted = state.breed.sort((a,b)=>{
                    console.log(a.weight + '-' + b.weight)
                    let dataA = a.weight.includes("-") ? a.weight.join('').split("-") :  a.weight.join('').split("–")
					let dataB = b.weight.includes("-") ? b.weight.join('').split("-") :  b.weight.join('').split("–")
					let newDataA = Array.from(dataA, x => Number(x))
					let newDataB = Array.from(dataB, x => Number(x))
  					if (newDataA[0] === newDataB[0]) {return 0;}
  					if (newDataA[0] < newDataB[0]) {return -1;}
  					return 1;
        })}
        
       return {...state, breed:sorted}
        
    default:
        return{...state}
    }//Siempre poner el default o puede generar errores.
}


export default rootReducer;