import React, {Component} from 'react'
import ContentControls from './ContentControls.jsx'

class ControlSection extends Component{
    render(){
        return (
            <div id="control-section">
                { this.props.showContent.value === true ? <ContentControls /> : null }
            </div>
        )
    }
}

ControlSection.propTypes = {
    showContent: React.PropTypes.object.isRequired
}

export default ControlSection
