import React, { Component } from 'react';
import './App.css';
import Sidebar from "react-sidebar";
import Settings from "./Settings.js";
import Login from "./Login.js";
import MenuIcon from '@material-ui/icons/MenuTwoTone';
import HomePage from './Home.js';
import {MenuSideBar} from "./MenuSideBar.js";
import {UseForm} from "./UseForm.js";
const showAlerts = false;
const system_loggedIn = true;
const sideBarButtonStyle = {
  height: 'auto',
  width:  'auto',
  float:  'left',
  zIndex: '1',
  position: 'relative'
};
const sideMenuStyle = {
  height: '100vh',
  width:  '100vw',
};

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      page: "home",
      sidebarDisplay: "home",
      loggedIn: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onCallApi = this.onCallApi.bind(this);
    this.onNavItemClicked = this.onNavItemClicked.bind(this);
    this.onLoginAuthentication = this.onLoginAuthentication.bind(this);
    this.resize = this.resize.bind(this);
  }

  resize = () => this.forceUpdate()

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    window.removeEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  onLoginAuthentication(loggedIn){
    if(loggedIn){
      this.setState({loggedIn: true, sidebarOpen: true});
    }
  }

  onNavItemClicked(page){
    if(showAlerts){
    alert("Nav Item Clicked");
    }
    this.setState({
      page: page,
      sidebarDisplay: page
    });
  }

  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
    //TODO  Might want to disabled the hamburger button here
  }

  onCallApi() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
      <div style = {sideMenuStyle}>
        <Sidebar
          shadow={true}
          transitions={true}
          sidebar={<MenuSideBar showing={this.state.page} onNavItemClicked={this.onNavItemClicked}/>}
          open={this.state.sidebarOpen && this.state.loggedIn}
          docked={this.state.sidebarDocked && this.state.loggedIn}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white", width: '20%' } }}
        >
          <div style={{backgroundColor: 'grey'}}>
          {this.state.sidebarDocked == false && this.state.loggedIn == true ?
            <button
              onClick={() => this.onSetSidebarOpen(true)}
              style={sideBarButtonStyle}
            >
              <MenuIcon />
            </button>
          : null}

          {this.state.loggedIn == false ? <Login onLoginAuth={this.onLoginAuthentication}/> :
          this.state.page == "settings" ? <Settings /> :
          this.state.page == "createForm" ? <UseForm /> :
          this.state.page == "profile" ? <p>Profile Page Goes Here</p> :
          this.state.page == "manageAccess" ? <p>Manage Access Page Goes Here</p> :
          this.state.page == "home" ? <HomePage /> : null}
          </div>
        </Sidebar>

        <header className="App-header">

        </header>
        </div>
      </div>
    );
  }
}

export default App;
