import React, { Component }from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

class ContentEditorControls extends Component{
    onClick(e){
        e.preventDefault();
        if (e.target.id === "") {
            // Go back
            console.log("Go back");
            this.props.setShowContentEditor('false');
            this.props.setShowContent('true');
        } else if (e.target.id === "content-publish") {
            // Publish to the server
            let {updateContent} = this.props;
            updateContent();
        }
    }
    render(){
        return (
            <ul id='content-editor-controls'>
                <li><Button id="content-back" bsSize='small' className='btn' onClick={this.onClick.bind(this)}><Glyphicon glyph='arrow-left'/></Button></li>
                <li><h5>{this.props.fileName}</h5></li>
                <li><Button id="content-publish" bsSize='small' className='btn' onClick={this.onClick.bind(this)}><Glyphicon glyph='arrow-up'/> Publish</Button></li>
            </ul>
        )
    }
}

ContentEditorControls.propTypes = {
    fileName: React.PropTypes.string.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired,
    updateContent: React.PropTypes.func.isRequired
}

export default ContentEditorControls
