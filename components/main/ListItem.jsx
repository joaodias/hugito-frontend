import React, {Component} from 'react'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js'
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js'
import Button from 'react-bootstrap/lib/Button.js'

class ListItem extends Component{
    render(){
        return(
            <div id="list-item">
                <ListGroupItem listIcon="true" header={this.props.contentElement.header}>{this.props.contentElement.footer}</ListGroupItem>
                <Button bsSize="small" id="list-button"><Glyphicon glyph="trash" /></Button>
            </div>
        )
    }
}

ListItem.propTypes = {
    contentElement: React.PropTypes.object.isRequired,
    setContentElements: React.PropTypes.func.isRequired
}

export default ListItem
