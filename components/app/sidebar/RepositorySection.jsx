import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

const modal = {
        show: 'true',
        title: 'Add Repository',
        fieldNames: [
            {value: 'Repository:', placeholder: 'Your Repository Name', type: 'repositories'},
            {value: 'Branch:', default: 'master', placeholder: 'Your Branch Name', type: 'branches'}
        ],
        closeButton: 'Cancel',
        saveButton: 'Add Repository',
        type: 'addRepository'
}

class RepositorySection extends Component{
    onClick(e) {
        e.preventDefault();
        this.props.setModal(modal);
    }
    render() {
        return(
            <div id='repository-section'>
                <Button onClick={this.onClick.bind(this)} bsSize='small' className='btn'><Glyphicon glyph='plus'/> Add Repository</Button>
            </div>
        )
    }
}

RepositorySection.propTypes = {
    validateRepository: React.PropTypes.func.isRequired,
    setModal: React.PropTypes.func.isRequired
}

export default RepositorySection
