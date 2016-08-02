import React, {Component} from 'react'
import SidebarSection from './sidebar/SidebarSection.jsx'
import TopbarSection from './topbar/TopbarSection.jsx'
import MainSection from './main/MainSection.jsx'

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {name: 'Joao Dias'},
            menuItems: [
                {value: 'Website Configuration'},
                {value: 'Website Content'}
            ],
            activeMenuItem: {value: 'Website Content'},
            repositories: [
                {repositoryName: 'Repository #1'},
                {repositoryName: 'Repository #2'},
                {repositoryName: 'Repository #3'}
            ],
            repositoryIsValid: {value: false},
            contentElements: [
                {header: 'Content File Name #1', footer: 'Written by Joao Dias in xyz'},
                {header: 'Content File Name #2', footer: 'Written by Joao Dias in xyz1'},
                {header: 'Content File Name #3', footer: 'Written by Joao Dias in xyz2'},
                {header: 'Content File Name #4', footer: 'Written by Joao Dias in xyz3'},
                {header: 'Content File Name #1', footer: 'Written by Joao Dias in xyz'},
                {header: 'Content File Name #2', footer: 'Written by Joao Dias in xyz1'},
                {header: 'Content File Name #3', footer: 'Written by Joao Dias in xyz2'},
                {header: 'Content File Name #4', footer: 'Written by Joao Dias in xyz3'},
                {header: 'Content File Name #1', footer: 'Written by Joao Dias in xyz'},
                {header: 'Content File Name #2', footer: 'Written by Joao Dias in xyz1'},
                {header: 'Content File Name #3', footer: 'Written by Joao Dias in xyz2'},
                {header: 'Content File Name #4', footer: 'Written by Joao Dias in xyz3'},
                {header: 'Content File Name #1', footer: 'Written by Joao Dias in xyz'},
                {header: 'Content File Name #2', footer: 'Written by Joao Dias in xyz1'},
                {header: 'Content File Name #3', footer: 'Written by Joao Dias in xyz2'},
                {header: 'Content File Name #4', footer: 'Written by Joao Dias in xyz3'}
            ],
            showContent: { value: false },
            showConfiguration: { value: false },
            showContentEditor: { value: false },
            source: { value: "# My awesome markdown" },
            fileName: { value: "" }
        }
    }
    setMenuItem(activeMenuItem){
        if (activeMenuItem.value === 'Website Content') {
            // TODO: fetch content from server
            // TODO: throw notifictions on errors
            // Hide configuration and show content
            this.setShowConfiguration(false);
            this.setShowContentEditor(false);
            this.setShowContent(true);
        } else if (activeMenuItem.value === 'Website Configuration') {
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
        //     repositoryIsValid = false;
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
    setSource(source){
        this.setState({source});
    }
    setFileName(fileName){
        this.setState({fileName});
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
                />
                </div>
        )
    }
}

export default App
