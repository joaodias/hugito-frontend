import React, { Component }from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

const modal = {
        show: 'true',
        title: 'New Content File',
        fieldNames: [
            {value: 'Content Title'}
        ],
        closeButton: 'Cancel',
        saveButton: 'Add Content',
        type: 'createContent'
}

class ContentControls extends Component{
    onClick(e){
        e.preventDefault();
        this.props.setModal(modal);
    }
    render(){
        return (
            <div id='content-controls'>
                <Button onClick={this.onClick.bind(this)} bsSize='small' className='btn'><Glyphicon glyph='plus'/> Add Content</Button>
            </div>
        )
    }
}

ContentControls.propTypes = {
    setModal: React.PropTypes.func.isRequired
}

export default ContentControls
