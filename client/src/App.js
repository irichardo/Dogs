import './App.css';
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import  DogDetail  from './components/DogDetail';
import  Form  from './components/Form';
function App() {
  return (
    <div className="App">
      <Switch>
      <Route path="/home" component={Home} />
      <Route path="/createdog" component={Form} />
      <Route path='/dogdetail/:id' component={DogDetail}/>
      </Switch>
    </div>
  );
}

export default App;
