import React, { Component } from 'react'
import { ListGroupItem } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

class ContentListItem extends Component{
    onClick(e){
        e.preventDefault();
        if (this.checkString(e.target.getAttribute("class"), "list-group-item")) {
            this.editContentFile();
        } else {
            this.props.removeContentFile(this.props.contentElement);
        }
    }
    checkString(mainString, subString){
        var result = mainString.indexOf(subString) > -1;
        return result;
    }
    editContentFile(){
        const {setShowContentEditor, showContent, fileName, setFileName, contentElement} = this.props;
        showContent.value = true;
        setShowContentEditor(showContent);
        fileName.value = contentElement.header;
        setFileName(fileName);
    }
    render(){
        return(
            <div id="list-item">
                <ListGroupItem onClick={this.onClick.bind(this)} header={this.props.contentElement.header}>Written by {this.props.contentElement.author} in {this.props.contentElement.date}</ListGroupItem>
                <Button onClick={this.onClick.bind(this)} bsSize="small" id="list-button"><Glyphicon glyph="trash" /></Button>
            </div>
        )
    }
}

ContentListItem.propTypes = {
    contentElement: React.PropTypes.object.isRequired,
    setContentElements: React.PropTypes.func.isRequired,
    showContentEditor: React.PropTypes.object.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired,
    fileName: React.PropTypes.object.isRequired,
    setFileName: React.PropTypes.func.isRequired,
    removeContentFile: React.PropTypes.func.isRequired
}

export default ContentListItem
