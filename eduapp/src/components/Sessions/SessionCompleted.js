import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'

class SessionCompleted extends Component {

    constructor() {
        super() 
        this.state = {
            modal: false,
            rate: 3
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    rate = () => {
        const body = {
            rate: this.state.rate,
            session_id: this.props.session_id
        }
        axios.post("http://localhost:5000/session/session_completed", body)
        .then(response => {
            alert("Review submitted")
            const body1 = {
                review: this.state.rate,
                user_id: this.props.teacher_id,
                student_id: this.props.user_id
            }
            axios.post("http://localhost:5000/users/update_points", body1)
            .then(resp => {
                console.log("Points updated")
                axios.post("http://localhost:5000/users/update_session_count", body1)
                .then(resp1 => {
                    console.log("Count incremented")
                })
                .catch(err1 => {
                    console.log(err1.message)
                })
            })
            .catch(err => {
                console.log("Error in updating points")
            })
            this.props.refresh()
            
        })
        .catch(err=> {
            console.log(err.message)
        })
        this.toggle()
    }

    handle = (e) => {
        this.setState({
            rate: parseInt(e.target[e.target.selectedIndex].value)
        })
    }


    render() {

        return(
            <React.Fragment>
                <div>
                    <Button color="success" onClick={this.toggle}>Session Completed</Button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Rate the experience</ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Label for="rate" sm={2}>Ratings:</Label>
                            <Col sm={10}>
                                <Input type="select" name="rate" id="rate" onChange={this.handle} value={this.state.rate}>
                                    <option value="" disabled selected>Select rating</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <Button color="success" onClick={this.rate}>Rate</Button>
                        <Button color="danger" onClick={this.toggle}>Back</Button>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user_id: state.users.user_id
    }
}

export default connect(mapStateToProps)(SessionCompleted)
