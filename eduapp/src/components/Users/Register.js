import React, {Component} from 'react';
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, Col, Container } from 'reactstrap';
import './Styles.css'
import { BrowserRouter as Router, Link, Redirect, Switch, Route } from 'react-router-dom';
import Login from './Login';

axios.defaults.withCredentials = true;

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            register: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        var body = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post("http://localhost:5000/users/register", body)
        .then(response => {
            if(response.data.affectedRows === 1) {
                this.setState({
                    register: true
                })
                alert(`${this.state.username} has been registered`)
            }
            else {
                alert("User already exists");
            }
        })
        .catch(error => {
            console.log(error)
            console.log(body)
        })
    }

    componentDidUpdate(PrevProps, PrevState) {
        if(PrevState.register != this.state.register) {
            console.log(this.state.register)
        }
    }

    render() {
        return(
            <React.Fragment>
        
            {!this.state.register &&
                <div className="toplookout">
                    <p>Registration Form</p>
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
                            Already have an account? <Link to="/Login">Sign in</Link>
                        </FormGroup>
                        <Button>Register</Button>
                    </Form>
                    </Container>
                </div>
            }
            {
                this.state.register &&
                <Container>
                        <Switch> 
                            <Route path="/Login" render={(props) => (<Login/>)}/>   
                            <Route path="/Register" render={(props) => (<Redirect to="/Login"></Redirect>)}/>
                        </Switch>
                </Container>
            }
            </React.Fragment>
        )
    }
}

export default Register;