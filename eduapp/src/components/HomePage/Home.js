import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { del_pend, fetch_home } from "../../redux/Session/sessionAction";
import LandingPage from "./LandingPage";
import AdminHome from "../Admin/AdminHome";
import MeetingLinkShare from "../Sessions/MeetingLinkShare";
import ReqSession from "../Sessions/ReqSession";
import SessionCompleted from "../Sessions/SessionCompleted";
import Recommendations from "./Recommendations";
import "./Styles.css";
import PendingReqMentor from "./PendingReqMentor";
import axios from "axios";
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_upcom: true,
      show_pend: false,
      show_past: false,
    };
  }

  showupcoming = () => {
    this.setState({
      show_upcom: true,
      show_pend: false,
      show_past: false,
    });
  };

  showpending = () => {
    this.setState({
      show_upcom: false,
      show_pend: true,
      show_past: false,
    });
  };

  showpast = () => {
    this.setState({
      show_upcom: false,
      show_pend: false,
      show_past: true,
    });
  };

  refresh = () => {
    this.props.fetchHome(this.props.user_id, this.props.is_teacher);
  };

  delete_pending = (request_id, mentor_id) => {
    var body = {
      request_id,
      mentor_id
    }
    axios.post("http://localhost:5000/session/delete_pending", body)
    .then(res => {
        this.props.del_pending(body)
    })
    .catch(err => {
      console.log(err);
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user_id != this.props.user_id && !this.props.is_admin) {
      if (this.props.LoggedIn) {
        this.props.fetchHome(this.props.user_id, this.props.is_teacher);
      }
    }
  }

  render() {
    const upcoming = this.props.upcoming_sessions.map((up) =>(
      <React.Fragment key={up.session_id}>
        <Container className="spaceout-tabs-contents">
          <Row>
            <Col>
              <h4><b>{this.props.all_subjects[up.subject_id - 1].subject_name}</b> - {up.topic}</h4>
              <Row>
                <Col sm={4}>
                  <h5>📅 {String(up.req_date).slice(0, 10)}</h5>
                </Col>
                <Col sm={4}>
                  <h5>⏲️ {up.time_slot}</h5>
                </Col>
                <Col sm={2}>
                  <h5>🔡 {this.props.all_languages[up.language_id - 1].language_name}</h5>
                  {/* Language: {req.subject_id} */}
                </Col>
              </Row><br/>
              {!this.props.is_teacher ? (
                <React.Fragment>
                  <h5><b>Mentor:</b> {up.first_name} {up.last_name}, {up.qualification}</h5>
                </React.Fragment>
              ) :
                <React.Fragment>
                <h5><b>Student:</b> {up.first_name} {up.last_name}, {up.qualification}</h5>
                <h5><b>Grade:</b> {up.grade}, {up.board}</h5>
              </React.Fragment>
              }
              {!this.props.is_teacher && (
                <Row>
                  <Col className="padded">
                    <h5>
                      🔗{" "}
                      {up.meeting_url ? (
                        <a href={up.meeting_url} target="_blank">
                          {up.meeting_url}
                        </a>
                      ) : (
                        `The mentor hasn't sent meeting url yet. Try refreshing`
                      )}
                    </h5>
                  </Col>
                </Row>
              )}
              {this.props.is_teacher &&
              (!up.meeting_url ? (
                <MeetingLinkShare
                  session_id={up.session_id}
                  student_mail={up.email_id}
                  student_first={up.first_name}
                  student_last={up.last_name}
                  topic={up.topic}
                  date={up.req_date}
                  time={up.time_slot}
                />
              ) : (
                <Row>
                  <Col>
                    <h5>
                      Meeting Url:{" "}
                      <a href={up.meeting_url} target="_blank">
                        {up.meeting_url}
                      </a>
                    </h5>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col sm={3}>
              <img src={up.image_link} className="profilepic2"></img>
            </Col>
          </Row>
          <Row style={{textAlign: "center"}}>
            <Col>
              {!this.props.is_teacher && (
                <SessionCompleted
                  session_id={up.session_id}
                  teacher_id={up.teacher_id}
                  refresh={this.refresh}
                  topic={up.topic}
                  first_name={up.first_name}
                  last_name={up.last_name}
                  email={up.email_id}
                />
              )}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    ))

    const pending_teachers = this.props.is_teacher ? this.props.pending_requests.map((req) => (
      <React.Fragment key={req.request_id}>
        <div className="spaceout-tabs-contents">
          <Row>
            <Col>
              <h4><b>{this.props.all_subjects[parseInt(req.subject_id) - 1].subject_name}</b> - {req.topic}</h4><br/>
              <Row>
                <Col sm={4}>
                  <h5>📅 {String(req.req_date).slice(0, 10)}</h5>
                </Col>
                <Col sm={4}>
                  <h5>⏲️ {req.time_slot}</h5>
                </Col>
                <Col sm={4}>
                  <h5>
                    🔡 {this.props.all_languages[parseInt(req.language_id) - 1].language_name}
                  </h5>
                </Col>
              </Row><br/>
              <h5><b>Student:</b> {req.user.first_name} {req.user.last_name}, {req.user.qualification}</h5>
              <h5><b>Grade:</b> {req.user.grade}, {req.user.board}</h5>
            </Col>
            <Col sm={3}>
              <img src={req.user.image_link} className="profilepic2"></img> 
            </Col>
          </Row>
          <Row className="center">
             <Col>
              <h6><b>Status: </b>
              {
                  req.final === 0 && req.approved === 0 &&
                  <span style={{color: "green"}}>Student hasn't confirmed any mentor yet</span>
                }
                {
                  req.final === 0 && req.approved === 1 &&
                  <span style={{color: "red"}}>Student has chosen another mentor</span>
                }
                </h6>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    )):null

    const pending = !this.props.is_teacher ? this.props.pending_requests.map((req) => (
      <React.Fragment key={req.request_id}>
        <div className="spaceout-tabs-contents">
          <h4><b>{this.props.all_subjects[parseInt(req.subject_id) - 1].subject_name}</b> - {req.topic}</h4><br/>
          <Row>
            <Col sm={4}>
              <h5>📅 {String(req.req_date).slice(0, 10)}</h5>
            </Col>
            <Col sm={4}>
              <h5>⏲️ {req.time_slot}</h5>
            </Col>
            <Col sm={4}>
              <h5>
                🔡 {this.props.all_languages[parseInt(req.language_id) - 1].language_name}
              </h5>
            </Col>
          </Row><br/>
          { req !== undefined &&
            req.entry.length === 0 && req.mentor_specific === -1?
            <span>
              <h5>Your request has not yet been accepted by any mentor.</h5>
            </span> :
            (req.mentor_specific === -1 ?
            <React.Fragment>
                <h5>Accepted! View profile and select mentor.</h5>
                {
                  req.entry.map((entr, index) => (
                    <span key={entr.mentor_id}>
                      <PendingReqMentor index={index} user_id={entr.mentor_id} username={entr.username} request_id={req.request_id}/>
                    </span>
                  ))
                }
            </React.Fragment> : <Row><h5>This request is mentor specific</h5></Row>)
          }
        </div>
      </React.Fragment>
    )): null;

    const past = this.props.past_sessions.map((up) => (
      <React.Fragment key={up.session_id}>
        <Container className="spaceout-tabs-contents">
          <Row>
            <Col>
              <h4><b>{this.props.all_subjects[up.subject_id - 1].subject_name}</b> - {up.topic}</h4>
              <Row>
                <Col sm={4}>
                  <h5>📅 {String(up.req_date).slice(0, 10)}</h5>
                </Col>
                <Col sm={3}>
                  <h5>⏲️ {up.time_slot}</h5>
                </Col>
                <Col sm={2}>
                  <h5>🔡 {this.props.all_languages[up.language_id - 1].language_name}</h5>
                </Col>
              </Row><br/>
              {!this.props.is_teacher ? (
                <React.Fragment>
                  <h5><b>Mentor:</b> {up.first_name} {up.last_name}, {up.qualification}</h5>
                </React.Fragment>
              ) :
                <React.Fragment>
                <h5><b>Student:</b> {up.first_name} {up.last_name}, {up.qualification}</h5>
                <h5><b>Grade:</b> {up.grade}, {up.board}</h5>
              </React.Fragment>
              }
              <Row>
                <Col className="padded">
                  <h4>
                    {
                      this.props.is_teacher ?
                      <b>🎖️Your Rating: {up.review}/5</b>:
                      <b>🎖️You Rated: {up.review}/5</b>
                    }
                  </h4>
                </Col>
              </Row>
            </Col>
            <Col sm={3}>
              <img src={up.image_link} className="profilepic2"></img>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    ));

    return (
      <div className="toplookout">
        {!this.props.LoggedIn && (
          <React.Fragment>
            <LandingPage />
          </React.Fragment>
        )}
        {this.props.is_admin && (
          <React.Fragment>
            <AdminHome />
          </React.Fragment>
        )}
        {this.props.LoggedIn && !this.props.is_admin && (
          <React.Fragment>
            <Container>
              <Col style={{ textAlign: "left" }}>
                {this.props.LoggedIn && !this.props.is_teacher && (
                  <ReqSession />
                )}
                {this.props.LoggedIn && this.props.is_teacher && (
                  <React.Fragment>
                    { this.props.verfied === 1 ?
                      <main role="main">
                      <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-6 text-center" id="req-session">
                          <section id="prompt">
                            <h3>Help curious students get the best out of their education!</h3><br/>
                            <p>
                              Check if there are any requests for sessions in the subjects of your expertise, and accept if you would like to conduct the session.
                            </p>
                          </section>
                          <Link className="btn btn-info" to="/View_Requests">
                            View New Requests
                          </Link><hr/>
                        </div>
                      </div>
                    </main>:(
                      this.props.verfied === 0 ?
                        <main role="main" className="text-center">
                          <i class="bi bi-exclamation-triangle"></i><br/><br/>
                          <h2>Your account is pending for verification.</h2>
                          <p>You will be able to participate once the administrator verifies your profile.<br/>
                          If you think it has already been verified, try refreshing the page.</p>
                        </main> :
                        <main role="main" className="text-center">
                          <i class="bi bi-exclamation-triangle"></i><br/><br/>
                          <h3>Sorry {this.props.first_name} {this.props.last_name}, your account has been <span style={{color: "red"}}>suspended</span></h3>
                        </main>
                    )
                    }
                  </React.Fragment>
                )}
              </Col>
            </Container>
            <br></br><br/>
            {this.props.LoggedIn && (
              <React.Fragment>
                { ((this.props.is_teacher && this.props.verfied === 1) || (!this.props.is_teacher)) &&
                  <React.Fragment>
                    <ButtonGroup>
                      {this.state.show_upcom ? <Button color="success" onClick={this.showupcoming}>
                        Upcoming Sessions
                      </Button> :
                      <Button color="warning" onClick={this.showupcoming}>
                        Upcoming Sessions
                      </Button>
                      }
                      {this.state.show_pend ? <Button color="success" onClick={this.showpending}>
                        Pending Requests
                      </Button> :
                      <Button color="warning" onClick={this.showpending}>
                        Pending Requests
                      </Button>
                      }
                      {this.state.show_past ? <Button color="success" onClick={this.showpast}>
                        Past Sessions
                      </Button>:
                      <Button color="warning" onClick={this.showpast}>
                        Past Sessions
                      </Button>
                      }
                      </ButtonGroup>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <Button color="danger" onClick={this.refresh}>
                        Refresh Tab
                      </Button>
                      <Container
                        style={{
                          border: "1px solid #cecece",
                          background: "#f8f0fd",
                          height: "500px",
                          overflow: "auto",
                        }}
                      >
                      <Row>
                        {this.state.show_upcom &&
                          (this.props.upcoming_sessions.length === 0 ? (
                            <Container style={{ textAlign: "center" }}>
                              <main role="main" className="text-center">
                                <i class="bi bi-exclamation-triangle"></i><br/><br/>
                                <h4>No upcoming Sessions.</h4>
                                <h5>Refresh the page to get new sessions</h5>
                              </main>
                            </Container>
                          ) : (
                            <Container>{upcoming}</Container>
                          ))}
                        {this.state.show_pend &&
                          (this.props.pending_requests.length === 0 ? (
                            <Container style={{ textAlign: "center" }}>
                              <main role="main" className="text-center">
                                <i class="bi bi-exclamation-triangle"></i><br/><br/>
                                <h4>No Pending Requests.</h4>
                                <h5>Refresh the page to get new requests</h5>
                              </main>
                            </Container>
                          ) : (this.props.is_teacher ?
                            <Container>{pending_teachers}</Container>:
                            <Container>{pending}</Container>
                          ))}
                        {this.state.show_past &&
                          (this.props.past_sessions.length === 0 ? (
                            <Container style={{ textAlign: "center" }}>
                              <main role="main" className="text-center">
                                <i class="bi bi-exclamation-triangle"></i><br/><br/>
                                <h4>No past Sessions.</h4>
                              </main>
                            </Container>
                          ) : (
                            <Container>{past}</Container>
                          ))}
                      </Row>
                    </Container>
                  </React.Fragment>
                }
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        {this.props.LoggedIn &&
          !this.props.is_teacher &&
          !this.props.is_admin && <Recommendations />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    LoggedIn: state.users.loggedIn,
    is_teacher: state.users.is_teacher,
    upcoming_sessions: state.session.upcoming_sessions,
    pending_requests: state.session.pending_requests,
    past_sessions: state.session.past_sessions,
    user_id: state.users.user_id,
    all_subjects: state.users.all_subjects,
    all_languages: state.users.all_languages,
    is_admin: state.users.is_admin,
    verfied: state.users.verfied
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHome: (id, is_teacher) => dispatch(fetch_home(id, is_teacher)),
    del_pending: (value) => dispatch(del_pend(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
