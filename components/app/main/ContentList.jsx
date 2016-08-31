import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import ContentListItem from './ContentListItem.jsx'

class ContentList extends Component{
    render(){
        return(
            <ListGroup id="content-list">{
                this.props.contentElements.map( element =>{
                    return <ContentListItem
                        contentElement={element}
                        key={element.id}
                        {...this.props}
                    />
                })
            }</ListGroup>
        )
    }
}

ContentList.propTypes = {
    contentElements: React.PropTypes.array.isRequired,
    setContentElements: React.PropTypes.func.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired,
    setFileName: React.PropTypes.func.isRequired,
    removeContent: React.PropTypes.func.isRequired,
    setCurrentEditingContent: React.PropTypes.func.isRequired
}

export default ContentList
