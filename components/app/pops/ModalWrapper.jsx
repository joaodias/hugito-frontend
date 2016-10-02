import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, FormControl, Col, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

const dummyHiddenModal = {
    show: 'false',
    title: '',
    fieldNames: [
        {value: ''}
    ],
    closeButton: '',
    saveButton: ''
}

class ModalWrapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            repository: '',
            branch: ''
        }
    }
    onChange(e){
        if (e.target.id === 'repositories') {
            const repository = e.target.value;
            this.setState({repository});
        } else if (e.target.id === 'branches') {
            const branch = e.target.value;
            this.setState({branch});
        } else {
            const value = e.target.value
            this.setState({value});
        }
    }
    onSave(){
        const {value, repository, branch} = this.state;
        const {modal, validateRepository, addContent} = this.props;
        if (modal.type === 'addRepository') {
            validateRepository(this.state.repository, this.state.branch);
            this.onHide();
        } else if(modal.type === 'addContent') {
            addContent(value);
            this.onHide();
        }
    }
    onHide(){
        this.props.setModal(dummyHiddenModal);
    }
    render() {
        const {modal} = this.props;
        const show = (modal.show === 'true');
        return(
            <Modal
                show={show}
                onHide={this.onHide.bind(this)}
                dialogClassName='custom-modal'
            >
                <ModalHeader closeButton>
                    <Modal.Title>{modal.title}</Modal.Title>
                </ModalHeader>
                <ModalBody>{
                    modal.fieldNames.map( field =>{
                        return (
                            <div>
                                <Form horizontal>
                                    <FormGroup controlId='formHorizontalText'>
                                      <Col componentClass={ControlLabel} sm={3}>
                                        {field.value}
                                      </Col>
                                      <Col sm={9}><FormControl id={field.type} type='text' placeholder={field.placeholder} onChange={this.onChange.bind(this)} defaultValue={field.default}/>
                                      </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        )
                    })
                }</ModalBody>
                <ModalFooter>
                    <Button onClick={this.onHide.bind(this)}>{modal.closeButton}</Button>
                    <Button onClick={this.onSave.bind(this)} bsStyle='primary'>{modal.saveButton}</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

ModalWrapper.propTypes = {
    modal: React.PropTypes.object.isRequired,
    setModal: React.PropTypes.func.isRequired,
    addContent: React.PropTypes.func.isRequired,
    validateRepository: React.PropTypes.func.isRequired
}

export default ModalWrapper
