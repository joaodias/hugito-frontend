import React, {Component} from 'react';
import UserSection from './UserSection.jsx';
import ControlSection from './ControlSection.jsx'

class TopbarSection extends Component{
    render(){
        return(
            <div id="topbar">
                <UserSection {...this.props}/>
                <ControlSection {...this.props}/>
            </div>
        )
    }
}

TopbarSection.propTypes = {
    userName: React.PropTypes.object.isRequired,
    setUserName: React.PropTypes.func.isRequired,
    showContent: React.PropTypes.object.isRequired,
    showContentEditor: React.PropTypes.object.isRequired,
    fileName: React.PropTypes.object.isRequired
}

export default TopbarSection
