import React, { Component } from 'react';

class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: this.props.LoggedIn
        }
    }

    render() {
        return(
            <div className="toplookout">
                <p>Do you wish to logout?</p>
                <button onClick={this.props.logout}>Yes</button>
            </div>
        )
    }
}

export default Logout