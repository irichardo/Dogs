const { GET_BREED, SEARCH_DOG, DOG_DETAIL } = require("./index")

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
    default:
        return{...state}
    }//Siempre poner el default o puede generar errores.
}


export default rootReducer;