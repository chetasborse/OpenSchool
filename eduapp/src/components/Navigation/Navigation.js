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
                        <NavbarBrand>EduApp</NavbarBrand>
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
                                        <NavItem>
                                            <Link className="linkclass" to="/Profile">Profile</Link>
                                        </NavItem>
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
                    <Route path="/Profile" render={(props) => (this.props.LoggedIn ? (<Profile/>) : (<Redirect to="/"></Redirect>))}/>
                    <Route path="/" exact component={Home}/>                           
                </Switch> 
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        LoggedIn: state.users.loggedIn
    }
}

export default connect(mapStateToProps)(Navigation)

