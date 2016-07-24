import React, {Component} from 'react';
import RepositorySection from './RepositorySection.jsx';
import UserSection from './UserSection.jsx';

class TopbarSection extends Component{
    render(){
        return(
            <div id="topbar">
                <RepositorySection {...this.props}/>
                <UserSection {...this.props}/>
            </div>
        )
    }
}

TopbarSection.propTypes = {
    userName: React.PropTypes.object.isRequired,
    setUserName: React.PropTypes.func.isRequired,
    repositories: React.PropTypes.array.isRequired,
    setRepository: React.PropTypes.func.isRequired
}

export default TopbarSection
