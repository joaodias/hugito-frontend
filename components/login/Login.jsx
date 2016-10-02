import React, { Component, PropTypes } from 'react';
import SocialButton from 'react-social-button/lib/SocialButton.js';
import { Link } from 'react-router';
import GithubLogin from './GithubLogin.jsx';
import Authentication from '../utils/Authentication.jsx';

class Login extends Component{
    render(){
        const { auth, failedLogin } = this.props;
        return(
            <div id='login-page'>
                <img id='login-logo' src='../images/logo.png'></img>
                <GithubLogin auth={auth}></GithubLogin>
                <h5>Hugito is the CMS that brings you the content and just the content. No garbage attached. It is an open source project that aims to change the way people manage their website's content.</h5>
                <ul id='login-list'>
                    <li><Link to='/about'> About </Link></li>
                    <li><Link to='/blog'> Blog </Link></li>
                    <li><Link to='/terms'> Terms </Link></li>
                </ul>
            </div>
        )
    }
}

Login.propTypes = {
    auth: PropTypes.instanceOf(Authentication),
    failedLogin: PropTypes.string
}

export default Login
