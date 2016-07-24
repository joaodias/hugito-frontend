import React, {Component} from 'react';
import RepositorySection from './RepositorySection.jsx';
import UserSection from './UserSection.jsx';
import ControlSection from './ControlSection.jsx'

class TopbarSection extends Component{
    render(){
        return(
            <div id="topbar">
                <RepositorySection {...this.props}/>
                <UserSection {...this.props}/>
                <ControlSection {...this.props}/>
            </div>
        )
    }
}

TopbarSection.propTypes = {
    userName: React.PropTypes.object.isRequired,
    setUserName: React.PropTypes.func.isRequired,
    repositories: React.PropTypes.array.isRequired,
    setRepository: React.PropTypes.func.isRequired,
    showContent: React.PropTypes.object.isRequired
}

export default TopbarSection
