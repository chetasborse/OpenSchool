import axios from "axios";
import { connect } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import React, {Component} from 'react';
import Prompt from "../Prompt";

class Request_view extends Component {

    constructor(props) {
        super(props)
        this.state = {
            requests: [],
            verfied: props.verfied,
            count: 0
        }
    }

    componentDidMount() {
        if(this.props.verfied === 1) {
            axios.get("http://localhost:5000/session/request", {
                params: {
                    user_id: this.props.user_id,
                }
            })
            .then(response => {
                this.setState({
                    requests: response.data,
                    count: response.data.filter((obj) => obj.count === 0).length
                })
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    approveRequest = (req) => {
        
        if(req.mentor_specific === -1) {
            var body = {
                request_id: req.request_id,
                mentor_id: this.props.user_id,
            }
            axios.post("http://localhost:5000/session/approve_req", body)
            .then(response => {
                if(response.data === "done")
                    alert("The student has already confirmed some other mentor.")
                else
                    alert("Request approved. Check pending tab on home page for confirmation from student.")
                this.setState(state => {
                    const requests = state.requests.filter(req1 => req1.request_id !== req.request_id);
                    return {
                        requests,
                        count: state.count - 1
                    };
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
        else {
            var body = {
                request_id: req.request_id,
                teacher_id: this.props.user_id,
                student_id: req.user_id,
                completed: 0,
                review: 0
            }
            axios.post("http://localhost:5000/session/approve_post_spec", body)
            .then(response => {
                alert(`You have successfully approved the session`)
                axios.post("http://localhost:5000/session/session", body)
                .then(response => {
                    console.log(response)
                    var bod1 = req
                    bod1.type = "teacher_session_confirm"
                    bod1.receiver = this.props.email_id
                    axios.post("http://localhost:5000/users/sendmail", bod1)
                    .then(re => {
                        console.log("Email sent successfully")
                    })
                    .catch(err => {
                        console.log("Error in sending mail")
                    })

                    var bod2 = req
                    bod2.type = "student_session_confirm"
                    bod2.first_name = this.props.first_name
                    bod2.last_name = this.props.last_name
                    bod2.sessions_taken = this.props.sessions_taken
                    bod2.rating = this.props.rating
                    bod2.qualification = this.props.qualification
                    bod2.receiver = req.email_id
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
                this.setState(state => {
                    const requests = state.requests.filter(req1 => req1.request_id !== req.request_id);
                    return {
                        requests,
                        count: state.count - 1
                    };
                })
            })
            .catch(err => {
                console.log(err.message)
            })

        }
    }

    render() {


        const reqs = this.state.requests.map((req) => (
            <React.Fragment key={req.request_id}>
                {
                    req.count === 0 &&
                    <Container
                      style={{
                        background: "#f8f0fd",
                        overflow: "auto",
                      }}
                    >
                    {   req.mentor_specific !== -1 &&
                        <h5 color="warning"><i>Specifically sent to you</i></h5>
                    }
                    <Row>
                      <Container className="center">
                        <div className="spaceout-tabs-contents">
                          <h4><b>{this.props.all_subjects[req.subject_id - 1].subject_name}</b> - {req.topic}</h4><br/>
                          <Row>
                            <Col sm={4}>
                              <h5>📅 {String(req.req_date).slice(0, 10)}</h5>
                            </Col>
                            <Col sm={4}>
                              <h5>⏲️ {req.time_slot}</h5>
                            </Col>
                            <Col sm={4}>
                              <h5>🔡 {this.props.all_languages[req.language_id - 1].language_name}</h5>
                              {/* Language: {req.subject_id} */}
                            </Col>
                          </Row><br/>
                          <span>
                            <h5>From student:&nbsp;
                              <span> {req.first_name} {req.last_name} </span> | <span> Grade - {req.grade} </span> | <span> School Board - {req.board} </span>
                            </h5>
                          </span>
                          <Prompt color="success" buttext="Accept" captext="Are you sure you want to accept?" func={this.approveRequest} param={req}></Prompt>
                        </div>
                      </Container>
                    </Row>

                </Container>
                }

            </React.Fragment>
        ))

        return(
            <div className="toplookout">
                {   this.state.verfied == 1 ?
                    <React.Fragment>
                        <Container style={{border: "1px solid #cecece"}}>
                            {
                                this.state.count === 0 ? 
                                <Container>
                                    <main role="main" className="text-center">
                                        <i class="bi bi-exclamation-triangle"></i><br/><br/>
                                        <h4>No requests.</h4>
                                        <h5>Refresh the page to get new sessions</h5>
                                    </main>
                                </Container> : 
                                <Container>{reqs}</Container>
                            }
                        </Container>
                    </React.Fragment> :
                    (
                        this.state.verfied == 0 ?
                        <React.Fragment>
                          <main role="main" className="text-center">
                            <i class="bi bi-exclamation-triangle"></i><br/><br/>
                            <h2>Your account is pending for verification.</h2>
                            <p>You will be able to log in once the administrator verifies your profile.<br/>
                            If you think it has already been verified, try refreshing the page.</p>
                          </main>
                        </React.Fragment>:
                        <React.Fragment>
                            <h3>Sorry {this.props.first_name} {this.props.last_name}, your account has been <span style={{color: "red"}}>suspended</span></h3>
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.users.user_id,
        all_subjects: state.users.all_subjects,
        all_languages: state.users.all_languages,
        email_id: state.users.email_id,
        first_name: state.users.first_name,
        last_name: state.users.last_name,
        sessions_taken: state.users.session_taken,
        qualification: state.users.qualification,
        rating: state.users.rating_points,
        verfied: state.users.verfied
    }
}

export default connect(mapStateToProps)(Request_view)
