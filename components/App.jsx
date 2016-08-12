import React, { Component } from 'react'
import SidebarSection from './sidebar/SidebarSection.jsx'
import TopbarSection from './topbar/TopbarSection.jsx'
import MainSection from './main/MainSection.jsx'
import NotificationWrapper from './NotificationWrapper.jsx'
import ModalWrapper from './ModalWrapper.jsx'
import Socket from '../socket.js';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {name: 'Joao Dias'},
            menuItems: [
                {value: 'Page Content'}
            ],
            activeMenuItem: 'Page Content',
            repositories: [
                {repositoryName: 'Repository #1'},
                {repositoryName: 'Repository #2'},
                {repositoryName: 'Repository #3'}
            ],
            repositoryIsValid: false,
            contentElements: [
                {header: 'Content Name #1', author: 'Joao Dias', date: "whateva", source: "## Content Name #1"},
                {header: 'Content Name #2', author: 'Joao Dias', date: "whateva", source: "## Content Name #2"},
                {header: 'Content Name #3', author: 'Joao Dias', date: "whateva", source: "## Content Name #3"},
                {header: 'Content Name #4', author: 'Joao Dias', date: "whateva", source: ""},
                {header: 'Content Name #1', author: 'Joao Dias', date: "whateva", source: ""},
                {header: 'Content Name #2', author: 'Joao Dias', date: "whateva", source: ""},
                {header: 'Content Name #3', author: 'Joao Dias', date: "whateva", source: ""},
                {header: 'Content Name #4', author: 'Joao Dias', date: "whateva", source: ""},
                {header: 'Content Name #1', author: 'Joao Dias', date: "whateva", source: ""},
                {header: 'Content Name #2', author: 'Joao Dias', date: "whateva", source: ""},
                {header: 'Content Name #3', author: 'Joao Dias', date: "whateva", source: ""},
                {header: 'Content Name #4', author: 'Joao Dias', date: "whateva", source: ""},
            ],
            currentEditingContentElement: {},
            showContent: true,
            showConfiguration: false,
            showContentEditor: false,
            fileName: '',
            notification: {
                isActive: false,
                message: "",
                dismissAfter: 1,
                style: true,
                isSuccess: true
            },
            modal: {
                show: false,
                title: "",
                fieldNames: [
                    {value: ""}
                ],
                closeButton: "",
                saveButton: ""
            },
            connected: false,
            loggedIn: true
        }
    }
    componentDidMount() {
        let ws = new WebSocket('ws://localhost:4000');
        let socket = this.socket = new Socket(ws);
        socket.on('connect', this.onConnect.bind(this));
        socket.on('disconnect', this.onDisconnect.bind(this));

        socket.on('repository add', this.onAddRepository);
        socket.on('repository remove', this.onRemoveRepository);
        socket.on('repository validate', this.onRepositoryValidation.bind(this));

        socket.on('content add', this.onAddContent.bind(this));
        socket.on('content remove', this.onRemoveContent.bind(this));
        socket.on('content update', this.onUpdateContent.bind(this));

        socket.on('configuration add', this.onAddConfiguration.bind(this))
        socket.on('configuration remove', this.onRemoveConfiguration.bind(this))
        socket.on('configuration update', this.onUpdateConfiguration.bind(this))

        socket.on('user set', this.onSetUser.bind(this));
    }
    onConnect(){
        this.setState({connected: true});
        this.socket.emit('repository subscribe');
        this.socket.emit('content subscribe');
        this.socket.emit('configuration subscribe');
        this.socket.emit('user subscribe');
    }
    onDisconnect(){
        this.setState({connected: false});
    }
    setMenuItem(activeMenuItem){
        this.setState({activeMenuItem});
    }
    setShowConfiguration(showConfiguration){
        this.setState({showConfiguration});
    }
    setShowContent(showContent){
        this.setState({showContent});
    }
    setContentElements(contentElement){
        this.setState({contentElement});
    }
    setCurrentEditingContent(currentEditingContentElement){
        console.log(currentEditingContentElement);
        this.setState({currentEditingContentElement});
    }
    setShowContentEditor(showContentEditor){
        this.setState({showContentEditor});
    }
    setFileName(fileName){
        this.setState({fileName});
    }
    setUser(user){
        this.setState({user});
    }
    setRepository(repository){
        this.setState({repository});
    }
    setNotification(notification){
        this.setState({notification});
    }
    setModal(modal){
        this.setState({modal})
    }
    onRemoveRepository(repository){
        for (var i = 0; i < this.state.repositories.length; i++) {
            if (this.state.repositories[i] === repository) {
                this.state.repositories.splice(i, 1);
                this.setContentElements(this.state.repositories);
                return;
            }
        }
    }
    onAddRepository(repository){
        let {repositories} = this.state;
        repositories.push(repository);
        this.setState({repositories});
    }
    onRepositoryValidation(repositoryIsValid){
        console.log(repositoryIsValid);
        if (!repositoryIsValid) {
            this.throwNotification("The selected repository is not valid", false);
        } else {
            this.setState({repositoryIsValid});
            this.throwNotification("The selected repository was fetched successfully", true);
        }
    }
    validateRepository(repositoryName){
        this.socket.emit('repository validate', repositoryName);
    }
    onRemoveContent(contentElement){
        for (var i = 0; i < this.state.contentElements.length; i++) {
            if (this.state.contentElements[i] === contentElement) {
                this.state.contentElements.splice(i, 1);
                this.setContentElements(this.state.contentElement);
                return;
            }
        }
    }
    removeContent(contentElement){
        this.socket.emit('content remove', contentElement);
    }
    onAddContent(contentElement){
        let {contentElements} = this.state;
        contentElements.push(contentElement);
        this.setState({contentElements});
    }
    addContent(fileName){
        const data = {
            header: fileName,
            author: this.state.user.name,
            date: 'some date'
        }
        this.socket.emit('content add', data);
    }
    onUpdateContent(contentElement){
        for (var i = 0; i < this.state.contentElements.length; i++) {
            if (this.state.contentElements[i] === contentElement) {
                this.state.contentElements[i] === contentElement;
                this.setContentElements(this.state.contentElement);
                return;
            }
        }
    }
    onAddConfiguration(){
        // TODO: implement
    }
    onRemoveConfiguration(){
        // TODO: implement
    }
    onUpdateConfiguration(){
        // TODO: implement
    }
    onSetUser(user){
        this.setState({user});
    }
    throwNotification(message, isSuccess){
        const notification = {
                isActive: true,
                message: message,
                dismissAfter: 5000,
                style: true,
                isSuccess: isSuccess
        }
        this.setNotification(notification);
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
                />
                <SidebarSection
                    menuItems={this.state.menuItems}
                    activeMenuItem={this.state.activeMenuItem}
                    setMenuItem={this.setMenuItem.bind(this)}
                    repositories={this.state.repositories}
                    setRepository={this.setRepository.bind(this)}
                    validateRepository={this.validateRepository.bind(this)}
                    repositoryIsValid={this.state.repositoryIsValid}
                    setShowContent={this.setShowContent.bind(this)}
                    setShowConfiguration={this.setShowConfiguration.bind(this)}
                    setShowContentEditor={this.setShowContentEditor.bind(this)}
                />
                <MainSection
                    showContent={this.state.showContent}
                    showContentEditor={this.state.showContentEditor}
                    setShowContent={this.setShowContent.bind(this)}
                    setShowContentEditor={this.setShowContentEditor.bind(this)}
                    contentElements={this.state.contentElements}
                    setContentElements={this.setContentElements.bind(this)}
                    setFileName={this.setFileName.bind(this)}
                    repositoryIsValid={this.state.repositoryIsValid}
                    removeContent={this.removeContent.bind(this)}
                    setCurrentEditingContent={this.setCurrentEditingContent.bind(this)}
                    currentEditingContentElement={this.state.currentEditingContentElement}
                />
                <NotificationWrapper
                    notification={this.state.notification}
                    setNotification={this.setNotification.bind(this)}
                />
                <ModalWrapper
                    modal={this.state.modal}
                    setModal={this.setModal.bind(this)}
                    addContent={this.addContent.bind(this)}
                />
            </div>
        )
    }
}

export default App
