import React, {Component} from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton.js';
import MenuItem from 'react-bootstrap/lib/MenuItem.js'

class RepositoryDropdown extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 'Select Repository'
        }
    }

    onSelect(value){
        this.setState({value});
    }

    render(){
        return(
            <div id="repository-selection">
                <DropdownButton title={this.state.value} id="repository-dropdown" pullRight className="dropdown-toggle btn" onSelect={this.onSelect.bind(this)}> {
                    this.props.repositories.map( repos =>{
                        return <MenuItem eventKey={repos.value}>{repos.value}</MenuItem>
                    })
                }</DropdownButton>
            </div>
        )
    }
}

RepositoryDropdown.propTypes = {
    repositories: React.PropTypes.array.isRequired,
    setRepository: React.PropTypes.func.isRequired
}

export default RepositoryDropdown
