import React, { Component } from "react";
import { Container } from "reactstrap";

class Profile extends Component {
    render() {
        return(
            <Container className="toplookout">
                <p>Username: {this.props.username}</p>
                <p>Hashed Password: {this.props.password}</p>
            </Container>
        )
    }
}

export default Profile;