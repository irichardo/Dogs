import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { dogDetail } from "./redux/actions";


const DogDetail = (props) =>{
const dispatch = useDispatch()
const id = props.match.params.id

console.log(id)
const breedDetail = useSelector(state=>state.breed_detail);
const [breed, setBreed] = useState([])

const Handler = () =>{ setBreed([])
                       dispatch(dogDetail(id))}

useEffect(()=>
Handler(),[id])

useEffect(()=>
setBreed(breedDetail),[breedDetail]);

useEffect(()=>
setBreed([]),[]);

return(
    breed == 'error'?<><div>no se ha encontrado el id</div></>:
    breed.length?<> 
    <img src={breed[0].image}></img>
    <div key={breed[0].id}>{breedDetail[0].name}</div>
    <div>{breed[0].temperaments}</div>
    <div>{breed[0].life_span}</div>
    <div>{`Altura entre: ${breed[0].height[0]}cm a ${breed[0].height[1]}cm`}</div>
    </>:<><div>Loading...</div></>
)




}

export default DogDetail