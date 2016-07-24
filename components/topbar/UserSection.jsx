import React, {Component} from 'react'
import UserDropdown from './UserDropdown.jsx'

class UserSection extends Component{
    render(){
        return(
            <div id="user-section">
                <UserDropdown
                    {...this.props}
                />
            </div>
        )
    }
}

UserSection.propTypes = {
    userName: React.PropTypes.object.isRequired,
    setUserName: React.PropTypes.func.isRequired
}

export default UserSection
