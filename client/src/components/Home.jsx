import React from 'react';
import {connect} from 'react-redux';
import { getBreed } from './redux/actions';
import { DogCard } from './DogCard';
class Home extends React.Component{
    
    
    
    
render(){
        return(
        <>
        <DogCard/>
        <h1>Dogshit</h1>
        {
            this.props.breed.map(breed=>
                <div key={breed.name}>{breed.temperaments}</div>)
        }
        </>
        )};
}


const mapStateToProps = (state)=>{
    return{
        breed: state.breed
    }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    getBreed: dispatch(getBreed())
  }
    
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);