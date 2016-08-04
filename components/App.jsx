import React, { Component } from 'react'
import SidebarSection from './sidebar/SidebarSection.jsx'
import TopbarSection from './topbar/TopbarSection.jsx'
import MainSection from './main/MainSection.jsx'
import NotificationWrapper from './NotificationWrapper.jsx'
import ModalWrapper from './ModalWrapper.jsx'

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {name: 'Joao Dias'},
            menuItems: [
                {value: 'Page Configuration'},
                {value: 'Page Content'}
            ],
            activeMenuItem: {value: 'Page Content'},
            repositories: [
                {repositoryName: 'Repository #1'},
                {repositoryName: 'Repository #2'},
                {repositoryName: 'Repository #3'}
            ],
            repositoryIsValid: {value: false},
            contentElements: [
                {header: 'Content Name #1', author: 'Joao Dias', date: "whateva"},
                {header: 'Content Name #2', author: 'Joao Dias', date: "whateva"},
                {header: 'Content Name #3', author: 'Joao Dias', date: "whateva"},
                {header: 'Content Name #4', author: 'Joao Dias', date: "whateva"},
                {header: 'Content Name #1', author: 'Joao Dias', date: "whateva"},
                {header: 'Content Name #2', author: 'Joao Dias', date: "whateva"},
                {header: 'Content Name #3', author: 'Joao Dias', date: "whateva"},
                {header: 'Content Name #4', author: 'Joao Dias', date: "whateva"},
                {header: 'Content Name #1', author: 'Joao Dias', date: "whateva"},
                {header: 'Content Name #2', author: 'Joao Dias', date: "whateva"},
                {header: 'Content Name #3', author: 'Joao Dias', date: "whateva"},
                {header: 'Content Name #4', author: 'Joao Dias', date: "whateva"},
            ],
            showContent: { value: true },
            showConfiguration: { value: false },
            showContentEditor: { value: false },
            source: { value: "# My awesome markdown" },
            fileName: { value: "" },
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
            }
        }
    }
    setMenuItem(activeMenuItem){
        if (activeMenuItem.value === 'Page Content') {
            // TODO: fetch content from server
            // TODO: throw notifictions on errors
            // Hide configuration and show content
            this.setShowConfiguration(false);
            this.setShowContentEditor(false);
            this.setShowContent(true);
        } else if (activeMenuItem.value === 'Page Configuration') {
            // TODO: fetch configuration from server
            // TODO: throw notifictions on errors
            // Hide content and show configuration
            this.setShowContent(false);
            this.setShowContentEditor(false);
            this.setShowConfiguration(true);
        }
        this.setState({activeMenuItem});
    }
    setUser(user){
        this.setState({user});
    }
    setRepository(repository){
        this.setState({repository});
    }
    validateRepository(repositoryName){
        // TODO: ask the server if the repository is valid
        var repositoryIsValid = {value: true};

        // Test Case
        //
        // if (repositoryName === "Repository #1") {
        //     repositoryIsValid.value = false;
        //     this.throwNotification(repositoryName + " is not a Valid Hugo Website", false);
        // } else{
        //     this.throwNotification(repositoryName + " was Load Successfully", true);
        // }
        this.setState({repositoryIsValid});
    }
    setContentElements(contentElement){
        this.setState({contentElement});
    }
    setShowContent(value){
        this.state.showContent.value = value;
    }
    setShowConfiguration(value){
        this.state.showConfiguration.value = value;
    }
    setShowContentEditor(showContentEditor){
        // TODO: fetch the content markdown
        // Hide content list and display the editor
        // this.setShowConfiguration(false);
        // this.setShowContent(false);
        this.state.showContentEditor.value = showContentEditor.value;
        this.forceUpdate();
        this.setShowContent(false);
    }
    removeContentFile(contentElement){
        // TODO: tell the server to remove file an wait for response
        // The response is either an error or an acknowledgement
        for (var i = 0; i < this.state.contentElements.length; i++) {
            if (this.state.contentElements[i] === contentElement) {
                this.state.contentElements.splice(i, 1);
                this.setContentElements(this.state.contentElement);
                return;
            }
        }
    }
    setSource(source){
        this.setState({source});
    }
    setFileName(fileName){
        this.setState({fileName});
    }
    setNotification(notification){
        this.setState({notification});
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
    setModal(modal){
        this.setState({modal})
    }
    saveModal(fieldValues){
        // TODO: notify server with the new file and notify the user with a response. Server will return an error or a content object. In this content object, the author and date fields are defined by the server.
        const content = {
            header: fieldValues.value,
            author: 'Joao',
            date: 'some date'
        }
        this.state.contentElements.push(content);
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
                />
                <SidebarSection
                    menuItems={this.state.menuItems}
                    activeMenuItem={this.state.activeMenuItem}
                    setMenuItem={this.setMenuItem.bind(this)}
                    repositories={this.state.repositories}
                    setRepository={this.setRepository.bind(this)}
                    validateRepository={this.validateRepository.bind(this)}
                    repositoryIsValid={this.state.repositoryIsValid}
                />
                <MainSection
                    showContent={this.state.showContent}
                    showContentEditor={this.state.showContentEditor}
                    setShowContentEditor={this.setShowContentEditor.bind(this)}
                    contentElements={this.state.contentElements}
                    setContentElements={this.setContentElements.bind(this)}
                    source={this.state.source}
                    setSource={this.setSource.bind(this)}
                    fileName={this.state.fileName}
                    setFileName={this.setFileName.bind(this)}
                    repositoryIsValid={this.state.repositoryIsValid}
                    removeContentFile={this.removeContentFile.bind(this)}
                />
                <NotificationWrapper
                    notification={this.state.notification}
                    setNotification={this.setNotification.bind(this)}
                />
                <ModalWrapper
                    modal={this.state.modal}
                    setModal={this.setModal.bind(this)}
                    saveModal={this.saveModal.bind(this)}
                />
            </div>
        )
    }
}

export default App
