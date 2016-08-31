import React, { Component } from 'react'
import Markdown from 'react-markdown'
import { Label } from 'react-bootstrap'

class MarkdownEditor extends Component {
    constructor(props){
        super(props);
        const {contentElement} = this.props;
        this.state = {
            source: contentElement.source
        }
    }
    onChange(e){
        e.preventDefault();
        const source = e.target.value;
        this.setState({source});
    }
    render() {
        return (
            <div id="markdown-editor">
                <div className="label-wrapper">
                    <Label id="markdown-label">Markdown Editor</Label>
                </div>
                <textarea
                    className="editor"
                    defaultValue={this.state.source}
                    onChange={this.onChange.bind(this)}
                />
                <div id="split-line"></div>
                <div id="right-label-wrapper" className="label-wrapper">
                    <Label id="preview-label">Content Preview</Label>
                </div>
                <Markdown
                    className="preview pre-scrollable"
                    source={this.state.source}
                    escapeHtml
                />
            </div>
        )
    }
}

MarkdownEditor.propTypes = {
    contentElement: React.PropTypes.object.isRequired
}

export default MarkdownEditor
