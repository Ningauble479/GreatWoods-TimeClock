import './App.css';
import { useState } from 'react'
import MainPanel from './Components/MainPanel';
import {
  Route,
  Redirect
} from "react-router-dom";
import AdminMain from './Components/admin/main';
import Login from './Components/login'

function App() {

  let [ loggedIn, setLoggedIn ] = useState(true)
  return (
    <div className="App">
      <Route path='/main'>
        <MainPanel/>
      </Route>
      <Route path='/admin'>
        <AdminMain/>
      </Route>
      <Route path='/login'>
        <Login/>
      </Route>
      <Route exact path='/'>
        {loggedIn ? <Redirect to='/main'/> : <Redirect to='/login'/>}
      </Route>
    </div>
  );
}

export default App;
