import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
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
        <Container className="font1" style={{ border: "1px solid #cece" }}>
          <Row>
            <Col>
              <img src={rec.image_link} className="profilepic2"></img>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>
                <b>
                  {" "}
                  {rec.first_name} {rec.last_name}, {rec.qualification}
                </b>
              </h5>
            </Col>
          </Row>
          <Row>
            {/* <Col>Qualification: {rec.qualification}</Col> */}
            <Col>
              <h5>
                🎖️ Average Rating : {rec.rating_points / rec.sessions_taken}
              </h5>
            </Col>
            <Col>
              <h5>📖 Sessions Count: {rec.sessions_taken}</h5>
            </Col>
          </Row>
          {/* <Button color="success" onClick={}>Request session from {rec.first_name}</Button> */}
          <ReqIndiSession {...rec} />
        </Container>
      </React.Fragment>
    ));

    return (
      <Container>
        {
          <React.Fragment>
            <Row>
              <Col style={{ textAlign: "left", marginTop: "30px" }}>
                <h2 className="dashboard font1">Recommendations</h2>
              </Col>
            </Row>
            {this.state.recomms.length === 0 ? (
              <h3>Add favorite subjects in profile to see recommendations</h3>
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
