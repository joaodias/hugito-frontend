import React, {Component} from 'react'
import SidebarSection from './sidebar/SidebarSection.jsx'
import TopbarSection from './topbar/TopbarSection.jsx'

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: {value: 'Joao Dias'},
            menuItems: [
                {value: 'Menu Item 1'},
                {value: 'Menu Item 2'}
            ],
            repositories: [
                {value: 'Repository #1'},
                {value: 'Repository #2'},
                {value: 'Repository #3'}
            ],
            activeMenuItem: {}
        }
    }
    setMenuItem(activeMenuItem){
        this.setState({activeMenuItem});
    }
    setUserName(userName){
        this.setState({userName});
    }
    setRepository(repository){
        this.setState({repository});
    }
    render(){
        return (
            <div>
                <TopbarSection
                    userName={this.state.userName}
                    setUserName={this.setUserName.bind(this)}
                    repositories={this.state.repositories}
                    setRepository={this.setRepository.bind(this)}
                />
                <SidebarSection
                    menuItems={this.state.menuItems}
                    activeMenuItem={this.state.activeMenuItem}
                    setMenuItem={this.setMenuItem.bind(this)}
                />
                </div>
        )
    }
}

export default App
