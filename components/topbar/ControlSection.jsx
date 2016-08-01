import React, {Component} from 'react'
import ContentControls from './ContentControls.jsx'
import ContentEditorControls from './ContentEditorControls.jsx'

class ControlSection extends Component{
    render(){
        return (
            <div id="control-section">
                { this.props.showContent.value === true ? <ContentControls /> : null }
                { this.props.showContentEditor.value === true ? <ContentEditorControls {...this.props}/> : null }
            </div>
        )
    }
}

ControlSection.propTypes = {
    showContent: React.PropTypes.object.isRequired,
    showContentEditor: React.PropTypes.object.isRequired,
    fileName: React.PropTypes.object.isRequired
}

export default ControlSection
