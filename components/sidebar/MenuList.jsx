import React, {Component} from 'react'
import MenuItem from './MenuItem.jsx'

class MenuList extends Component{
    render(){
        return(
            <ul className="menu-list"> {
                this.props.menuItems.map( mitem =>{
                    return <MenuItem
                        menuItem={mitem}
                        key={mitem.id}
                        {...this.props}
                    />
                })
            }</ul>
        )
    }
}

MenuList.propTypes = {
    menuItems: React.PropTypes.array.isRequired,
    setMenuItem: React.PropTypes.func.isRequired,
    activeMenuItem: React.PropTypes.object.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowConfiguration: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired
}

export default MenuList
