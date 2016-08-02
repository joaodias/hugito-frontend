import React, {Component} from 'react'
import ContentList from './ContentList.jsx'
import ContentEditor from './ContentEditor.jsx'
import Welcome from './Welcome.jsx'

class MainSection extends Component{
    render(){
        return(
            <div id="main-section">
                { (this.props.showContent.value === true && this.props.repositoryIsValid.value === true) ? <ContentList {...this.props}/> : null }
                { (this.props.showContentEditor.value === true && this.props.repositoryIsValid.value === true) ? <ContentEditor {...this.props}/> : null }
                { this.props.repositoryIsValid.value === false ? <Welcome /> : null }
            </div>
        )
    }
}

MainSection.propTypes = {
    showContent: React.PropTypes.object.isRequired,
    showContentEditor: React.PropTypes.object.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired,
    contentElements: React.PropTypes.array.isRequired,
    setContentElements: React.PropTypes.func.isRequired,
    source: React.PropTypes.object.isRequired,
    setSource: React.PropTypes.func.isRequired,
    fileName: React.PropTypes.object.isRequired,
    setFileName: React.PropTypes.func.isRequired,
    repositoryIsValid: React.PropTypes.object.isRequired
}

export default MainSection
