import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ThankModal extends Component {
    render() {
        return (
            <Modal size="lg" isOpen={this.props.show} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                    Thanks for Donating
                </ModalHeader>
                <ModalBody>
                    <h5>We Appriciate your help</h5>
                </ModalBody>
            </Modal>
        )
    }
}

export default ThankModal
