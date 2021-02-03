import React, { Component } from 'react';
import {connect} from 'react-redux'
import { logout } from '../../redux/Users/userActions';
import axios from 'axios'

class Logout extends Component {
    removeout = () => {
        axios.post("http://localhost:5000/users/logout")
        .then((response) => {
            console.log(`Response after logout is ${response.data.loggedIn}`);
            this.props.logout()
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return(
            <div className="toplookout">
                <p>Do you wish to logout?</p>
                <button onClick={this.removeout}>Yes</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (data) => dispatch(logout(data))
    }
}

export default connect(null, mapDispatchToProps)(Logout)