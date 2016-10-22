import React, {Component} from 'react';
import SidebarSection from './sidebar/SidebarSection.jsx';
import TopbarSection from './topbar/TopbarSection.jsx';
import MainSection from './main/MainSection.jsx';
import NotificationWrapper from './pops/NotificationWrapper.jsx';
import ModalWrapper from './pops/ModalWrapper.jsx';
import Socket from '../../socket.js';

const CLIENT_DOMAIN = 'http://localhost:4001';
const SERVER_DOMAIN = 'ws://hugito.herokuapp.com';
const ACCESS_TOKEN = localStorage.getItem('access_token')

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: 'false',
            loggedIn: 'true',
            user: {
                name: '',
                email: '',
                login: ''
            },
            currentRepository: '',
            currentBranch: '1-cool-branch',
            // represents the user inputed repository.
            selectedRepository: {},
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
                    {
                        value: ''
                    }
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

        socket.on('content add', this.onCreateContent.bind(this));
        socket.on('content remove', this.onRemoveContent.bind(this));
        socket.on('content list', this.onListContent.bind(this));
        socket.on('content set', this.onSetContent.bind(this))
        socket.on('content create', this.onCreateContent.bind(this))

        socket.on('error', this.onError.bind(this))

        socket.on('logout', this.logout.bind(this));
        socket.on('user set', this.onSetUser.bind(this));
    }
    onConnect() {
        this.setConnected('true');
        this.getUser();
    }
    onDisconnect() {
        this.setConnected('false');
    }
    getUser() {
        let user = {
            name: '',
            accessToken: ACCESS_TOKEN
        }
        this.socket.emit('user get', user)
    }
    onSetUser(user) {
        this.setUser(user);
    }
    logout() {
        localStorage.setItem('authentication_authenticated', 'false');
        window.open(CLIENT_DOMAIN, '_self');
    }
    validateRepository(name, branch) {
        let repository = {
            name: name,
            branch: branch,
            accessToken: ACCESS_TOKEN
        }
        let selectedRepository = {
            name: name,
            branch: branch
        }
        this.setSelectedRepository(selectedRepository);
        this.socket.emit('repository validate', repository);
    }
    onRepositoryValidation(repositoryIsValid) {
        if (repositoryIsValid != 'Repository is valid.') {
            this.throwNotification('Repository is not valid.', 'false');
        } else {
            this.setRepositorieIsValid('true');
            this.addValidRepository();
            this.buildRepositoryTree();
            this.throwNotification('Repository is ready!', 'true');
        }
    }
    addValidRepository() {
        let {selectedRepository} = this.state;
        let {validRepositories} = this.state;
        validRepositories.names.push(selectedRepository.name);
        this.setValidRepositories(validRepositories);
    }
    // TODO: Remove validRepository
    buildRepositoryTree() {
        let {validRepositories, selectedRepository} = this.state;
        let {treeMenu} = this.state;
        for (var i = 0; i < validRepositories.names.length; i++) {
            // Use repositoryName&branch|page-content as an id to the options.
            // This way one can parse the id to get the repository and branch to
            // whom the option belong.
            let navList = [
                {
                    icon: 'fa fa-pencil',
                    id: validRepositories.names[i] + '&' + selectedRepository.branch + '|' + 'page-content',
                    text: 'Page Content'
                }
            ];
            // Use the group "repository name + repository branch" as an id to
            // represent the webpage in the menu tree.
            let id= validRepositories.names[i] + selectedRepository.branch;
            let text = validRepositories.names[i] + " [" + selectedRepository.branch + "]";
            let treeEntry = {
                id: id,
                icon: 'fa fa-cube',
                text: text,
                navlist: navList
            };
            treeMenu.push(treeEntry);
        }
        return treeMenu;
    }
    setActiveMenuItem(activeMenuItem) {
        this.setState({activeMenuItem});
        if (activeMenuItem == '') {
            // Set all other shows to false
            this.setShowContent('false');
        } else if (activeMenuItem.indexOf('page-content') !== -1) {
            // Get list of content from the server.
            let webpage = activeMenuItem.split('|')[0];
            let name = webpage.split('&')[0];
            let branch = webpage.split('&')[1];
            let selectedRepository = {
                name: name,
                branch: branch,
            }
            this.setSelectedRepository(selectedRepository);
            this.listContent(selectedRepository);
            this.setShowContentEditor('false');
            this.setShowContent('true');
        } else {
            // Clear everything
            activeMenuItem = '';
            this.setState({activeMenuItem});
            this.setShowContent('false');
        }
    }
    createContent(fileName) {
        let {user, selectedRepository, currentBranch} = this.state;
        const data = {
            repositoryName: selectedRepository.name,
            branch: selectedRepository.branch,
            title: fileName,
            accessToken: ACCESS_TOKEN
        }
        this.socket.emit('content create', data);
    }
    onCreateContent(content) {
        let {contentElements} = this.state;
        let contentElement = {
            header: content.title,
            author: content.commit.author.name,
            email: content.commit.author.email,
            date: ""
        }
        contentElements.push(contentElement);
        this.setContentElements(contentElements);
    }
    removeContent(contentElement) {
        let {selectedRepository} = this.state;
        const data = {
            repositoryName: selectedRepository.name,
            title: contentElement.header,
            branch: selectedRepository.branch,
            accessToken: ACCESS_TOKEN
        }
        this.socket.emit('content remove', data);
    }
    onRemoveContent(content) {
        let {contentElements} = this.state;
        let contentElement = {
            header: content.title,
            author: content.commit.author.name,
            email: content.commit.author.email,
            date: ""
        }
        for (var i = 0; i < contentElements.length; i++) {
            if (contentElements[i].header === contentElement.header) {
                contentElements.splice(i, 1);
                this.setContentElements(contentElements);
                return;
            }
        }
    }
    updateContent() {
        let {selectedRepository, currentBranch, currentEditingContentElement} = this.state;
        let data = {
            repositoryName: selectedRepository.name,
            branch: selectedRepository.branch,
            title: currentEditingContentElement.title,
            body: currentEditingContentElement.body,
            accessToken: ACCESS_TOKEN
        }
        this.socket.emit('content update', data);
    }
    onUpdateContent(content) {
        throwNotification("Content successfully published.", true);
    }
    listContent(repository) {
        let contentElements = {
            name: repository.name,
            branch: repository.branch,
            titles: [],
            accessToken: ACCESS_TOKEN
        }
        this.socket.emit('content list', contentElements);
    }
    onListContent(content) {
        let {showContent} = this.state;
        let contentElements = [];
        for (var i = 0; i < content.title.length; i++) {
            let contentElement = {
                header: content.title[i],
                author: '',
                date: ''
            };
            contentElements.push(contentElement);
        }
        this.setContentElements(contentElements);
    }
    getFileContent(fileName) {
        let {selectedRepository, currentBranch} = this.state;
        let data = {
            repositoryName: selectedRepository.name,
            branch: selectedRepository.branch,
            title: fileName,
            body: '',
            accessToken: ACCESS_TOKEN
        }
        this.socket.emit('content get', data);
    }
    onSetContent(content) {
        let data = {
            repositoryName: content.repositoryName,
            branch: content.branch,
            title: content.title,
            body: content.content
        }
        this.setShowContent('false');
        this.setShowContentEditor('true');
        this.setFileName(data.title);
        this.setCurrentEditingContent(data);
    }
    throwNotification(message, isSuccess) {
        const notification = {
            isActive: 'true',
            message: message,
            dismissAfter: 2000,
            style: 'true',
            isSuccess: isSuccess
        }
        this.setNotification(notification);
    }
    setConnected(connected) {
        this.setState({connected});
    }
    setUser(user) {
        this.setState({user});
    }
    setSelectedRepository(selectedRepository) {
        this.setState({selectedRepository});
    }
    setValidRepositories(validRepositories) {
        this.setState({validRepositories});
    }
    setRepositorieIsValid(repositoryIsValid) {
        this.setState({repositoryIsValid});
    }
    setShowContent(showContent) {
        this.setState({showContent});
    }
    setContentElements(contentElements) {
        this.setState({contentElements});
    }
    setShowContentEditor(showContentEditor) {
        this.setState({showContentEditor});
    }
    setFileContent(currentEditingContentElement) {
        this.setState({currentEditingContentElement});
    }
    setCurrentEditingContent(currentEditingContentElement) {
        this.setState({currentEditingContentElement});
    }
    setFileName(fileName) {
        this.setState({fileName});
    }
    setNotification(notification) {
        this.setState({notification});
    }
    setModal(modal) {
        this.setState({modal});
    }
    onError(error) {
        this.throwNotification(error, 'false');
    }
    render() {
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
                    updateContent={this.updateContent.bind(this)}/>
                <SidebarSection
                    setActiveMenuItem={this.setActiveMenuItem.bind(this)}
                    activeMenuItem={this.state.activeMenuItem}
                    setActiveMenuItem={this.setActiveMenuItem.bind(this)}
                    treeMenu={this.state.treeMenu}
                    validateRepository={this.validateRepository.bind(this)}
                    repositoryIsValid={this.state.repositoryIsValid}
                    setShowContent={this.setShowContent.bind(this)}
                    setShowContentEditor={this.setShowContentEditor.bind(this)}
                    setModal={this.setModal.bind(this)}/>
                <MainSection
                    showContent={this.state.showContent}
                    showContentEditor={this.state.showContentEditor}
                    contentElements={this.state.contentElements}
                    repositoryIsValid={this.state.repositoryIsValid}
                    removeContent={this.removeContent.bind(this)}
                    currentEditingContentElement={this.state.currentEditingContentElement}
                    getFileContent={this.getFileContent.bind(this)}
                    setFileContent={this.setFileContent.bind(this)}/>
                <NotificationWrapper
                    notification={this.state.notification}
                    setNotification={this.setNotification.bind(this)}/>
                <ModalWrapper
                    modal={this.state.modal}
                    setModal={this.setModal.bind(this)}
                    createContent={this.createContent.bind(this)}
                    validateRepository={this.validateRepository.bind(this)}/>
            </div>
        )
    }
}

export default App
