import React, {Component} from 'react'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js'
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js'
import Button from 'react-bootstrap/lib/Button.js'

class ListItem extends Component{
    onClick(e){
        e.preventDefault();
        const {setShowContentEditor, showContent, fileName, setFileName, contentElement} = this.props;
        showContent.value = true;
        setShowContentEditor(showContent);
        fileName.value = contentElement.header;
        setFileName(fileName);
    }
    render(){
        return(
            <div id="list-item">
                <ListGroupItem onClick={this.onClick.bind(this)} header={this.props.contentElement.header}>{this.props.contentElement.footer}</ListGroupItem>
                <Button bsSize="small" id="list-button"><Glyphicon glyph="trash" /></Button>
            </div>
        )
    }
}

ListItem.propTypes = {
    contentElement: React.PropTypes.object.isRequired,
    setContentElements: React.PropTypes.func.isRequired,
    showContentEditor: React.PropTypes.object.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired,
    fileName: React.PropTypes.object.isRequired,
    setFileName: React.PropTypes.func.isRequired
}

export default ListItem
