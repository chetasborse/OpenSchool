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
import { fetch_home } from "../../redux/Session/sessionAction";
import LandingPage from "./LandingPage";
import AdminHome from "../Admin/AdminHome";
import MeetingLinkShare from "../Sessions/MeetingLinkShare";
import ReqSession from "../Sessions/ReqSession";
import SessionCompleted from "../Sessions/SessionCompleted";
import Recommendations from "./Recommendations";
import "./Styles.css";

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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user_id != this.props.user_id && !this.props.is_admin) {
      if (this.props.LoggedIn) {
        this.props.fetchHome(this.props.user_id, this.props.is_teacher);
      }
    }
  }

  render() {
    const upcoming = this.props.upcoming_sessions.map((up) => (
      <React.Fragment key={up.session_id}>
        <Container className="spaceout">
          <Row>
            <Col>
              <img src={up.image_link} className="profilepic2"></img>
            </Col>
          </Row>
          {this.props.is_teacher && (
            <Row>
              <Col>
                Student: {up.first_name} {up.last_name}
              </Col>
              <Col>Grade: {up.grade}</Col>
              <Col>Board: {up.board}</Col>
            </Row>
          )}
          {!this.props.is_teacher && (
            <Row>
              <Col>
                <h4>
                  <b>
                    {" "}
                    📖 {this.props.all_subjects[up.subject_id - 1].subject_name}
                  </b>
                </h4>
                {/* Subject: {this.props.all_subjects.find(sub => sub.id = up.subject_id).subject_name} */}
                <Col>
                  <h4>
                    <i> - {up.topic} </i>
                  </h4>
                </Col>
              </Col>
              <Col>
                <h5>
                  {" "}
                  <i>by </i>
                  <b>
                    <i>
                      {up.first_name} {up.last_name}, {up.qualification}
                    </i>
                  </b>
                </h5>
                <Col>
                  <h5>
                    {" "}
                    🔡{" "}
                    {this.props.all_languages[up.language_id - 1].language_name}
                    {/* Language: {this.props.all_languages.find(lang => lang.id = up.language_id).language_name} */}
                  </h5>
                </Col>
              </Col>
              {/* <Col>Qualification: {up.qualification}</Col> */}
            </Row>
          )}
          <Row></Row>
          <Row>
            <Col>
              <h4>⏲️ {up.time_slot}</h4>
            </Col>
            <Col>
              <h5>📅 {String(up.req_date).slice(0, 10)}</h5>
            </Col>
          </Row>
          {!this.props.is_teacher && (
            <Row>
              <Col className="padded">
                <h5 className="padded">
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
                  Meeting Url:{" "}
                  <a href={up.meeting_url} target="_blank">
                    {up.meeting_url}
                  </a>
                </Col>
              </Row>
            ))}
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
        </Container>
      </React.Fragment>
    ));

    const pending = this.props.pending_requests.map((req) => (
      <React.Fragment key={req.request_id}>
        <Container className="spaceout">
          <Row>
            <Col>
              {/* Subject: {req.subject_id} */}
              <h4>
                <b>
                  {this.props.all_subjects[req.subject_id - 1].subject_name}
                </b>
              </h4>
              <Col>
                <h5>
                  <i>- {req.topic}</i>
                </h5>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>📅 {String(req.req_date).slice(0, 10)}</h5>
            </Col>
            <Col>
              <h5>⏲️ {req.time_slot}</h5>
            </Col>
            <Col>
              <h5>
                🔡 {this.props.all_languages[req.language_id - 1].language_name}
              </h5>
              {/* Language: {req.subject_id} */}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    ));

    const past = this.props.past_sessions.map((up) => (
      <React.Fragment key={up.session_id}>
        <Container className="spaceout">
          <Row>
            <Col>
              <img src={up.image_link} className="profilepic2"></img>
            </Col>
          </Row>
          {this.props.is_teacher && (
            <Row>
              <Col>
                Student: {up.first_name} {up.last_name}
              </Col>
              <Col>Grade: {up.grade}</Col>
              <Col>Board: {up.board}</Col>
            </Row>
          )}
          {!this.props.is_teacher && (
            <Row>
              <Col>
                <h4>
                  <b>
                    {" "}
                    📖 {this.props.all_subjects[up.subject_id - 1].subject_name}
                  </b>
                </h4>
                <Col>
                  <h5>
                    <i> - {up.topic} </i>
                  </h5>
                </Col>
              </Col>
              <Col>
                <h5>
                  {" "}
                  <i>by </i>
                  <b>
                    <i>
                      {up.first_name} {up.last_name}, {up.qualification}
                    </i>
                  </b>
                </h5>
                <Col>
                  <h5>
                    {" "}
                    🔡{" "}
                    {this.props.all_languages[up.language_id - 1].language_name}
                    {/* Language: {this.props.all_languages.find(lang => lang.id = up.language_id).language_name} */}
                  </h5>
                </Col>
              </Col>
            </Row>
          )}
          <Row></Row>
          <Row>
            <Col>
              <h5>⏲️ {up.time_slot}</h5>
            </Col>
            <Col>
              <h5>📅 {String(up.req_date).slice(0, 10)}</h5>
            </Col>
          </Row>
          <Row>
            <Col className="padded">
              <h4 className="padded">
                <b>🎖️Rating: {up.review}/5</b>
              </h4>
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
                <h2 className="dashboard font1">Dashboard</h2>
                {this.props.LoggedIn && !this.props.is_teacher && (
                  <ReqSession />
                )}
              </Col>
              {this.props.LoggedIn && (
                <Col style={{ textAlign: "right" }}>
                  <Button color="danger" onClick={this.refresh}>
                    Refresh Tab
                  </Button>
                </Col>
              )}
            </Container>
            <br></br>
            {this.props.LoggedIn && (
              <Container
                style={{
                  border: "1px solid #cecece",
                  height: "500px",
                  overflow: "auto",
                }}
              >
                {/* <Row>
                  <Col>
                    <Button color="warning" onClick={this.showupcoming}>
                      Upcoming Sessions
                    </Button>
                  </Col>
                  {!this.props.is_teacher && (
                    <Col>
                      <Button color="warning" onClick={this.showpending}>
                        Pending Requests
                      </Button>
                    </Col>
                  )}
                  <Col>
                    <Button color="warning" onClick={this.showpast}>
                      Past Sessions
                    </Button>
                  </Col>
                </Row> */}
                <ButtonGroup style={{ alignSelf: "left" }}>
                  <Button color="warning" onClick={this.showupcoming}>
                    Upcoming Sessions
                  </Button>
                  <Button color="warning" onClick={this.showpending}>
                    Pending Requests
                  </Button>
                  <Button color="warning" onClick={this.showpast}>
                    Past Sessions
                  </Button>
                </ButtonGroup>
                <Row>
                  {this.state.show_upcom &&
                    (this.props.upcoming_sessions.length === 0 ? (
                      <Container style={{ textAlign: "center" }}>
                        No upcoming Sessions
                      </Container>
                    ) : (
                      <Container>{upcoming}</Container>
                    ))}
                  {this.state.show_pend &&
                    (this.props.pending_requests.length === 0 ? (
                      <Container style={{ textAlign: "center" }}>
                        No Pending Requests
                      </Container>
                    ) : (
                      <Container>{pending}</Container>
                    ))}
                  {this.state.show_past &&
                    (this.props.past_sessions.length === 0 ? (
                      <Container style={{ textAlign: "center" }}>
                        No Past Sessions
                      </Container>
                    ) : (
                      <Container>{past}</Container>
                    ))}
                </Row>
              </Container>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHome: (id, is_teacher) => dispatch(fetch_home(id, is_teacher)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
