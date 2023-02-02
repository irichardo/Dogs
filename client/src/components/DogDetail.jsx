import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { dogDetail } from "./redux/actions";
import { Loading } from "./Loading";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styles from './modules/dogDetail.module.css';

const DogDetail = (props) => {
    const dispatch = useDispatch();
    const History = useHistory();
    // const History = useHistory();
    const id = props.match.params.id;
    
    const detail = useSelector(state => state.breed_detail)
    const [loading, setLoading] = useState(false);


    //     // const breedDetail = useSelector(state => state.breed_detail);
    //     const [breed, setBreed] = useState([])
    //     const [Loading, setLoading] = useState(false);
    //     // const breedDetail = async()=>{
    //     //   const res = await useSelector(state=>state.breed_detail);
    //     //   setBreed(res);
    //     // } 

    //    const esperanza = ()=>{
    //         setBreed(detail);
    //    }

   const handleClick = () =>{
     History.replace('/home')
   }

    useEffect(() => {
        setLoading(true);
        dispatch(dogDetail(id))
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch]);



    // dispatch(dogDetail(id));

    //     useEffect(()=>{
    //         esperanza()
    //     },[detail]);

    // function handleClick(){
    //     History.replace('/home')
    //   }

    // eslint-disable-next-line no-console
    // useEffect(() =>
    // setBreed(breedDetail), [breedDetail]);

    //   let a = breed.filter(a=>a.indb).map(a=>a.temperaments)[0];
    // console.log('aaaaaaaaaaa',breed.filter(a=>a.indb).map(a=>a.temperaments)[0]);
    // console.log(detail.length)
    return (
        <>
            {
                loading ? (<Loading />) :
                    detail === 'error' ? <div> No se ha encontrado el id </div>
                        : detail ? <>
                            <div className={styles.background}>
                                <div className={styles.cardDetailDiv}>
                                <button className={styles.button} onClick={handleClick}>X</button>
                                    <div  className={styles.fontTittle}>{detail.name}</div>
                                    <img className={styles.image} src={detail.image} alt='Imagen no encontrada'></img>
                                    <div>
                                    <label className={styles.fontTittleContent}>
                                       Tamaño Promedio
                                    {
                                        detail.height ? <div>{detail.height.join(' a ') + ' cm'}</div> : null
                                    }
                                    Peso Promedio
                                    {
                                        detail.weight ? <div>{detail.weight.join(' a ') + ' kg'}</div> : null
                                    }
                                    Esperanza de vida
                                    {

                                      detail.life_span? <div>{detail.life_span}</div>:null
                                    }
                                    {
                                        detail && !detail.indb ? <div>{detail.temperaments?detail.temperaments.join('-'):null}</div> : <div>{detail.temperaments.map(a => a.name).join(' , ')}</div>
                                    }
                                    Esperanza de vida promedio
                                    <div>{detail.life_span}</div>
                                    </label>
                                    </div>
                                </div>
                            </div>
                        </> : false
            }


        </>

        // detail === 'error' ? <><div>no se ha encontrado el id</div></> 
        //   :
        //      breed!==null && breed !== undefined && breed?
        //     <>
        //           <div className={styles.background}>
        //          <div className={styles.cardDetailDiv}>

        //             <button className={styles.button} onClick={handleClick}>X</button>
        //             <img className={styles.image} src={breed.image} alt='Imagen No encontrada'></img>
        //             <div>
        //             <div key={breed.id}>{breed.name}</div>
        //             Por lo general tiene estos comportamientos!

        //            <div>{breed.life_span}</div>

        //              {
        //                  breed!==null && breed !== undefined && breed.height?
        //                 <div>{`Altura entre: ${breed.height[0]} a ${breed.height[1]}cm`}</div>
        //             :   <div>{`Altura entre: ${breed.height}cm`}</div>
        //             }
        //             {
        //                 breed.weight? <div>{''}</div>:<></>

        //             }
        //             </div>
        //         </div>
        //             </div>
        //     </>:null

    )




}

export default DogDetail