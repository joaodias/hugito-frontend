import React, { Component } from 'react'
import ContentControls from './ContentControls.jsx'
import ContentEditorControls from './ContentEditorControls.jsx'

class ControlSection extends Component{
    render(){
        return (
            <div id="control-section">
                { this.props.showContent === true ? <ContentControls {...this.props}/> : null }
                { this.props.showContentEditor === true ? <ContentEditorControls {...this.props}/> : null }
            </div>
        )
    }
}

ControlSection.propTypes = {
    showContent: React.PropTypes.bool.isRequired,
    showContentEditor: React.PropTypes.bool.isRequired,
    fileName: React.PropTypes.string.isRequired,
    setModal: React.PropTypes.func.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired
}

export default ControlSection
