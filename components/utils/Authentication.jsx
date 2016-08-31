import WebSocket from 'ws';
import Socket from '../../socket.js';

const SERVER_DOMAIN = 'ws://localhost:4000';
const CLIENT_DOMAIN = 'http://localhost:8080';

export default class Authentication {
    constructor() {
        this._authentication = {
            clientId: 'ca2048cb35218bb7e36a',
            secret: '829989b4cffd217aa7e51ea16a6a30a363dfac7f',
            scopes: 'user:e-mail, repo',
            code: '',
            state: localStorage.getItem('authentication_state'),
            receivedState: '',
        }
        this._onConnect = this._onConnect.bind(this);
        this._onSetAuthenticated = this._onSetAuthenticated.bind(this);
        this._getParameterFromUrl = this._getParameterFromUrl.bind(this);
        this._setupWebSocket = this._setupWebSocket.bind(this);
        this.setCode = this.setCode.bind(this);
        this.setState = this.setState.bind(this);
        this.generateState = this.generateState.bind(this);
        this.setReceivedState = this.setReceivedState.bind(this);
        this.getScope = this.getScope.bind(this);
        this.getClientId = this.getClientId.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.callGithub = this.callGithub.bind(this);
        this.generateState = this.generateState.bind(this);
        this.checkIfAuthenticating = this.checkIfAuthenticating.bind(this);

        this._setupWebSocket(SERVER_DOMAIN);
    }
    _onConnect(){
        if(this._authentication.receivedState != '') {
            this._socket.emit('authenticate', this._authentication);
        }
    }
    _onSetAuthenticated(authenticated) {
        localStorage.setItem('authentication_authenticated', authenticated);
        if (authenticated === 'true') {
            window.open(CLIENT_DOMAIN, '_self');
        }
    }
    _getParameterFromUrl(url, target){
        let error = url.match(/[&\?]error=([^&]+)/);
        if (error) {
            console.log('Error getting ' + target + ': ' + error[1]);
            return null;
        }
        let regex = new RegExp("[&?]" + target + "=([\\w\\/\\-]+)");
        if (regex.exec(url) != null) {
            return url.match(regex)[1];
        } else {
            // Regex Error: There is no match in the url for the given target
            // pattern
            return null
        }
    }
    _setupWebSocket(serverDomain) {
        let ws = new WebSocket(serverDomain);
        let socket = this._socket = new Socket(ws);

        socket.on('connect', this._onConnect.bind(this));
        socket.on('authenticated set', this._onSetAuthenticated.bind(this));
    }
    setCode(code) {
        this._authentication.code = code;
    }
    setState(state) {
        this._authentication.state = state;
        localStorage.setItem('authentication_state', state);
    }
    setReceivedState(receivedState) {
        this._authentication.receivedState = receivedState;
    }
    getScope(scopes) {
        this._authentication.scopes = scopes;
    }
    getClientId() {
        return this._authentication.clientId;
    }
    isAuthenticated() {
        if (localStorage.getItem('authentication_authenticated') === 'true') {
            return true;
        } else {
            return false;
        }
    }
    checkIfAuthenticating(url) {
        if (url.indexOf('?code=') != -1) {
            let receivedAuthCode = this._getParameterFromUrl(url, 'code');
            let receivedState = this._getParameterFromUrl(url, 'state');
            if (receivedState === null || receivedAuthCode === null) {
                this.setCode('');
                this.setReceivedState('');
            } else {
                this.setCode(receivedAuthCode);
                this.setReceivedState(receivedState);
            }
        }
    }
    callGithub(url) {
        window.open(url, '_self');
    }
    generateState() {
        return Math.random().toString(36).substring(7);
    }
}