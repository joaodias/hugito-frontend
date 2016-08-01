import React, {Component} from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup.js'
import ListItem from './ListItem.jsx'

class ContentList extends Component{
    render(){
        return(
            <ListGroup id="content-list">{
                this.props.contentElements.map( element =>{
                    return <ListItem
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
    showContentEditor: React.PropTypes.object.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired,
    fileName: React.PropTypes.object.isRequired,
    setFileName: React.PropTypes.func.isRequired
}

export default ContentList
