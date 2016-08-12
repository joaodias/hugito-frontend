import React, { Component } from 'react'

class MenuItem extends Component{
    onClick(e){
        e.preventDefault();
        const {setMenuItem, menuItem, handleMainContentDisplay} = this.props;
        setMenuItem(menuItem);
        this.handleMainContentDisplay(menuItem);
    }
    handleMainContentDisplay(menuItem){
        const {setShowConfiguration, setShowContent, setShowContentEditor} = this.props;
        if (menuItem.value === 'Page Content') {
            // TODO: fetch content from server
            // TODO: throw notifictions on errors
            // Hide configuration and show content
            setShowConfiguration({value: false});
            setShowContentEditor({value: false});
            setShowContent({value: true});
        } else if (menuItem.value === 'Page Configuration') {
            // TODO: fetch configuration from server
            // TODO: throw notifictions on errors
            // Hide content and show configuration
            setShowContent({value: false});
            setShowContentEditor({value: false});
            setShowConfiguration({value: true});
        }
    }
    render(){
        const {menuItem, activeMenuItem} = this.props;
        const active = menuItem === activeMenuItem ? 'active-menu-item menu-item' : 'menu-item';
        return (
            <li className={active}>
                <a onClick={this.onClick.bind(this)}>
                    {menuItem.value}
                </a>
            </li>
        )
    }
}

MenuItem.propTypes = {
    menuItem: React.PropTypes.object.isRequired,
    setMenuItem: React.PropTypes.func.isRequired,
    activeMenuItem: React.PropTypes.object.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowConfiguration: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired
}

export default MenuItem
