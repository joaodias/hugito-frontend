import React, {Component} from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton.js';
import MenuItem from 'react-bootstrap/lib/MenuItem.js'

class UserDropdown extends Component{
    onSelect(value){
        // TODO: DO SOMETHING
    }
    render(){
        const {user} = this.props;
        return(
            <div id="user">
                <DropdownButton bsSize="small" title={user.name} id="user-dropdown" pullRight className="dropdown-toggle btn" onSelect={this.onSelect.bind(this)}>
                    <MenuItem eventKey="Option 1">Option 1</MenuItem>
                    <MenuItem eventKey="Option 2">Option 2</MenuItem>
                    <MenuItem eventKey="Option 3">Option 3</MenuItem>
                    <MenuItem divider/>
                    <MenuItem eventKey="Logout">Logout</MenuItem>
                </DropdownButton>
            </div>
        )
    }
}

UserDropdown.propTypes = {
    user: React.PropTypes.object.isRequired,
    setUser: React.PropTypes.func.isRequired
}

export default UserDropdown
