import React from 'react';
import {connect} from 'react-redux';
import { getBreed } from './redux/actions';
class Home extends React.Component{
    
    
    
    
render(){
        return(
        <>
        
        <h1>Dogshit</h1>
        <div>Hola</div>
        {
            this.props.breed.slice(1,10).map(breed=>
                <h1>{breed.temperaments}</h1>)
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