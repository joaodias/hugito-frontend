import React from 'react'
import ReactDOM from 'react-dom'
import ReactRouter, { Router, Route, browserHistory } from 'react-router'
import Login from './components/Login.jsx'
import App from './components/App.jsx'
import MainSection from './components/main/MainSection.jsx'
import ContentList from './components/main/ContentList.jsx'
import ContentEditor from './components/main/ContentEditor.jsx'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Login}></Route>
        <Route path="/dashboard" component={App}></Route>
    </Router>,
    document.getElementById('app')
);
