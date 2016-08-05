import React, { Component } from 'react'
import ContentControls from './ContentControls.jsx'
import ContentEditorControls from './ContentEditorControls.jsx'

class ControlSection extends Component{
    render(){
        return (
            <div id="control-section">
                { this.props.showContent.value === true ? <ContentControls {...this.props}/> : null }
                { this.props.showContentEditor.value === true ? <ContentEditorControls {...this.props}/> : null }
            </div>
        )
    }
}

ControlSection.propTypes = {
    showContent: React.PropTypes.object.isRequired,
    showContentEditor: React.PropTypes.object.isRequired,
    fileName: React.PropTypes.object.isRequired,
    setModal: React.PropTypes.func.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired
}

export default ControlSection
