import React, {Component} from 'react'
import SidebarSection from './sidebar/SidebarSection.jsx'
import TopbarSection from './topbar/TopbarSection.jsx'
import MainSection from './main/MainSection.jsx'

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: {value: 'Joao Dias'},
            menuItems: [
                {value: 'Website Configuration'},
                {value: 'Website Content'}
            ],
            activeMenuItem: {value: 'Website Content'},
            repositories: [
                {value: 'Repository #1'},
                {value: 'Repository #2'},
                {value: 'Repository #3'}
            ],
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
            showConfiguration: { value: false }
        }
    }
    setMenuItem(activeMenuItem){
        if (activeMenuItem.value === 'Website Content') {
            this.fetchContent();
        } else if (activeMenuItem.value === 'Website Configuration') {
            this.fetchConfiguration();
        }
        this.setState({activeMenuItem});
    }
    setUserName(userName){
        this.setState({userName});
    }
    setRepository(repository){
        this.setState({repository});
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
    fetchContent(){
        // TODO: fetch content from server
        this.setShowConfiguration(false);
        this.setShowContent(true);
    }
    fetchConfiguration(){
        // TODO: fetch configuration from server
        this.setShowContent(false);
        this.setShowConfiguration(true);
    }
    render(){
        return (
            <div>
                <TopbarSection
                    userName={this.state.userName}
                    setUserName={this.setUserName.bind(this)}
                    repositories={this.state.repositories}
                    setRepository={this.setRepository.bind(this)}
                    showContent={this.state.showContent}
                />
                <SidebarSection
                    menuItems={this.state.menuItems}
                    activeMenuItem={this.state.activeMenuItem}
                    setMenuItem={this.setMenuItem.bind(this)}
                />
                <MainSection
                    showContent={this.state.showContent}
                    contentElements={this.state.contentElements}
                    setContentElements={this.setContentElements.bind(this)}
                />
                </div>
        )
    }
}

export default App
