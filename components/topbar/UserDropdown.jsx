import React, {Component} from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton.js';
import MenuItem from 'react-bootstrap/lib/MenuItem.js'

class UserDropdown extends Component{
    onSelect(value){
        // DO SOMETHING
    }

    render(){
        const {userName} = this.props;
        return(
            <div id="user">
                <DropdownButton bsSize="small" title={userName.value} id="user-dropdown" pullRight className="dropdown-toggle btn" onSelect={this.onSelect.bind(this)}>
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
    userName: React.PropTypes.object.isRequired,
    setUserName: React.PropTypes.func.isRequired
}

export default UserDropdown
