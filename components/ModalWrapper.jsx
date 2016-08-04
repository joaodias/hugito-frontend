import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

const dummyHiddenModal = {
    show: false,
    title: "",
    fieldNames: [
        {value: ""}
    ],
    closeButton: "",
    saveButton: ""
}

class ModalWrapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            fieldValues: [
                {value: ""}
            ]
        }
    }
    onChange(e){
        const fieldValues = {value: e.target.value}
        this.setState({fieldValues});
    }
    onSave(){
        this.props.saveModal(this.state.fieldValues);
        this.onHide();
    }
    onHide(){
        this.props.setModal(dummyHiddenModal);
    }
    render() {
        return(
            <Modal
                show={this.props.modal.show}
                onHide={this.onHide.bind(this)}
                dialogClassName="custom-modal"
            >
                <ModalHeader closeButton>
                    <Modal.Title>{this.props.modal.title}</Modal.Title>
                </ModalHeader>
                <ModalBody>{
                    this.props.modal.fieldNames.map( field =>{
                        return (
                            <div>
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalText">
                                      <Col componentClass={ControlLabel} sm={3}>
                                        Content Title
                                      </Col>
                                      <Col sm={9}>
                                        <FormControl type="text" placeholder="Your Content Title" onChange={this.onChange.bind(this)}/>
                                      </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        )
                    })
                }</ModalBody>
                <ModalFooter>
                    <Button onClick={this.onHide.bind(this)}>{this.props.modal.closeButton}</Button>
                    <Button onClick={this.onSave.bind(this)} bsStyle="primary">{this.props.modal.saveButton}</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

ModalWrapper.propTypes = {
    modal: React.PropTypes.object.isRequired,
    setModal: React.PropTypes.func.isRequired,
    saveModal: React.PropTypes.func.isRequired
}

export default ModalWrapper
