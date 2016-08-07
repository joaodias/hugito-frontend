import React, {Component} from 'react';
import MenuList from './MenuList.jsx';
import RepositorySection from './RepositorySection.jsx';

class SidebarSection extends Component{
    render(){
        return(
            <div id="sidebar">
                <RepositorySection {...this.props}/>
                { this.props.repositoryIsValid === true ? <MenuList {...this.props} /> : null }
                <img id="sidebar-logo" src="../../images/logo-horizontal.png"></img>
            </div>
        )
    }
}

SidebarSection.propTypes = {
    menuItems: React.PropTypes.array.isRequired,
    setMenuItem: React.PropTypes.func.isRequired,
    activeMenuItem: React.PropTypes.string.isRequired,
    repositories: React.PropTypes.array.isRequired,
    setRepository: React.PropTypes.func.isRequired,
    validateRepository: React.PropTypes.func.isRequired,
    repositoryIsValid: React.PropTypes.bool.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowConfiguration: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired
}

export default SidebarSection
