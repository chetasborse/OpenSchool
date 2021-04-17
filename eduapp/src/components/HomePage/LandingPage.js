import axios from 'axios';
import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Button, Col, Collapse, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import landing_cover from "../../landing_cover.png";

class LandingPage extends Component {

  constructor() {
    super()
  }

  render() {
    return(
      <div>
        <main role="main" class="container">
          <div className="row" id="landing-content">
            <div className="col-12 col-md-5">
              <h1 id="title">OpenSchool</h1>
              <section id="about">
                <p>Do you need some one-on-one help with schoolwork? Or are you curious about something they don't teach in school?</p>
                <p>Are you a passionate teacher or academic professional who loves to help young students learn beyond the classroom?</p>
                <p>Join OpenSchool - the voluntary mentoring platform and participate in one-on-one sessions about anything that sparks your curiosity!</p>
              </section>
              <Link className="btn btn-info btn-lg" id="join-btn" to="/Register">Join Now!</Link>
            </div>
            <div className="col-12 col-md-7">
              <img src={landing_cover} id="cover" alt="graphic" width="100%"/>
            </div>
          </div>
        </main>
      </div>
    )
  }

}
export default LandingPage;
