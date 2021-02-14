import axios from "axios";
import { connect } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import React, {Component} from 'react';

class Request_view extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            requests: []
        }
    }
    
    componentDidMount() {
        axios.get("http://localhost:5000/session/request", {
            params: {
                user_id: this.props.user_id
            }
        })
        .then(response => {
            this.setState({
                requests: response.data
            })
            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    approveRequest = (req) => {

        var body = {
            request_id: req.request_id,
            teacher_id: this.props.user_id,
            student_id: req.user_id,
            completed: 0,
            review: 0
        }
        axios.post("http://localhost:5000/session/approve_post", body)
        .then(response => {
            if(response.data.affectedRows === 0) {
                alert(`Sorry the response has already been approved`)
            }
            else {
                alert(`You have successfully approved the session`)
                axios.post("http://localhost:5000/session/session", body)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err.message)
                })
            }
            this.setState(state => {
                const requests = state.requests.filter(req1 => req1.request_id !== req.request_id);
                return {
                    requests,
                };
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    render() {

        const reqs = this.state.requests.map((req) => (
            <React.Fragment key={req.request_id}>
                <Container style={{border:"1px solid black"}}>
                    {   req.mentor_specific !== -1 &&
                        <Row>
                            <Col>
                                <h3>Specific to you</h3>
                            </Col>
                        </Row>
                    }
                    <Row>
                        <Col sm = {6}>
                            Sender: {req.first_name} {req.last_name} 
                        </Col>
                        <Col sm = {3}>
                            Grade: {req.grade}
                        </Col>
                        <Col sm = {3}>
                            Board: {req.board}
                        </Col> 
                    </Row>
                    <Row>
                        <Col sm = {6}>
                            Subject: {this.props.all_subjects[req.subject_id - 1].subject_name}
                            {/* Subject: {this.props.all_subjects.find(sub => sub.id = req.subject_id).subject_name} */}
                        </Col>
                        <Col sm = {3}>
                            Topic: {req.topic}
                        </Col>
                        <Col sm = {3}>
                            Language: {this.props.all_languages[req.language_id - 1].language_name}
                            {/* Language: {this.props.all_languages.find(lang => lang.id = req.language_id).language_name} */}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm = {6}>
                            Time Slot: {req.time_slot}
                        </Col>
                        <Col sm = {3}>
                            Date: {req.req_date}
                        </Col>
                    </Row>
                    <Container style={{textAlign: "center"}}>
                        <Button color ="success" onClick={() => this.approveRequest(req)}>Respond</Button>
                    </Container>
                </Container>

            </React.Fragment>
        ))

        return(
            <div className="toplookout">
                <h3>Requests</h3>
                <Container style={{border: "1px solid #cecece"}}>
                    {
                        this.state.requests.length === 0 ? <Container>No requests</Container> : <Container>{reqs}</Container>
                    }
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.users.user_id,
        all_subjects: state.users.all_subjects,
        all_languages: state.users.all_languages 
    }
}

export default connect(mapStateToProps)(Request_view)