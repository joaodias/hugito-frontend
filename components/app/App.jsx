import React, { Component } from 'react';
import SidebarSection from './sidebar/SidebarSection.jsx';
import TopbarSection from './topbar/TopbarSection.jsx';
import MainSection from './main/MainSection.jsx';
import NotificationWrapper from './pops/NotificationWrapper.jsx';
import ModalWrapper from './pops/ModalWrapper.jsx';
import Socket from '../../socket.js';

const CLIENT_DOMAIN = 'http://localhost:4001';
const SERVER_DOMAIN = 'ws://localhost:4000';
const ACCESS_TOKEN = localStorage.getItem('access_token')

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            connected: 'false',
            loggedIn: 'true',
            user: {name: ''},
            currentRepository: '',
            // represents the user inputed repository.
            selectedRepository: '',
            repositoryIsValid: 'false',
            validRepositories: {
                names: []
            },
            treeMenu: [],
            activeMenuItem: '',
            contentElements: [],
            currentEditingContentElement: {},
            showContent: 'false',
            showContentEditor: 'false',
            fileName: '',
            notification: {
                isActive: 'false',
                message: '',
                dismissAfter: 1,
                style: 'true',
                isSuccess: 'true'
            },
            modal: {
                show: 'false',
                title: '',
                fieldNames: [
                    {value: ''}
                ],
                closeButton: '',
                saveButton: ''
            }
        }
    }
    componentDidMount() {
        let ws = new WebSocket(SERVER_DOMAIN);
        let socket = this.socket = new Socket(ws);
        socket.on('connect', this.onConnect.bind(this));
        socket.on('disconnect', this.onDisconnect.bind(this));

        socket.on('repository validate', this.onRepositoryValidation.bind(this));

        socket.on('content add', this.onAddContent.bind(this));
        socket.on('content remove', this.onRemoveContent.bind(this));
        socket.on('content list', this.onListContent.bind(this));
        socket.on('content set', this.onSetContent.bind(this))

        socket.on('error', this.onError.bind(this))

        socket.on('logout', this.logout.bind(this));
        socket.on('user set', this.onSetUser.bind(this));
    }
    onConnect(){
        this.setConnected('true');
        this.getUser();
    }
    onDisconnect(){
        this.setConnected('false');
    }
    getUser(){
        let user = {
            name: '',
            accessToken: ACCESS_TOKEN
        }
        this.socket.emit('user get', user)
    }
    onSetUser(user){
        this.setUser(user);
    }
    logout(){
        localStorage.setItem('authentication_authenticated', 'false');
        window.open(CLIENT_DOMAIN, '_self');
    }
    validateRepository(name, branch){
        let repository = {
            name: name,
            branch: branch,
            valid: 'false',
            accessToken: ACCESS_TOKEN
        }
        this.setSelectedRepository(name);
        this.socket.emit('repository validate', repository);
    }
    onRepositoryValidation(repositoryIsValid){
        console.log("REPO NAME: ", repositoryIsValid);
        if (repositoryIsValid != 'Repository is valid.') {
            this.throwNotification('Repository is not valid.', 'false');
        } else {
            // TODO: Make the current repository equals to the selected repository.
            this.setRepositorieIsValid('true');
            this.addValidRepository();
            this.buildRepositoryTree();
            this.throwNotification('Repository is ready!', 'true');
        }
    }
    addValidRepository(){
        let {selectedRepository} = this.state;
        let {validRepositories} = this.state;
        validRepositories.names.push(selectedRepository);
        this.setValidRepositories(validRepositories);
    }
    // TODO: Remove validRepository
    buildRepositoryTree(){
        let {validRepositories} = this.state;
        let {treeMenu} = this.state;
        for (var i = 0; i < validRepositories.names.length; i++) {
            let navList = [{icon: 'fa fa-pencil', id: 'page-content', text: 'Page Content'}];
            let treeEntry = {id: validRepositories.names[i], icon: 'fa fa-cube', text: validRepositories.names[i], navlist: navList};
            treeMenu.push(treeEntry);
        }
        return treeMenu;
    }
    setActiveMenuItem(activeMenuItem){
        this.setState({activeMenuItem});
        switch(activeMenuItem) {
            case '':
                // Set all other shows to false
                this.setShowContent('false');
                // DO NOTHING
                break;
            case 'page-content':
                console.log("setActiveMenuItem");
                // Get list of content from the server.
                this.listContent(this.state.selectedRepository);
                this.setShowContent('true');
                break;
            default:
                // Clear everything
                activeMenuItem = '';
                this.setState({activeMenuItem});
                this.setShowContent('false');
                break;
        }
    }
    addContent(fileName){
        let {user} = this.state;
        const data = {
            header: fileName,
            author: user.name,
            date: 'some date'
        }
        this.socket.emit('content add', data);
    }
    onAddContent(contentElement){
        let {contentElements} = this.state;
        contentElements.push(contentElement);
        this.setContentElements({contentElements});
    }
    removeContent(contentElement){
        this.socket.emit('content remove', contentElement);
    }
    onRemoveContent(contentElement){
        let {contentElements} = this.state;
        for (var i = 0; i < contentElements.length; i++) {
            if (contentElements[i] === contentElement) {
                contentElements.splice(i, 1);
                this.setContentElements(contentElements);
                return;
            }
        }
    }
    listContent(){
        let {selectedRepository} = this.state;
        let contentElements = {
            name: selectedRepository,
            titles: [],
            accessToken: ACCESS_TOKEN
        }
        this.socket.emit('content list', contentElements);
    }
    onListContent(content){
        let {contentElements, showContent} = this.state;
        for (var i = 0; i < content.title.length; i++) {
            let contentElement = {header: content.title[i], author: '', date: ''};
            contentElements.push(contentElement)
        }
        this.setContentElements(contentElements);
    }
    getFileContent(fileName){
        let {selectedRepository} = this.state;
        let data = {
            repositoryName: selectedRepository,
            title: fileName,
            body: '',
            accessToken: ACCESS_TOKEN
        }
        this.socket.emit('content get', data);
    }
    onSetContent(currentEditingContentElement){
        this.setShowContent('false');
        this.setShowContentEditor('true');
        this.setFileName(currentEditingContentElement.title);
        this.setCurrentEditingContent(currentEditingContentElement);
    }
    throwNotification(message, isSuccess){
        const notification = {
                isActive: 'true',
                message: message,
                dismissAfter: 2000,
                style: 'true',
                isSuccess: isSuccess
        }
        this.setNotification(notification);
    }
    setConnected(connected){
        this.setState({connected});
    }
    setUser(user){
        this.setState({user});
    }
    setSelectedRepository(selectedRepository){
        this.setState({selectedRepository});
    }
    setValidRepositories(validRepositories){
        this.setState({validRepositories});
    }
    setRepositorieIsValid(repositoryIsValid){
        this.setState({repositoryIsValid});
    }
    setShowContent(showContent){
        this.setState({showContent});
    }
    setContentElements(contentElements){
        this.setState({contentElements});
    }
    setShowContentEditor(showContentEditor){
        this.setState({showContentEditor});
    }
    setFileContent(currentEditingContentElement){
        this.setState({currentEditingContentElement});
    }
    setCurrentEditingContent(currentEditingContentElement){
        this.setState({currentEditingContentElement});
    }
    setFileName(fileName){
        this.setState({fileName});
    }
    setNotification(notification){
        this.setState({notification});
    }
    setModal(modal){
        this.setState({modal});
    }
    onError(error){
        console.log("ONERROR!", error);
        this.throwNotification(error, 'false');
    }
    render(){
        return (
            <div>
                <TopbarSection
                    user={this.state.user}
                    setUser={this.setUser.bind(this)}
                    showContent={this.state.showContent}
                    showContentEditor={this.state.showContentEditor}
                    fileName={this.state.fileName}
                    repositoryIsValid={this.state.repositoryIsValid}
                    setModal={this.setModal.bind(this)}
                    setShowContent={this.setShowContent.bind(this)}
                    setShowContentEditor={this.setShowContentEditor.bind(this)}
                    logout={this.logout.bind(this)}
                />
                <SidebarSection
                    setActiveMenuItem={this.setActiveMenuItem.bind(this)}
                    activeMenuItem={this.state.activeMenuItem}
                    setActiveMenuItem={this.setActiveMenuItem.bind(this)}
                    treeMenu={this.state.treeMenu}
                    validateRepository={this.validateRepository.bind(this)}
                    repositoryIsValid={this.state.repositoryIsValid}
                    setShowContent={this.setShowContent.bind(this)}
                    setShowContentEditor={this.setShowContentEditor.bind(this)}
                    setModal={this.setModal.bind(this)}
                />
                <MainSection
                    showContent={this.state.showContent}
                    showContentEditor={this.state.showContentEditor}
                    contentElements={this.state.contentElements}
                    repositoryIsValid={this.state.repositoryIsValid}
                    removeContent={this.removeContent.bind(this)}
                    currentEditingContentElement={this.state.currentEditingContentElement}
                    getFileContent={this.getFileContent.bind(this)}
                    setFileContent={this.setFileContent.bind(this)}
                />
                <NotificationWrapper
                    notification={this.state.notification}
                    setNotification={this.setNotification.bind(this)}
                />
                <ModalWrapper
                    modal={this.state.modal}
                    setModal={this.setModal.bind(this)}
                    addContent={this.addContent.bind(this)}
                    validateRepository={this.validateRepository.bind(this)}
                />
            </div>
        )
    }
}

export default App
