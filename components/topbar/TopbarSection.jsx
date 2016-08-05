import React, { Component } from 'react';
import UserSection from './UserSection.jsx';
import ControlSection from './ControlSection.jsx'

class TopbarSection extends Component{
    render(){
        return(
            <div id="topbar">
                <UserSection {...this.props}/>
                { this.props.repositoryIsValid.value === true ? <ControlSection {...this.props}/> : null }
            </div>
        )
    }
}

TopbarSection.propTypes = {
    user: React.PropTypes.object.isRequired,
    setUser: React.PropTypes.func.isRequired,
    showContent: React.PropTypes.object.isRequired,
    showContentEditor: React.PropTypes.object.isRequired,
    fileName: React.PropTypes.object.isRequired,
    repositoryIsValid: React.PropTypes.object.isRequired,
    setModal: React.PropTypes.func.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired
}

export default TopbarSection
