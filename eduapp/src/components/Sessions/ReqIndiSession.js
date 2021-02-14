import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { send_request } from '../../redux/Session/sessionAction';

class ReqIndiSession extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            modal: false,
            subject_id: '',
            topic: '',
            time_slot: '',
            date_slot: '',
            lang: '',
            subjects: [],
            languages: []
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handle = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handle1 = e => {
        this.setState({
            [e.target.name]: e.target[e.target.selectedIndex].value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state)

        var body = {
            sender_id: this.props.user_id,
            subject_id: this.state.subject_id,
            topic: this.state.topic,
            time_slot: this.state.time_slot,
            req_date: this.state.date_slot,
            language_id: this.state.language_id,
            approved: 0,
            mentor_specific: this.props.t_id
        }
        this.props.send_request(body)

        this.setState({
            modal: false,
            subject_id: '',
            topic: '',
            time_slot: '',
            req_date: '',
            language_id: '',
            subjects: [],
            languages: []
        })
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.modal != this.state.modal && this.state.modal) {
            axios.get("http://localhost:5000/users/languages", {
                params: {
                    id: this.props.t_id
                }
            })
            .then(response => {
                this.setState({
                    languages: response.data
                })
                axios.get("http://localhost:5000/users/teacher_subjects", {
                    params: {
                        id: this.props.t_id
                    }
                })
                .then(response => {
                    this.setState({
                        subjects: response.data
                    })
                })
                .catch(err => {
                    console.log(err)
                })

            })
            .catch(err => {
                console.log(err)
            })
            
        }
    }

    render() {
        

        var all_subjects = this.state.subjects.map((subject) => (
            <option key={subject.subject_id} value={subject.subject_id} id={subject.subject_id}>{subject.subject_name}</option>
        ))

        var all_languages = this.state.languages.map((language) => (
            <option key={language.language_id} value={language.language_id} id={language.language_id}>{language.language_name}</option>
        ))

        return(
            <React.Fragment>

                <div>
                    <Button color="success" onClick={this.toggle}>Request session from {this.props.first_name} {this.props.last_name}</Button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Session Request</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="subject_id" sm={2}>Subject</Label>
                                <Col sm={10}>
                                    <Input type="select" name="subject_id" id="subject" onChange={this.handle1}>
                                        <option value="" disabled selected>Select the subject</option>
                                        {
                                            all_subjects
                                        }
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="topic" sm={2}>Topic</Label>
                                <Col sm={10}>
                                    <Input type="text" name="topic" id="topic" placeholder="Enter the topic" value={this.state.topic} onChange={this.handle}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="time_slot" sm={2}>Time Slot</Label>
                                <Col sm={10}>
                                    <Input type="text" name="time_slot" id="time_slot" value={this.state.time_slot} onChange={this.handle} placeholder="Format: hh:mm to hh:mm"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="date_slot" sm={2}>Date</Label>
                                <Col sm={10}>
                                    <Input type="date" name="date_slot" id="date_slot" value={this.state.date_slot} onChange={this.handle}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="lang" sm={2}>Language</Label>
                                <Col sm={10}>
                                    <Input type="select" name="language_id" id="lang" onChange={this.handle1}>
                                        <option value="" disabled selected>Select the language</option>
                                        {
                                            all_languages
                                        }
                                    </Input>
                                </Col>
                            </FormGroup>
                            <Button color="success" onClick={this.handleSubmit}>Request</Button>
                            <Button color="danger" onClick={this.toggle}>Back</Button>
                        </Form>
                    </ModalBody>



                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.users.user_id,
        all_subjects: state.users.all_subjects,
        all_languages: state.users.all_languages, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        send_request: (body) => dispatch(send_request(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReqIndiSession);
