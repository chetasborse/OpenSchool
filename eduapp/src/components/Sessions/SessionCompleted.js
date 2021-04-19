import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

class SessionCompleted extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      rate: 3,
      feedback: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  rate = () => {
    const body = {
      rate: this.state.rate,
      session_id: this.props.session_id,
    };
    axios
      .post("http://localhost:5000/session/session_completed", body)
      .then((response) => {
        alert("Review submitted");
        const body1 = {
          review: this.state.rate,
          user_id: this.props.teacher_id,
          student_id: this.props.user_id,
        };
        var bod = {
          topic: this.props.topic,
          review: this.state.rate,
          first_name: this.props.first_name,
          last_name: this.props.last_name,
        };
        bod.type = "finish_student";
        bod.receiver = this.props.email_id;
        axios
          .post("http://localhost:5000/users/sendmail", bod)
          .then((res) => {
            console.log("email sent");
          })
          .catch((err) => {
            console.log("error in sending mail");
          });
        bod.type = "finish_teacher";
        bod.receiver = this.props.email;
        bod.first_name = this.props.first;
        bod.last_name = this.props.last;
        axios
          .post("http://localhost:5000/users/sendmail", bod)
          .then((res) => {
            console.log("email sent");
          })
          .catch((err) => {
            console.log("error in sending mail");
          });
        axios
          .post("http://localhost:5000/users/update_points", body1)
          .then((resp) => {
            console.log("Points updated");
            axios
              .post("http://localhost:5000/users/update_session_count", body1)
              .then((resp1) => {
                console.log("Count incremented");
              })
              .catch((err1) => {
                console.log(err1.message);
              });
          })
          .catch((err) => {
            console.log("Error in updating points");
          });
        this.props.refresh();
      })
      .catch((err) => {
        console.log(err.message);
      });
    this.toggle();
  };

  sendReviewMail = () => {
    this.setState({
      feedback: true
    })
    var bod = {
      topic: this.props.topic,
      review: this.state.rate,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
    };
    bod.type = "send_review";
    bod.receiver = this.props.email_id;
    axios
      .post("http://localhost:5000/users/sendmail", bod)
      .then((res) => {
        console.log("email sent");
      })
      .catch((err) => {
        console.log("error in sending mail");
      });
  };

  handle = (e) => {
    this.setState({
      rate: parseInt(e.target[e.target.selectedIndex].value),
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Button color="success" onClick={this.toggle}>
            Session Completed
          </Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Rate the experience</ModalHeader>
          <ModalBody>
            <FormGroup row>
            <Label sm={8}>Receive Email for Feedback Link - {this.state.feedback && <b>Sent</b>}</Label>
              {
                !this.state.feedback ?
                <Button color="success" onClick={this.sendReviewMail}>
                  Receive
                </Button>:null
              }
              <Input type="checkbox">d</Input>
              <Label for="rate" sm={10}>
                Ratings:
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="rate"
                  id="rate"
                  onChange={this.handle}
                  value={this.state.rate}
                >
                  <option value="" disabled selected>
                    Select rating
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Input>
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.rate}>
              Rate
            </Button>
            <Button color="danger" onClick={this.toggle}>
              Back
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.users.user_id,
    email_id: state.users.email_id,
    first: state.users.first_name,
    last: state.users.last_name,
  };
};

export default connect(mapStateToProps)(SessionCompleted);
