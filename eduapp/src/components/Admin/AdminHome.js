import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Col, Collapse, Container, Table } from "reactstrap";
import { fetchAllUsers, verifyTeacher } from "../../redux/Admin/adminActions";

class AdminHome extends Component {
  constructor() {
    super();
    this.state = {
      teacher_toggle: true,
      student_toggle: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllusers();
  }

  // refresh = () => {
  //     this.props.fetchAllUsers();
  // }

  toggle_mentor = () => {
    this.setState({
      teacher_toggle: !this.state.teacher_toggle,
    });
  };

  toggle_student = () => {
    this.setState({
      student_toggle: !this.state.student_toggle,
    });
  };

  verify = (id, email_id, first_name, last_name) => {
    // alert(`verified ${id}`)
    const data = {
      user_id: id,
    };
    axios
      .post("http://localhost:5000/users/verify", data)
      .then((response) => {
        alert("Profile verified");
        const value = {
          user_id: id,
          verify: 1,
        };
        this.props.verifyUser(value);
        var bod = {
          type: "send_verification",
          receiver: email_id,
          first_name: first_name,
          last_name: last_name,
        };
        axios
          .post("http://localhost:5000/users/sendmail", bod)
          .then((re) => {
            console.log("Email sent successfully");
          })
          .catch((err) => {
            console.log("Error in sending mail");
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  suspend = (id, email_id, first_name, last_name) => {
    const data = {
      user_id: id,
    };
    axios
      .post("http://localhost:5000/users/suspend", data)
      .then((response) => {
        alert("Profile suspended");
        const value = {
          user_id: id,
          verify: 2,
        };
        this.props.verifyUser(value);
        var bod = {
          type: "send_suspension",
          receiver: email_id,
          first_name: first_name,
          last_name: last_name,
        };
        axios
          .post("http://localhost:5000/users/sendmail", bod)
          .then((re) => {
            console.log("Email sent successfully");
          })
          .catch((err) => {
            console.log("Error in sending mail");
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    var mentor_table = this.props.teachers.map((teacher) => (
      <tr key={teacher.user_id}>
        <td>{teacher.user_id}</td>
        <td>
          {teacher.first_name} {teacher.last_name}
        </td>
        <td>{teacher.email_id}</td>
        <td>{teacher.qualification}</td>
        <td>{teacher.u_files}</td>
        <td>
          {teacher.verfied == 0 ? (
            <React.Fragment>
              <Button
                color="success"
                onClick={() =>
                  this.verify(
                    teacher.user_id,
                    teacher.email_id,
                    teacher.first_name,
                    teacher.last_name
                  )
                }
              >
                &#10004;
              </Button>
              <Button
                color="danger"
                onClick={() =>
                  this.suspend(
                    teacher.user_id,
                    teacher.email_id,
                    teacher.first_name,
                    teacher.last_name
                  )
                }
              >
                &#10006;
              </Button>
            </React.Fragment>
          ) : teacher.verfied == 1 ? (
            <p style={{ color: "green" }}>Verified</p>
          ) : (
            <p style={{ color: "red" }}>Suspended</p>
          )}
        </td>
      </tr>
    ));

    var student_table = this.props.students.map((student) => (
      <tr key={student.user_id}>
        <td>
          {student.first_name} {student.last_name}
        </td>
        <td>{student.email_id}</td>
        <td>{student.grade}</td>
        <td>{student.board}</td>
      </tr>
    ));

    return (
      <div>
        <Container>
          <Col style={{ textAlign: "center" }}>
            <h2>Welcome to the admin page</h2>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button color="danger" onClick={() => this.props.fetchAllusers()}>
              Refresh Tab
            </Button>
          </Col>
        </Container>
        <Button
          color="warning"
          onClick={this.toggle_mentor}
          style={{ marginBottom: "1rem" }}
        >
          Mentors
        </Button>
        <Collapse isOpen={this.state.teacher_toggle}>
          <Container
            style={{
              border: "1px solid black",
              height: "500px",
              overflow: "auto",
            }}
          >
            <Table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Qualification</th>
                  <th>Uploaded Documents</th>
                  <th>Verify</th>
                </tr>
              </thead>
              <tbody>{mentor_table}</tbody>
            </Table>
          </Container>
        </Collapse>
        <br></br>
        <Button
          color="warning"
          onClick={this.toggle_student}
          style={{ marginBottom: "1rem" }}
        >
          Students
        </Button>
        <Collapse isOpen={this.state.student_toggle}>
          <Container
            style={{
              border: "1px solid black",
              height: "500px",
              overflow: "auto",
            }}
          >
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Grade</th>
                  <th>Board</th>
                </tr>
              </thead>
              <tbody>{student_table}</tbody>
            </Table>
          </Container>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teachers: state.admin.teachers,
    students: state.admin.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllusers: () => dispatch(fetchAllUsers()),
    verifyUser: (value) => dispatch(verifyTeacher(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
