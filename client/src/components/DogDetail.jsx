import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { dogDetail } from "./redux/actions";


const DogDetail = (props) => {
    const dispatch = useDispatch()
    const id = props.match.params.id


    const breedDetail = useSelector(state => state.breed_detail);
    const [breed, setBreed] = useState([])


    console.log('aqui', dogDetail(12))

    // eslint-disable-next-line no-console
    function Handler() {
        setBreed([]);
        dispatch(dogDetail(id))
    }

    useEffect(() => {
        Handler()
    }, [id])

    useEffect(() =>
        setBreed(breedDetail), [breedDetail]);

    useEffect(() =>
        setBreed([]), []);
    console.log('aaaa', breed.length ? breed[0].temperaments : false)
    return (
        breed === 'error' ? <><div>no se ha encontrado el id</div></> :
            breed.length ? <>
                <label>
                    <img src={breed[0].image} alt='Imagen No encontrada'></img>
                    <div key={breed[0].id}>{breedDetail[0].name}</div>
                    Por lo general tiene estos comportamientos!
                    <div>{breed[0].temperaments.join(' , ')}</div>

                    <div>{breed[0].life_span}</div>
                    {
                        breed[0].length === 2 ?
                            <div>{`Altura entre: ${breed[0].height[0]}cm a ${breed[0].height[1]}cm`}</div>
                            : <div>{`Altura entre: ${breed[0].height[0]}cm`}</div>
                    }
                    {
                        breed[0].weight.length === 2 ? <div>{`Peso entre: ${breed[0].weight[0]}kg a ${breed[0].weight[1]}kg`}</div>
                            : <div>{`Peso: ${breed[0].weight[0]}kg`}</div>

                    }
                </label>
            </> : <><div>Loading...</div></>

    )




}

export default DogDetail