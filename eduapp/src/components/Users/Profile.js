import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import {
  checkUser,
  getLanguage,
  getlanguage,
  getSubject,
  removeLanguage,
  removeSubject,
} from "../../redux/Users/userActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_profile: false,
      first_name: props.first_name,
      last_name: props.last_name,
      email_id: props.email_id,
      grade: props.grade,
      board: props.board,
      qualification: props.qualification,
      add_language: false,
      add_subject: false,
      languages: [],
      subjects: [],
      selected_subject: "",
      selected_subject_id: "",
      selected_language: "",
      selected_language_id: "",
      profile_photo: null,
    };
  }

  toggle_profile = () => {
    this.setState({
      edit_profile: !this.state.edit_profile,
    });
  };

  toggle_language = () => {
    this.setState({
      add_language: !this.state.add_language,
    });
  };

  toggle_subject = () => {
    this.setState({
      add_subject: !this.state.add_subject,
    });
  };

  complete_edit = () => {
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email_id)) {
      this.toggle_profile();
      const data = new FormData();
      data.append("file", this.state.profile_photo);
      data.append("user_id", this.props.user_id);
      data.append("first_name", this.state.first_name);
      data.append("last_name", this.state.last_name);
      data.append("email_id", this.state.email_id);
      data.append("grade", this.state.grade);
      data.append("board", this.state.board);
      data.append("qualification", this.state.qualification);
      data.append("oldurl", this.props.image_link);
      if (this.props.is_teacher) {
        axios
          .post("http://localhost:5000/users/editteacher", data)
          .then((response) => {
            this.props.checkUser();
            alert("Profile updated");
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        axios
          .post("http://localhost:5000/users/editstudent", data)
          .then((response) => {
            this.props.checkUser();
            alert("Profile updated");
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    }
    else {
      alert("Please enter a valid email address")
    }
  };

  componentDidMount() {
    this.setState({
      languages: this.props.all_languages,
      subjects: this.props.all_subjects,
    });
  }

  handle = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
      profile_photo: e.target.files[0],
    });
  };

  addSubject = (e) => {
    if (
      this.props.subjects.some(
        (sub) => sub.subject_name === this.state.selected_subject
      )
    ) {
      alert(`${this.state.selected_subject} already exists in your favorites`);
    } else if (this.state.selected_subject_id != "") {
      this.props.getSubject(this.props.user_id, this.props.is_teacher, {
        id: parseInt(this.state.selected_subject_id),
        sub: this.state.selected_subject,
      });
      this.setState({
        selected_subject_id: "",
        selected_subject: "",
      });
      this.toggle_subject();
    } else {
      alert("Please select a subject");
    }
  };

  addLanguage = (e) => {
    if (
      this.props.languages.some(
        (lang) => lang.language_name === this.state.selected_language
      )
    ) {
      alert(`${this.state.selected_language} already exists in your favorites`);
    } else if (this.state.selected_language_id) {
      this.props.getLanguage(this.props.user_id, {
        id: parseInt(this.state.selected_language_id),
        lang: this.state.selected_language,
      });
      this.setState({
        selected_language_id: "",
        selected_language: "",
      });
      this.toggle_language();
    } else {
      alert("Please select a language");
    }
  };

  deleteSubject = (id, sub) => {
    this.props.removeSubject(this.props.user_id, this.props.is_teacher, id);
  };

  deleteLanguage = (id, lang) => {
    this.props.removeLanguage(this.props.user_id, id);
  };

  render() {
    const {
      username,
      first_name,
      last_name,
      email_id,
      session_taken,
      image_link,
      grade,
      board,
      qualification,
      rating_points,
      is_teacher,
    } = this.props;

    var subjects = this.props.subjects ? (
      this.props.subjects.map((subject, index) => (
        <React.Fragment key={subject.subject_id}>
          <Row>
            <Col sm={1}></Col>
            <Col sm={8}>
              <div id="pref-list-item">{subject.subject_name}</div>
            </Col>
            <Col sm={2}>
              <i
                className="bi bi-x-square-fill"
                onClick={() =>
                  this.deleteSubject(subject.subject_id, subject.subject_name)
                }
              ></i>
            </Col>
            <Col sm={1}></Col>
          </Row>
        </React.Fragment>
      ))
    ) : (
      <React.Fragment></React.Fragment>
    );

    var languages =
      this.props.languages !== undefined ? (
        this.props.languages.map((language, index) => (
          // <div key={language.language_id}>{index + 1} {language.language_name}</div>
          <React.Fragment key={language.language_id}>
            <Row>
              <Col sm={1}></Col>
              <Col sm={8}>
                <div id="pref-list-item">{language.language_name}</div>
              </Col>
              <Col sm={2}>
                <i
                  className="bi bi-x-square-fill"
                  onClick={() =>
                    this.deleteLanguage(
                      language.language_id,
                      language.language_name
                    )
                  }
                ></i>
              </Col>
              <Col sm={1}></Col>
            </Row>
          </React.Fragment>
        ))
      ) : (
        <React.Fragment></React.Fragment>
      );

    var all_subjects = this.state.subjects.map((subject) => (
      <option
        key={subject.subject_id}
        value={subject.subject_name}
        id={subject.subject_id}
      >
        {subject.subject_name}
      </option>
    ));

    var all_languages = this.state.languages.map((language) => (
      <option
        key={language.language_id}
        value={language.language_name}
        id={language.language_id}
      >
        {language.language_name}
      </option>
    ));

    return (
      <Container className="toplookout">
        <div className="profile-wrapper">
          <Row className="justify-content-center">
            <Col sm={9}>
              <div className="profile-section">
                <Row>
                  <Col>
                    {/* <p>Image Link: {image_link}</p> */}
                    <img
                      src={this.props.image_link}
                      className="profilepic"
                    ></img>
                  </Col>
                  <Col>
                    {!this.state.edit_profile && (
                      <React.Fragment>
                        <p>
                          Username: <b>{username}</b>
                        </p>
                        <p>
                          Name:{" "}
                          <b>
                            {first_name} {last_name}
                          </b>
                        </p>
                        <p>
                          Email: <b>{email_id}</b>
                        </p>
                        {is_teacher && (
                          <React.Fragment>
                            <p>
                              Qualification: <b>{qualification}</b>
                            </p>
                            <p>
                              Average Rating Points:{" "}
                              <b>
                                {(rating_points / session_taken).toFixed(2)}
                              </b>
                            </p>
                          </React.Fragment>
                        )}
                        {!is_teacher && (
                          <React.Fragment>
                            <p>
                              Grade: <b>{grade}</b>
                            </p>
                            <p>
                              Board: <b>{board}</b>
                            </p>
                          </React.Fragment>
                        )}
                        <p>
                          Sessions done: <b>{session_taken}</b>
                        </p>
                        <Button
                          className="btn btn-info"
                          onClick={this.toggle_profile}
                        >
                          <i className="bi bi-pencil-fill"></i> Edit Profile
                        </Button>
                      </React.Fragment>
                    )}
                    {this.state.edit_profile && (
                      <React.Fragment>
                        <Form>
                          <FormGroup row>
                            <Label for="first_name">First Name:</Label>
                            <Col sm={12}>
                              <Input
                                type="text"
                                name="first_name"
                                id="first_name"
                                placeholder="Enter your name"
                                value={this.state.first_name}
                                onChange={this.handle}
                              ></Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="last_name">Last Name:</Label>
                            <Col sm={12}>
                              <Input
                                type="text"
                                name="last_name"
                                id="last_name"
                                placeholder="Enter your last name"
                                value={this.state.last_name}
                                onChange={this.handle}
                              ></Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="email">Email Id:</Label>
                            <Col sm={12}>
                              <Input
                                type="text"
                                name="email_id"
                                id="email_id"
                                placeholder="Enter your email id"
                                value={this.state.email_id}
                                onChange={this.handle}
                              ></Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="file">Profile Photo:</Label>
                            <Col sm={12}>
                              <Input
                                type="file"
                                name="file"
                                id="file"
                                placeholder="Upload a profile photo"
                                onChange={this.handle_file}
                              ></Input>
                            </Col>
                          </FormGroup>
                          {this.props.is_teacher && (
                            <FormGroup row>
                              <Label for="qualification">Qualification:</Label>
                              <Col sm={12}>
                                <Input
                                  type="text"
                                  name="qualification"
                                  id="qualification"
                                  placeholder="Enter your Qualification"
                                  value={this.state.qualification}
                                  onChange={this.handle}
                                ></Input>
                              </Col>
                            </FormGroup>
                          )}
                          {!this.props.is_teacher && (
                            <React.Fragment>
                              <FormGroup row>
                                <Label for="grade">Grade:</Label>
                                <Col sm={12}>
                                  <Input
                                    type="number"
                                    name="grade"
                                    id="grade"
                                    placeholder="Enter your Grade"
                                    value={this.state.grade}
                                    onChange={this.handle}
                                  ></Input>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label for="board">Board:</Label>
                                <Col sm={12}>
                                  <Input
                                    type="select"
                                    name="board"
                                    id="board"
                                    placeholder="Enter your board"
                                    value={this.state.board}
                                    onChange={this.handleboard}
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
                            </React.Fragment>
                          )}
                        </Form>
                        <Button
                          className="row-btns"
                          color="success"
                          onClick={this.complete_edit}
                        >
                          Save
                        </Button>
                        <Button
                          className="row-btns"
                          onClick={this.toggle_profile}
                        >
                          Cancel
                        </Button>
                      </React.Fragment>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <Row className="justify-content-center">
            <Col sm={6}>
              <div className="profile-section">
                <h5>What subjects are you interested in?</h5>
                <br />
                {subjects}
                {this.state.add_subject && (
                  <React.Fragment>
                    <Row>
                      <Col sm={10}>
                        <Input
                          type="select"
                          onChange={(e) =>
                            this.setState({
                              selected_subject_id:
                                e.target[e.target.selectedIndex].id,
                              selected_subject:
                                e.target[e.target.selectedIndex].value,
                            })
                          }
                        >
                          <option value="" disabled selected>
                            Select subject
                          </option>
                          {all_subjects}
                        </Input>
                      </Col>
                      <Col sm={2}>
                        <i
                          class="bi bi-check-square-fill"
                          onClick={this.addSubject}
                        ></i>
                      </Col>
                    </Row>
                  </React.Fragment>
                )}
                <br />
                <button className="btn btn-info" onClick={this.toggle_subject}>
                  Add Subject
                </button>
              </div>
            </Col>
            {this.props.is_teacher && (
              <Col sm={6}>
                <div className="profile-section">
                  <h5>What languages are you comfortable with?</h5>
                  <br />
                  {languages}
                  {this.state.add_language && (
                    <React.Fragment>
                      <Row>
                        <Col sm={10}>
                          <Input
                            type="select"
                            onChange={(e) =>
                              this.setState({
                                selected_language_id:
                                  e.target[e.target.selectedIndex].id,
                                selected_language:
                                  e.target[e.target.selectedIndex].value,
                              })
                            }
                          >
                            <option value="" disabled selected>
                              Select language
                            </option>
                            {all_languages}
                          </Input>
                        </Col>
                        <Col sm={2}>
                          <i
                            class="bi bi-check-square-fill"
                            onClick={this.addLanguage}
                          ></i>
                        </Col>
                      </Row>
                    </React.Fragment>
                  )}
                  <br />
                  <button
                    className="btn btn-info"
                    onClick={this.toggle_language}
                  >
                    Add Language
                  </button>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.users.user_id,
    username: state.users.username,
    first_name: state.users.first_name,
    last_name: state.users.last_name,
    email_id: state.users.email_id,
    session_taken: state.users.session_taken,
    image_link: state.users.image_link,
    grade: state.users.grade,
    board: state.users.board,
    qualification: state.users.qualification,
    rating_points: state.users.rating_points,
    is_teacher: state.users.is_teacher,
    languages: state.users.languages,
    subjects: state.users.subjects,
    all_subjects: state.users.all_subjects,
    all_languages: state.users.all_languages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkUser: () => dispatch(checkUser()),
    getSubject: (id, type, sub) => dispatch(getSubject(id, type, sub)),
    getLanguage: (id, lang) => dispatch(getLanguage(id, lang)),
    removeSubject: (id, type, sub) => dispatch(removeSubject(id, type, sub)),
    removeLanguage: (id, lang) => dispatch(removeLanguage(id, lang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
