import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import ContentListItem from './ContentListItem.jsx';

class ContentList extends Component{
    render(){
        return(
            <ListGroup id='content-list'>{
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
    removeContent: React.PropTypes.func.isRequired,
    getFileContent: React.PropTypes.func.isRequired
}

export default ContentList
