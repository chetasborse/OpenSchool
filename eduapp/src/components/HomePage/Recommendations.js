import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import { Link } from 'react-router-dom';
import ReqIndiSession from "../Sessions/ReqIndiSession";

class Recommendations extends Component {
  constructor() {
    super();
    this.state = {
      recomms: [],
    };
  }

  componentDidMount() {
    // if(this.props.loggedIn)
    if (!this.props.is_admin && this.props.loggedIn) {
      axios
        .get("http://localhost:5000/users/recommendations", {
          params: {
            student_id: this.props.user_id,
          },
        })
        .then((response) => {
          this.setState({
            recomms: response.data,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user_id != this.props.user_id && !this.props.is_admin) {
      axios
        .get("http://localhost:5000/users/recommendations", {
          params: {
            student_id: this.props.user_id,
          },
        })
        .then((response) => {
          this.setState({
            recomms: response.data,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  render() {
    const recommens = this.state.recomms.map((rec) => (
      <React.Fragment key={rec.user_id}>
        <Container className="text-left" style={{ background: "#f8f0fd", padding: 30 }}>
          <Row>
            <Col sm={3}>
              <img src={rec.image_link} className="profilepic2"></img>
            </Col>
            <Col>
              <h4><b>{rec.first_name} {rec.last_name}</b></h4>
              <h5>{rec.qualification}</h5><br/>
              <Row>
                <Col sm={4}>
                  <h5>📖 Sessions Taken: {rec.sessions_taken}</h5>
                </Col>
                <Col sm={4}>
                  <h5>
                    🎖️ Average Rating :{" "}
                    {(rec.rating_points / rec.sessions_taken).toFixed(2)}
                  </h5>
                </Col>
              </Row><br/>
              {/* <Button color="success" onClick={}>Request session from {rec.first_name}</Button> */}
              <ReqIndiSession {...rec} /><br/>
            </Col>
          </Row>
          <hr/>
        </Container>
      </React.Fragment>
    ));

    return (
      <Container>
        {
          <React.Fragment>
           <br/><br/><hr/><br/><br/>
           <h2 className="dashboard font1">Recommendations</h2><br/>
            {this.state.recomms.length === 0 ? (
              <div className="text-left">
                <h5>Add your favorite subjects to your profile so we can recommend mentors!</h5>
                <Link className="btn btn-warning btn-lg" to="/Profile">
                  Add Now!
                </Link>
              </div>
            ) : (
              <Row>{recommens}</Row>
            )}
          </React.Fragment>
        }
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.users.user_id,
    // loggedin: state.users.loggedIn,
    loggedIn: 1,
    is_admin: state.admin.is_admin,
  };
};

export default connect(mapStateToProps)(Recommendations);
