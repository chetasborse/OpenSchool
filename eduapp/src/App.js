import React from 'react'
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation/Navigation';

function App() {

  axios.defaults.withCredentials = true;

  const [LoggedIn, setLogin] = useState(false);
  const [Username, setUser] = useState("");
  const [Password, setPassword] = useState("")


  useEffect(() => {
    axios.get("http://localhost:5000/users/login")
    .then((response) => {

      if(response.data.loggedIn === true) {
        setLogin(true);
        setUser(response.data.user[0].username)
        setPassword(response.data.user[0].password)
      }
      else {
        setLogin(false);
      }
    })
    .catch(error => {
      console.log(error)
    })
  }, [LoggedIn])

  const logout = () => {
    axios.post("http://localhost:5000/users/logout")
    .then((response) => {
      console.log(`Response after logout is ${response.data.loggedIn}`);
      setLogin(false);
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <Navigation setLogin={setLogin} LoggedIn={LoggedIn} logout={logout} username={Username} password={Password}/>
    </div>
  );
}

export default App;
