import axios from 'axios'
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { fetch_home } from '../../redux/Session/sessionAction';

class PendingReqMentor extends Component {
    constructor() {
        super()
        this.state = {
            modal: false,
            teacher: '',
        }
    }

    toggle = () => {
        if(!this.state.modal) {
            axios.get("http://localhost:5000/users/teacher", {
                params : {
                    id: this.props.user_id
                }
            })
            .then(response => {
                this.setState({
                    teacher: response.data[0]
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
        this.setState({
            modal: !this.state.modal,
            open: 1
        })
    }

    confirm_sess = () => {
        console.log(`Request is ${this.props.request_id}`)
        var body = {
            request_id: this.props.request_id,
            teacher_id: this.props.user_id,
            student_id: this.props.student_id,
            completed: 0,
            review: 0
        }
        axios.post("http://localhost:5000/session/approve_post", body)
        .then(response1 => {
            alert(`You have successfully confirmed the approval of the session`)
            var req = response1.data[0]
            axios.post("http://localhost:5000/session/session", body)
            .then(response => {
                this.props.fetchHome(this.props.student_id, this.props.is_teacher)
                //console.log(response)
                var bod1 = req
                bod1.first_name = this.props.first_name
                bod1.last_name = this.props.last_name 
                bod1.grade = this.props.grade
                bod1.board = this.props.board
                bod1.type = "teacher_session_confirm"
                bod1.receiver = this.state.teacher.email_id
                axios.post("http://localhost:5000/users/sendmail", bod1)
                .then(re => {
                    console.log("Email sent successfully")
                })
                .catch(err => {
                    console.log("Error in sending mail")
                })

                var bod2 = req
                bod2.type = "student_session_confirm"
                bod2.first_name = this.state.teacher.first_name
                bod2.last_name = this.state.teacher.last_name
                bod2.sessions_taken = this.state.teacher.sessions_taken
                bod2.rating = this.state.teacher.rating_points
                bod2.qualification = this.state.teacher.qualification
                bod2.receiver = this.state.teacher.email_id
                axios.post("http://localhost:5000/users/sendmail", bod2)
                .then(re => {
                    console.log("Email sent successfully")
                })
                .catch(err => {
                    console.log("Error in sending mail")
                })
            })
            .catch(err => {
                console.log(err.message)
            })
        })
        .catch(err => {
            console.log(err.message)
        })
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return(
            <React.Fragment>
                <Button color="warning" onClick={this.toggle}>{this.props.username}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader className="titleModal">{this.state.teacher.first_name} {this.state.teacher.last_name}</ModalHeader>
                    <ModalHeader className="titleModal">
                        <Col sm = "auto">
                            <img
                                style={{height: "200px"}}
                                src={this.state.teacher.image_link}
                                alt="mentor image"
                            ></img>
                        </Col>
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col lg="6">Username:</Col>
                            <Col lg="6">{this.props.username}</Col>
                        </Row>
                        <Row>
                            <Col lg="6">Qualification:</Col>
                            <Col lg="6">{this.state.teacher.qualification}</Col>
                        </Row>
                        <Row>
                            <Col lg="6">Sessions Taken:</Col>
                            <Col lg="6">{this.state.teacher.sessions_taken}</Col>
                        </Row>
                        <Row>
                            <Col lg="6">Rating Points:</Col>
                            <Col lg="6">{this.state.teacher.rating_points}</Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.confirm_sess}>
                            Confirm Approval
                        </Button>
                        <Button color="danger" onClick={this.toggle}>
                            Back
                        </Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      student_id: state.users.user_id,
      first_name: state.users.first_name,
      last_name: state.users.last_name,
      email_id: state.users.email_id,
      grade: state.users.grade,
      board: state.users.board,
      is_teacher: state.users.is_teacher
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchHome: (id, is_teacher) => dispatch(fetch_home(id, is_teacher)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(PendingReqMentor)