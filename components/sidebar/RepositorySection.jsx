import React, {Component} from 'react';
import RepositoryDropdown from './RepositoryDropdown.jsx';

class RepositorySection extends Component{
    render(){
        return(
            <div id="repository-section">
                <RepositoryDropdown {...this.props}/>
            </div>
        )
    }
}

RepositorySection.propTypes = {
    repositories: React.PropTypes.array.isRequired,
    setRepository: React.PropTypes.func.isRequired,
    validateRepository: React.PropTypes.func.isRequired
}

export default RepositorySection
