import './App.css';
import { useEffect, useState } from 'react'
import MainPanel from './Components/MainPanel';
import {
  Route,
  Redirect
} from "react-router-dom";
import AdminMain from './Components/admin/main';
import Login from './Components/login'
import axiosScript from './scripts/axiosScripts';

function App() {

  let [ loggedIn, setLoggedIn ] = useState(false)
  let [ level, setLevel ] = useState(null)
  let checkLogin = async () => {
    let code = localStorage.getItem('passcode')
    let level = localStorage.getItem('level')
    let {data} = await axiosScript('post', '/api/verify/verifyCode', {passcode: code, level: level})
    console.log(data)
    if(data.success){
      setLoggedIn(true)
      setLevel(data.level)
    }
  }

  useEffect(()=>{
    checkLogin()
  },[])
  return (
    <div className="App">
      <Route path={`/main`}>
        <MainPanel level={level}/>
      </Route>
      <Route path={`${process.env.PUBLIC_URL}/admin`}>
        {level === 'admin' ? <AdminMain/> : <Redirect to='/main'/>}
      </Route>
      <Route path={`${process.env.PUBLIC_URL}/login`}>
        <Login/>
      </Route>
      <Route path={`/`}>
        {loggedIn ? <Redirect to={`${process.env.PUBLIC_URL}/main`}/> : <Redirect to={`${process.env.PUBLIC_URL}/login`}/>}
      </Route>
    </div>
  );
}

export default App;
