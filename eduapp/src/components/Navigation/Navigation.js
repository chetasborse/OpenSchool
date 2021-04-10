import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarBrand, 
    NavbarToggler,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import './Styles.css'
import Home from '../HomePage/Home';
import Login from '../Users/Login';
import Register from '../Users/Register';
import Logout from '../Users/Logout';
import Profile from '../Users/Profile';
import {connect} from 'react-redux';
import Request_view from '../Sessions/Request_view';
import ForgotPassword from '../Admin/ForgotPassword';
// import Request_session from '../Sessions/Request_session';

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){
        return(
            <Router>
                <Navbar color="dark" dark expand="sm" className="mb-5" fixed="top">
                    <Container>
                        <NavbarBrand>OpenSchool</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar> 
                                <NavItem>
                                    <Link className="linkclass" to="/">Home</Link>
                                </NavItem>
                                {!this.props.LoggedIn &&
                                <React.Fragment>
                                    <NavItem>
                                        <Link className="linkclass" to="/Login">Login</Link>
                                    </NavItem> 
                                    <NavItem>
                                        <Link className="linkclass" to="/Register">Register</Link>
                                    </NavItem>
                                </React.Fragment>
                                }
                                {
                                    this.props.LoggedIn &&
                                    <React.Fragment>
                                        {   !this.props.is_admin &&
                                            <NavItem>
                                                <Link className="linkclass" to="/Profile">Profile</Link>
                                            </NavItem>
                                        }
                                        {/* {
                                            !this.props.is_teacher &&
                                            <NavItem>
                                                <Link className="linkclass" to="/Request_Session">Req_Sess</Link>
                                            </NavItem>
                                        } */}
                                        {
                                            this.props.is_teacher &&
                                            <NavItem>
                                                <Link className="linkclass" to="/View_Requests">Requests</Link>
                                            </NavItem>
                                        }
                                        <NavItem>
                                            <Link className="linkclass" to="/Logout">Logout</Link>
                                        </NavItem>
                                    </React.Fragment>
                                }       
                            </Nav> 
                        </Collapse>
                    </Container>
                </Navbar>
                <Switch>  
                    <Route path="/Login" render={(props) => (!this.props.LoggedIn ? (<Login/>) : (<Redirect to="/"></Redirect>))}/>
                    <Route path="/Register" render={(props) => (!this.props.LoggedIn ? (<Register/>) : (<Redirect to="/"></Redirect>))}/>
                    <Route path="/Logout" render={(props) => (this.props.LoggedIn ? (<Logout/>) : (<Redirect to="/Login"></Redirect>))}/>
                    <Route path="/ForgotPassword" render={(props) => (!this.props.LoggedIn ? (<ForgotPassword/>) : (<Redirect to="/"></Redirect>))}/>
                    <Route path="/Profile" render={(props) => (this.props.LoggedIn && !this.props.is_admin ? (<Profile/>) : (<Redirect to="/"></Redirect>))}/>
                    <Route path="/View_Requests" render={(props) => (this.props.LoggedIn ? (this.props.is_teacher ? (<Request_view/>): (<Redirect to="/"></Redirect>)): (<Redirect to="/Login"></Redirect>))}/>
                    {/* <Route path="/Request_Session" render={(props) => (this.props.LoggedIn ? (!this.props.is_teacher ? (<Request_session/>): (<Redirect to="/View_Requests"></Redirect>)): (<Redirect to="/Login"></Redirect>))}/> */}
                    <Route path="/" exact component={Home}/>                           
                </Switch> 
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        LoggedIn: state.users.loggedIn,
        is_teacher: state.users.is_teacher,
        is_admin: state.users.is_admin
    }
}

export default connect(mapStateToProps)(Navigation)

