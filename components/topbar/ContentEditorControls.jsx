import React, {Component}from 'react'
import Button from 'react-bootstrap/lib/Button.js'
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js'

class ContentEditorControls extends Component{
    render(){
        return (
            <ul id="content-editor-controls">
                <li><h5>{this.props.fileName.value}</h5></li>
                <li><Button bsSize="small" className="btn"><Glyphicon glyph="eye-open"/> Preview</Button></li>
                <li><Button bsSize="small" className="btn"><Glyphicon glyph="upload"/> Publish</Button></li>
            </ul>
        )
    }
}

ContentEditorControls.propTypes = {
    fileName: React.PropTypes.object.isRequired
}

export default ContentEditorControls
