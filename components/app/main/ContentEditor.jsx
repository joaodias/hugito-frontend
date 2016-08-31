import React, { Component } from 'react'
import MarkdownEditor from './MarkdownEditor.jsx'

class ContentEditor extends Component {
    render() {
        return (
            <MarkdownEditor
                contentElement={this.props.currentEditingContentElement}
            />
        )
    }
}

ContentEditor.propTypes = {
    currentEditingContentElement: React.PropTypes.object.isRequired
}

export default ContentEditor
