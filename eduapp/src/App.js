import React from 'react'
//import {Provider} from 'react-redux'
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import {connect} from 'react-redux'
import { checkUser } from './redux/Users/userActions';
//import store from './redux/store';

function App(props) {

  axios.defaults.withCredentials = true;

  const [LoggedIn, setLogin] = useState(false);
  const [Username, setUser] = useState("");
  const [Password, setPassword] = useState("")


  useEffect(() => {
    props.checkUser()
    setLogin(props.loggedIn)
    setUser(props.username)
    setPassword(props.password)
  }, [props.loggedIn])

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
        <Navigation/>
      </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.users.loggedIn,
    username: state.users.username,
    password: state.users.password
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkUser: () => dispatch(checkUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
