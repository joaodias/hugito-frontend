import React, {Component}from 'react'
import Button from 'react-bootstrap/lib/Button.js'
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js'

class ContentControls extends Component{
    render(){
        return (
            <div id="content-controls">
                <Button bsSize="small" className="btn"><Glyphicon glyph="plus"/> Add Content</Button>
            </div>
        )
    }
}

export default ContentControls
