import axios from 'axios'
import React, {Component} from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Button, Col, Collapse, Container, FormGroup, Input, Label, Row } from 'reactstrap'

class ForgotPassword extends Component {

    constructor() {
        super()
        this.state = {
            sendotp: false,
            username: '',
            otp: '',
            email: '',
            generatedOTP: '',
            enable_password: false,
            new_password: '',
            user_type: '',
            pass_changed: false
        }
    }

    sendOTP = () => {
        this.setState({
            generatedOTP: Math.floor(Math.random() * 1000000)
        })
        axios.get("http://localhost:5000/users/user", {
            params: {
                username: this.state.username
            }
        })
        .then(response => {
            if(typeof response.data.message !== 'undefined') {
                alert(response.data.message)
            }

            else {
                if(response.data[0].user_type == 0) {
                    axios.get("http://localhost:5000/users/student", {
                        params: {
                            id: response.data[0].user_id
                        }
                    })
                    .then((resp) => {
                        this.setState({
                            email: resp.data[0].email_id,
                            user_type: 0
                        })
                        var body = {
                            type: "otp",
                            receiver: resp.data[0].email_id,
                            first_name: resp.data[0].first_name,
                            last_name: resp.data[0].last_name,
                            otp: this.state.generatedOTP
                        }
                        console.log(body)
                        axios.post("http://localhost:5000/users/sendmail", body)
                        .then(re => {
                            console.log("Email sent successfully")
                        })
                        .catch(err => {
                            console.log("Error in sending mail")
                        })
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
                }
                else {
                    axios.get("http://localhost:5000/users/teacher", {
                        params: {
                            id: response.data[0].user_id,
                            user_type: 1
                        }
                    })
                    .then((resp) => {
                        this.setState({
                            email: resp.data[0].email_id
                        })
                        var body = {
                            type: "otp",
                            receiver: resp.data[0].email_id,
                            first_name: resp.data[0].first_name,
                            last_name: resp.data[0].last_name,
                            otp: this.state.generatedOTP
                        }
                        axios.post("http://localhost:5000/users/sendmail", body)
                        .then(re => {
                            console.log("Email sent successfully")
                        })
                        .catch(err => {
                            console.log("Error in sending mail")
                        })
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
                }
                this.setState({
                    sendotp: true,
                })
            }
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    checkOTP = () => {
        if(this.state.generatedOTP == this.state.otp) {
            this.setState({
                enable_password: true
            })
        }
        else {
            alert("No match")
        }
    }

    changePassword = () => {
        var body = {
            username: this.state.username,
            password: this.state.new_password,
            user_type: this.state.user_type
        }
        axios.post("http://localhost:5000/users/resetPassword", body)
        .then(response => {
            alert("Password has been changed")
            this.setState({
                sendotp: false,
                username: '',
                otp: '',
                email: '',
                generatedOTP: '',
                enable_password: false,
                new_password: '',
                user_type: '',
                pass_changed: true
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    render() {
        return(

            <Container className="toplookout">
                <h2>Forgot Password?</h2>
                {   !this.state.sendotp &&
                    <React.Fragment>
                        <FormGroup row>
                            <Label for="username" sm={2}>Username:</Label>
                            <Col sm={10}>
                                <Input placeholder="Enter your username" id="username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}></Input>      
                            </Col>
                        </FormGroup>    
                        <Button onClick={this.sendOTP} style={{marginBottom: "20px"}}>Send OTP</Button>
                    </React.Fragment>
                }
                    
                <Collapse isOpen={this.state.sendotp}>
                    {   !this.state.enable_password &&
                        <React.Fragment>
                            <p>An OTP has been mailed to <b>{this.state.email}</b></p><p> Please check your email</p>
                            <FormGroup row>
                                <Label for="otp" sm={2}>OTP:</Label>
                                <Col sm={10}>
                                    <Input placeholder="Enter OTP here" id="otp" value={this.state.otp} onChange={(e) => this.setState({otp: e.target.value})}></Input>      
                                </Col>
                            </FormGroup>
                            <Button color="success" onClick={this.checkOTP}>Submit</Button>
                        </React.Fragment>
                    }
                    {
                        this.state.enable_password &&
                        <React.Fragment>
                            <p>Enter your new Password</p>
                            <FormGroup row>
                                <Label for="password" sm={2}>New Password:</Label>
                                <Col sm={10}>
                                    <Input type="password" placeholder="Enter new Password" id="password" value={this.state.new_password} onChange={(e) => this.setState({new_password: e.target.value})}></Input>      
                                </Col>
                            </FormGroup>
                            <Button color="success" onClick={this.changePassword}>Change Password</Button>
                        </React.Fragment>
                    }
                </Collapse>
                {
                    this.state.pass_changed &&
                    <Switch>  
                        <Route path="/ForgotPassword" render={(props) => (<Redirect to="/Login"></Redirect>)}/>
                    </Switch>
                }
            </Container>
        )
    }
}

export default ForgotPassword