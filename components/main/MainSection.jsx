import React, { Component } from 'react'
import ContentList from './ContentList.jsx'
import ContentEditor from './ContentEditor.jsx'
import Welcome from './Welcome.jsx'

class MainSection extends Component{
    render(){
        return(
            <div id="main-section">
                { (this.props.showContent === true && this.props.repositoryIsValid === true) ? <ContentList {...this.props}/> : null }
                { (this.props.showContentEditor === true && this.props.repositoryIsValid === true) ? <ContentEditor {...this.props}/> : null }
                { this.props.repositoryIsValid === false ? <Welcome /> : null }
            </div>
        )
    }
}

MainSection.propTypes = {
    showContent: React.PropTypes.bool.isRequired,
    showContentEditor: React.PropTypes.bool.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired,
    contentElements: React.PropTypes.array.isRequired,
    setContentElements: React.PropTypes.func.isRequired,
    setFileName: React.PropTypes.func.isRequired,
    repositoryIsValid: React.PropTypes.bool.isRequired,
    removeContent: React.PropTypes.func.isRequired,
    currentEditingContentElement: React.PropTypes.object.isRequired,
    setCurrentEditingContent: React.PropTypes.func.isRequired
}

export default MainSection
