import React from 'react'
//import {Provider} from 'react-redux'
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import {connect} from 'react-redux'
import { checkUser, getInterest, set_all_lang_and_subs } from './redux/Users/userActions';
//import store from './redux/store';

function App(props) {

  axios.defaults.withCredentials = true;

  const [LoggedIn, setLogin] = useState(false);
  const [Username, setUser] = useState("");
  const [Password, setPassword] = useState("");
  const [all_langs, set_langs] = useState([]);
  const [all_subs, set_subs] = useState([]);


  useEffect(() => {
    props.checkUser()
    setLogin(props.loggedIn)
    setUser(props.username)
    setPassword(props.password)
    
  }, [props.loggedIn])

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
    password: state.users.password,
    user_id: state.users.user_id,
    is_teacher: state.users.is_teacher,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkUser: () => dispatch(checkUser()),
    // set_all_langs_and_subs: (value) => dispatch(set_all_lang_and_subs(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
