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
import KeyFailed from './Components/keyFailed'
import DocumentationRoutes from './Components/Documentation/DocumentationRoutes';

function App() {

  let [ loggedIn, setLoggedIn ] = useState(true)
  let [ keyValid, setKeyValid ] = useState(true)
  let [ level, setLevel ] = useState('loading')
  let checkLogin = async () => {
    let code = localStorage.getItem('passcode')
    let level = localStorage.getItem('level')
    let {data} = await axiosScript('post', '/api/verify/verifyCode', {passcode: code, level: level})
    console.log(data)
    if(!data.success){
      return setLoggedIn(false)
      
    }
    else {
      setLevel(data.level)
    }
  }

  let checkKey = async () => {
    let {data} = await axiosScript('post', '/api/verify/verifyKey', {key: '/N?$@*4|0"8C>_P`F#A6~$:+zJai<x'})
    if(data.success) return console.log('keyfound')
    return setKeyValid(false)
  }

  useEffect(()=>{
    checkLogin()
    checkKey()
  },[])
  
  return (
    <div className="App">
      <Route path={`/main`}>
        <MainPanel level={level}/>
      </Route>
      <Route path={`${process.env.PUBLIC_URL}/admin`}>
        {level === 'admin' || 'loading' ? <AdminMain/> : <Redirect to='/main'/>}
      </Route>
      <Route path={`${process.env.PUBLIC_URL}/login`}>
        {!loggedIn ? <Login/> : <Redirect to='/main'/>}
      </Route>
      <Route path={'/documentation'}>
        <DocumentationRoutes/>
      </Route>
      <Route path={`/`}>
        {!loggedIn ? <Redirect to={`${process.env.PUBLIC_URL}/login`}/> : !keyValid ? <Redirect to={`${process.env.PUBLIC_URL}/keyFailed`}/> : null}
      </Route>
      <Route exact path={'/'}>
        <Redirect to={'/main'}/>
      </Route>
      <Route path={'/keyFailed'}>
        {!keyValid ? <KeyFailed/> : <Redirect to={'/main'}/>}
      </Route>
    </div>
  );
}

export default App;
