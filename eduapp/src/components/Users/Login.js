import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Col, Container } from 'reactstrap';
import './Styles.css'
import { Link } from 'react-router-dom';


axios.defaults.withCredentials = true;

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        var body = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post("http://localhost:5000/users/login", body)
        .then(response => {
            // console.log(response.data.message);
            if(typeof response.data.message !== 'undefined') {
                alert(response.data.message)
            }
            else {
                alert("Welcome user")
                this.props.setLogin(true)
            }
        })
        .catch(error => {
            console.log(error)
        })

    }

    render() {
        return(

        <div className="toplookout">
            <p>Login Form</p>
            <Container>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label for="username" sm={2}>Username</Label>
                    <Col sm={10}>
                        <Input type="text" name="username" id="username" placeholder="Enter Username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}></Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="password" sm={2}>Password</Label>
                    <Col sm={10}>
                        <Input type="password" name="password" id="password" placeholder="Enter Passsword" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}></Input>
                    </Col>
                </FormGroup>
                <FormGroup>
                        Don't have an account? <Link to="/Register">Sign up</Link>
                </FormGroup>
                <Button>Login</Button>
            </Form>
            </Container>
        </div>
        )
    }
}

export default Login;