import React, { Component } from 'react'

class MenuItem extends Component{
    onClick(e){
        e.preventDefault();
        const {setMenuItem, menuItem} = this.props;
        setMenuItem(menuItem);
    }
    render(){
        const {menuItem, activeMenuItem} = this.props;
        const active = menuItem === activeMenuItem ? 'active-menu-item' : '';
        return (
            <li id="menu-item" className={active}>
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
    activeMenuItem: React.PropTypes.object.isRequired
}

export default MenuItem
