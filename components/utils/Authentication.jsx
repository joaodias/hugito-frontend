import 'whatwg-fetch';

const CLIENT_DOMAIN = 'http://localhost:3000';
const SERVER_DOMAIN = 'http://localhost:4000';

export default class Authentication {
    constructor() {
        this._authentication = {
            clientId: 'f3387b979183f21efc69',
            secret: 'ff4f508cafe7537c811639f9e9f7d20221c6395d',
            scopes: [
                'user:e-mail',
                'repo'
            ],
            code: '',
            state: localStorage.getItem('authentication_state'),
            receivedState: '',
        }
        this._authenticate = this._authenticate.bind(this);
        this._onSetAuthenticated = this._onSetAuthenticated.bind(this);
        this._getParameterFromUrl = this._getParameterFromUrl.bind(this);
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

        this._authenticate();
    }
    _authenticate(){
        if(this._authentication.receivedState != '') {
            fetch(SERVER_DOMAIN + "/auth", {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "access-control-allow-origin, content-type,  access-control-allow-headers, access-control-allow-methods",
                    "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(this._authentication),
            })
            .then(this.handleFetchErrors)
            .then(response => response.json())
            .then(auth => auth = this._onSetAuthenticated(auth.accessToken))
            .catch(console.log("Authentication Failed"))
        }
    }
    _onSetAuthenticated(access_token) {
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('authentication_authenticated', 'true');
        window.open(CLIENT_DOMAIN, '_self');
    }
    _onError(error) {
        localStorage.setItem('authentication_authenticated', 'false');
    }
    _getParameterFromUrl(url, target){
        let error = url.match(/[&\?]error=([^&]+)/);
        if (error) {
            return null;
        }
        let regex = new RegExp('[&?]' + target + '=([\\w\\/\\-]+)');
        if (regex.exec(url) != null) {
            return url.match(regex)[1];
        } else {
            // Regex Error: There is no match in the url for the given target
            // pattern
            return null
        }
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
    getScope() {
        return this._authentication.scopes;
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
                this._authenticate();
            }
        }
    }
    callGithub(url) {
        window.open(url, '_self');
    }
    generateState() {
        return Math.random().toString(36).substring(7);
    }
    handleFetchErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
}
