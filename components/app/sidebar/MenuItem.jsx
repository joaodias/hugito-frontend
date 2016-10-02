import React, { Component } from 'react';

class MenuItem extends Component{
    onClick(e){
        e.preventDefault();
        const {setMenuItem, menuItem, handleMainContentDisplay} = this.props;
        setMenuItem(menuItem);
        this.handleMainContentDisplay(menuItem);
    }
    handleMainContentDisplay(menuItem){
        const {setShowContent, setShowContentEditor} = this.props;
        if (menuItem === 'Page Content') {
            setShowContentEditor('false');
            setShowContent('true');
        }
    }
    render(){
        const {menuItem, activeMenuItem} = this.props;
        const active = menuItem === activeMenuItem ? 'active-menu-item menu-item' : 'menu-item';
        return (
            <li className={active}>
                <a onClick={this.onClick.bind(this)}>
                    {menuItem}
                </a>
            </li>
        )
    }
}

MenuItem.propTypes = {
    menuItem: React.PropTypes.string.isRequired,
    setMenuItem: React.PropTypes.func.isRequired,
    activeMenuItem: React.PropTypes.string.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired
}

export default MenuItem
