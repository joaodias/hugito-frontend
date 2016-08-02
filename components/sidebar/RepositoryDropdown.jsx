import React, {Component} from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton.js';
import MenuItem from 'react-bootstrap/lib/MenuItem.js'

class RepositoryDropdown extends Component{
    constructor(props){
        super(props);
        this.state = {repositoryName: 'Select Repository'}
    }
    onSelect(repositoryName){
        this.setState({repositoryName});
        this.props.validateRepository(repositoryName);
    }
    render(){
        return(
            <div id="repository-selection">
                <DropdownButton title={this.state.repositoryName} id="repository-dropdown" pullRight className="dropdown-toggle btn" onSelect={this.onSelect.bind(this)}> {
                    this.props.repositories.map( repos =>{
                        return <MenuItem eventKey={repos.repositoryName}>{repos.repositoryName}</MenuItem>
                    })
                }</DropdownButton>
            </div>
        )
    }
}

RepositoryDropdown.propTypes = {
    repositories: React.PropTypes.array.isRequired,
    setRepository: React.PropTypes.func.isRequired,
    validateRepository: React.PropTypes.func.isRequired
}

export default RepositoryDropdown
