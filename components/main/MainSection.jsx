import React, {Component} from 'react'
import ContentList from './ContentList.jsx'

class MainSection extends Component{
    render(){
        return(
            <div id="main-section">
                { this.props.showContent.value === true ? <ContentList {...this.props}/> : null }
            </div>
        )
    }
}

MainSection.propTypes = {
    showContent: React.PropTypes.object.isRequired,
    contentElements: React.PropTypes.array.isRequired,
    setContentElements: React.PropTypes.func.isRequired
}

export default MainSection
