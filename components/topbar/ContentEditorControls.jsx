import React, { Component }from 'react'
import { Button } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'

class ContentEditorControls extends Component{
    onClick(e){
        // TODO: Handle different buttons
        e.preventDefault();
        this.props.setShowContentEditor({value: false});
        this.props.setShowContent({value: true});
    }
    render(){
        return (
            <ul id="content-editor-controls">
                <li><Button bsSize="small" className="btn" onClick={this.onClick.bind(this)}><Glyphicon glyph="arrow-left"/></Button></li>
                <li><h5>{this.props.fileName.value}</h5></li>
                <li><Button bsSize="small" className="btn"><Glyphicon glyph="eye-open"/> Preview</Button></li>
                <li><Button bsSize="small" className="btn"><Glyphicon glyph="upload"/> Publish</Button></li>
            </ul>
        )
    }
}

ContentEditorControls.propTypes = {
    fileName: React.PropTypes.object.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired
}

export default ContentEditorControls
