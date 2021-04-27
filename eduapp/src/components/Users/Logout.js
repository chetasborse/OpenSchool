import React, { Component } from 'react';
import {connect} from 'react-redux'
import { logout } from '../../redux/Users/userActions';
import axios from 'axios'
import { sess_logout } from '../../redux/Session/sessionAction';

class Logout extends Component {
    removeout = () => {
        axios.post("http://localhost:5000/users/logout")
        .then((response) => {
            console.log(`Response after logout is ${response.data.loggedIn}`);
            this.props.logout()
            this.props.session_logout()
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return(
            <div className="toplookout">
              <main role="main" className="text-center">
                <i class="bi bi-exclamation-triangle"></i><br/><br/>
                <h4>Are you sure you want to logout?</h4>
                <button className="btn btn-warning btn-lg" onClick={this.removeout}>Yes</button>
              </main>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (data) => dispatch(logout(data)),
        session_logout: () => dispatch(sess_logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)
