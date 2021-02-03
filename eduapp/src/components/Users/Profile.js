import React, { Component } from "react";
import { Container } from "reactstrap";
import {connect} from "react-redux"

class Profile extends Component {
    render() {
        return(
            <Container className="toplookout">
                <p>Username: {this.props.username1}</p>
                <p>Hashed Password: {this.props.password1}</p>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        username1: state.users.username,
        password1: state.users.password
    }
}

export default connect(mapStateToProps)(Profile);