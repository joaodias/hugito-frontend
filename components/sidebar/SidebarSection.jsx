import React, {Component} from 'react';
import MenuList from './MenuList.jsx';

class SidebarSection extends Component{
    render(){
        return(
            <div id="sidebar">
                <MenuList {...this.props} />
                <img id="sidebar-logo" src="../../images/logo-horizontal.png"></img>
            </div>
        )
    }
}

SidebarSection.propTypes = {
    menuItems: React.PropTypes.array.isRequired,
    setMenuItem: React.PropTypes.func.isRequired,
    activeMenuItem: React.PropTypes.object.isRequired
}

export default SidebarSection
