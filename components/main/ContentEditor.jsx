import React, { Component } from 'react'
import MarkdownEditor from './MarkdownEditor.jsx'

class ContentEditor extends Component {
    render() {
        return (
            <MarkdownEditor {...this.props}/>
        )
    }
}

ContentEditor.propTypes = {
    source: React.PropTypes.object.isRequired,
    setSource: React.PropTypes.func.isRequired
}

export default ContentEditor
