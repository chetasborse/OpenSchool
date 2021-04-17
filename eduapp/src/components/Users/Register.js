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
import cover from "../../reg_cover.png";

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
      qualification_proof: "",
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
          const data = new FormData();
          data.append("file", this.state.qualification_proof);
          data.append("id", response.data.insertId);
          data.append("first_name", this.state.first_name);
          data.append("last_name", this.state.last_name);
          data.append("email_id", this.state.email_id);
          data.append("image_link", this.state.image_link);
          data.append("qualification", this.state.qualification);
          if (this.state.is_teacher) {
            axios
              .post("http://localhost:5000/users/teacher", data)
              .then((res) => {
                console.log("success");
              })
              .catch((err) => {
                console.log(err);
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
          alert("User already exists.\nTry signing in.");
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

  handle_file = (e) => {
    this.setState({
      qualification_proof: e.target.files[0],
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
            <main role="main" class="container">
              <div className="row" id="login-content">
                <div className="col-12 col-md-5">
                  <br />
                  <h2 id="pre-title">
                    <b>Welcome to</b>
                  </h2>
                  <h1 id="title">
                    <b>OpenSchool</b>
                  </h1>
                  <br />
                  <br />
                  <img src={cover} id="cover" alt="graphic" width="100%" />
                </div>

                <div className="content-section col-12 col-md-7">
                  <br />
                  <h3>Create Account</h3>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label for="username" sm={3}>
                        Username:
                      </Label>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter Username"
                        value={this.state.username}
                        onChange={this.handle}
                        required
                      ></Input>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="first_name" sm={3}>
                        First Name:
                      </Label>
                      <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="Enter your name"
                        value={this.state.first_name}
                        onChange={this.handle}
                        required
                      ></Input>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="last_name" sm={3}>
                        Last Name:
                      </Label>
                      <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Enter your last name"
                        value={this.state.last_name}
                        onChange={this.handle}
                        required
                      ></Input>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="email" sm={3}>
                        Email Id:
                      </Label>
                      <Input
                        type="email"
                        name="email_id"
                        id="email_id"
                        placeholder="Enter your email id"
                        value={this.state.email_id}
                        onChange={this.handle}
                        required
                      ></Input>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="is_teacher" sm={12}>
                        Are you a student or a mentor?
                      </Label>
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
                        <option value="teacher">Mentor</option>
                        <option value="student">Student</option>
                      </Input>
                    </FormGroup>
                    {this.state.type_selected && this.state.is_teacher && (
                      <React.Fragment>
                        <FormGroup row>
                          <Label for="qualification" sm={3}>
                            Qualification:
                          </Label>
                          <Input
                            type="text"
                            name="qualification"
                            id="qualification"
                            placeholder="Enter highest degree completed / current academic post"
                            value={this.state.qualification}
                            onChange={this.handle}
                            required
                          ></Input>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="file" sm={12}>
                            Proof of qualification:
                          </Label>
                          <Input
                            type="file"
                            name="file"
                            id="file"
                            placeholder="Upload a proof"
                            onChange={this.handle_file}
                            required
                          ></Input>
                        </FormGroup>
                      </React.Fragment>
                    )}
                    {this.state.type_selected && !this.state.is_teacher && (
                      <Row>
                        <FormGroup row>
                          <Label for="grade" sm={3}>
                            Grade:
                          </Label>
                          <Input
                            type="number"
                            name="grade"
                            id="grade"
                            placeholder="Enter your Grade"
                            value={this.state.grade}
                            onChange={this.handle}
                            required
                          ></Input>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="board" sm={3}>
                            Board:
                          </Label>
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
                        </FormGroup>
                      </Row>
                    )}
                    <FormGroup row>
                      <Label for="password" sm={3}>
                        Password:
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={this.handle}
                        required
                      ></Input>
                    </FormGroup>
                    <Button className="btn btn-info" id="login-btn">
                      Sign Up
                    </Button>
                    <FormGroup>
                      Already have an account? <Link to="/Login">Sign in</Link>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </main>
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
