import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Container,
  Row,
} from "reactstrap";
import "./Styles.css";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./Login";

axios.defaults.withCredentials = true;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      id: -1,
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email_id: "",
      image_link: "http://localhost:5000/profile_pics/default.png",
      qualification: "",
      grade: 1,
      board: "",
      is_teacher: false,
      type_selected: false,
      register: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var body = this.state;
    axios
      .post("http://localhost:5000/users/register", body)
      .then((response) => {
        if (response.data.affectedRows === 1) {
          this.setState({
            register: true,
            id: response.data.insertId,
          });
          if (this.state.is_teacher) {
            axios
              .post("http://localhost:5000/users/teacher", this.state)
              .then((res) => {
                console.log("success");
              })
              .catch((err) => {
                console.log("fail");
              });
          } else {
            axios
              .post("http://localhost:5000/users/student", this.state)
              .then((res) => {
                console.log("success");
              })
              .catch((err) => {
                console.log("fail");
              });
          }
          alert(`${this.state.username} has been registered`);
          console.log(response.data);
        } else {
          alert("User already exists");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(body);
      });
    if (this.state.register) {
      console.log(this.state);
    }
  };

  handle = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handletype = (e) => {
    this.setState({
      type_selected: true,
      is_teacher:
        e.target[e.target.selectedIndex].value === "teacher" ? true : false,
    });
  };

  handleboard = (e) => {
    this.setState({
      type_selected: true,
      board: e.target[e.target.selectedIndex].value,
    });
  };

  handle_image = (e) => {};

  componentDidUpdate(PrevProps, PrevState) {
    if (PrevState.register != this.state.register) {
      console.log(this.state.register);
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.register && (
          <div className="toplookout">
            <p>Registration Form</p>
            <Container>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Label for="username" sm={2}>
                    Username:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter Username"
                      value={this.state.username}
                      onChange={this.handle}
                      required
                    ></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="first_name" sm={2}>
                    First Name:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="first_name"
                      id="first_name"
                      placeholder="Enter your name"
                      value={this.state.first_name}
                      onChange={this.handle}
                      required
                    ></Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="last_name" sm={2}>
                    Last Name:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="last_name"
                      id="last_name"
                      placeholder="Enter your last name"
                      value={this.state.last_name}
                      onChange={this.handle}
                      required
                    ></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="email" sm={2}>
                    Email Id:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="email_id"
                      id="email_id"
                      placeholder="Enter your email id"
                      value={this.state.email_id}
                      onChange={this.handle}
                      required
                    ></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="is_teacher" sm={2}>
                    Type:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="is_teacher"
                      id="is_teacher"
                      onChange={this.handletype}
                      required
                    >
                      <option value="" disabled selected>
                        Select type
                      </option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                    </Input>
                  </Col>
                </FormGroup>
                {this.state.type_selected && this.state.is_teacher && (
                  <React.Fragment>
                    <FormGroup row>
                      <Label for="qualification" sm={2}>
                        Qualification:
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="qualification"
                          id="qualification"
                          placeholder="Enter your Qualification"
                          value={this.state.qualification}
                          onChange={this.handle}
                          required
                        ></Input>
                      </Col>
                    </FormGroup>
                  </React.Fragment>
                )}
                {this.state.type_selected && !this.state.is_teacher && (
                  <Row>
                    <Col>
                      <FormGroup row>
                        <Label for="grade" sm={2}>
                          Grade:
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="number"
                            name="grade"
                            id="grade"
                            placeholder="Enter your Grade"
                            value={this.state.grade}
                            onChange={this.handle}
                            required
                          ></Input>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup row>
                        <Label for="board" sm={2}>
                          Board:
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            name="board"
                            id="board"
                            placeholder="Enter your board"
                            value={this.state.board}
                            onChange={this.handleboard}
                            required
                          >
                            <option value="" disabled selected>
                              Select type
                            </option>
                            <option value="SSC">SSC</option>
                            <option value="CBSE">CBSE</option>
                            <option value="ICSE">ICSE</option>
                            <option value="other">other..</option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                <FormGroup row>
                  <Label for="password" sm={2}>
                    Password:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={this.handle}
                      required
                    ></Input>
                  </Col>
                </FormGroup>
                <FormGroup>
                  Already have an account? <Link to="/Login">Sign in</Link>
                </FormGroup>
                <Button>Register</Button>
              </Form>
            </Container>
          </div>
        )}
        {this.state.register && (
          <Container>
            <Switch>
              <Route path="/Login" render={(props) => <Login />} />
              <Route
                path="/Register"
                render={(props) => <Redirect to="/Login"></Redirect>}
              />
            </Switch>
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default Register;
