import React, { Component } from 'react'
import { SocialButton } from 'react-social-button'
import { Link } from 'react-router'

class Login extends Component{
    render(){
        return(
            <div id="login-page">
                <img id="login-logo" src="../images/logo.png"></img>
                <Link to="/dashboard"><SocialButton id="login-button" social='github' text="Login with Github Account"/></Link>
                <h5>Hugito is the CMS that brings you the content and just the content. No garbage attached. It is an open source project that aims to change the way people manage their website's content.</h5>
                <ul id="login-list">
                    <li><Link to="/about"> About </Link></li>
                    <li><Link to="/blog"> Blog </Link></li>
                    <li><Link to="/terms"> Terms </Link></li>
                </ul>
            </div>
        )
    }
}

export default Login
