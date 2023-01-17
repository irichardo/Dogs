const { GET_BREED } = require("./index")

const initialState={
    breed:[]
}//Declaro el estado inicial

//creare un arbol de acciones para el reducer;

const rootReducer = (state=initialState, action)=>{//Action es la inforamcion llegara desde la seccion de actions con el contenido del payload;
    switch(action.type){//aqui uso 
    case GET_BREED:
        return{...state, breed: action.payload}
    default:
        return{...state}
    }//Siempre poner el default o puede generar errores.

}


export default rootReducer;