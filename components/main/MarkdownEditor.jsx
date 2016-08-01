import React, { Component } from 'react'
import Markdown from 'react-markdown'
import Label from 'react-bootstrap/lib/Label.js'

class MarkdownEditor extends Component {
    onChange(e){
        e.preventDefault();
        const {source, setSource} = this.props;
        source.value = e.target.value;
        setSource(source);
    }
    render() {
        return (
            <div id="markdown-editor">
                <div className="label-wrapper">
                    <Label id="markdown-label">Markdown Editor</Label>
                </div>
                <textarea
                    className="editor"
                    defaultValue="# My awesome markdown"
                    onChange={this.onChange.bind(this)}
                />
                <div id="split-line"></div>
                <div id="right-label-wrapper" className="label-wrapper">
                    <Label id="preview-label">Content Preview</Label>
                </div>
                <Markdown
                    className="preview pre-scrollable"
                    source={this.props.source.value}
                    escapeHtml
                />
            </div>
        )
    }
}

MarkdownEditor.propTypes = {
    source: React.PropTypes.object.isRequired,
    setSource: React.PropTypes.func.isRequired
}

export default MarkdownEditor
