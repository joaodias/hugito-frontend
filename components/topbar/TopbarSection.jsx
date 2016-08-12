import React, { Component } from 'react';
import UserSection from './UserSection.jsx';
import ControlSection from './ControlSection.jsx'

class TopbarSection extends Component{
    render(){
        return(
            <div id="topbar">
                <UserSection {...this.props}/>
                { this.props.repositoryIsValid === true ? <ControlSection {...this.props}/> : null }
            </div>
        )
    }
}

TopbarSection.propTypes = {
    user: React.PropTypes.object.isRequired,
    setUser: React.PropTypes.func.isRequired,
    showContent: React.PropTypes.bool.isRequired,
    showContentEditor: React.PropTypes.bool.isRequired,
    fileName: React.PropTypes.string.isRequired,
    repositoryIsValid: React.PropTypes.bool.isRequired,
    setModal: React.PropTypes.func.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired
}

export default TopbarSection
