import React, { Component } from 'react'
const { Button, Modal, ModalHeader, ModalBody, ModalFooter } = require("reactstrap");

class Prompt extends Component {
    constructor() {
        super() 
        this.state = {
            modal: false,
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    yes = () => {
        this.setState({
            modal: false
        })
        this.props.func(this.props.param)
    }

    render() {
        return(
            <React.Fragment>
                <Button color={this.props.color} onClick={this.toggle}>{this.props.buttext}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>
                        OpenSchool
                    </ModalHeader>
                    <ModalBody>
                        {this.props.captext}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.yes}>Yes</Button>
                        <Button color="danger" onClick={this.toggle}>No</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Prompt;