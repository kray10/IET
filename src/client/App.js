import React, { Component } from 'react';
import './App.css';
import Sidebar from "react-sidebar";
import Settings from "./UI/Settings.js";
import Login from "./UI/Login.js";
import MenuIcon from '@material-ui/icons/MenuTwoTone';
import HomePage from './UI/Home.js';
import ManageAccess from './UI/ManageAccess.js';
import {MenuSideBar} from "./UI/MenuSideBar.js";
import {UseForm} from "./UI/UseForm.js";
import Signup from "./UI/Signup.js";

const showAlerts = false;
const system_loggedIn_override = false;
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
      manageAccessOptionChosen: "",
      loggedIn: system_loggedIn_override,
      userID: ""
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onCallApi = this.onCallApi.bind(this);
    this.onNavItemClicked = this.onNavItemClicked.bind(this);
    this.onLoginAuthentication = this.onLoginAuthentication.bind(this);
    this.resize = this.resize.bind(this);
    this.onManageAccessListClick = this.onManageAccessListClick.bind(this);
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

  onLoginAuthentication(user, pass){
    this.props.firebase
      .doSignInWithEmailAndPassword(user, pass)
      .then(authUser => {
        // user succesfully logged in
        // set state to logged in
        // save user id from authUser
        this.setState({userID: authUser.user.uid, loggedIn: true});
      })
      .catch(error => {
        // auth failed
        // parse error to tell user what the problem was
        console.log(error)
      });

  }

  onNavItemClicked(page){
    if(showAlerts){
    alert(page);
    }
    this.setState({
      page: page,
      sidebarDisplay: page
    });
  }

  onManageAccessListClick(chosen){
    console.log(chosen);
    this.setState({
      manageAccessOptionChosen: chosen
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
          sidebar={<MenuSideBar showing={this.state.page}
                                onNavItemClicked={this.onNavItemClicked}
                                onManageAccessListClick={this.onManageAccessListClick}/>}
          open={this.state.sidebarOpen && this.state.loggedIn}
          docked={this.state.sidebarDocked && this.state.loggedIn}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white", width: '20%' } }}
        >
          <div style={{backgroundColor: 'grey'}}>
          {this.state.sidebarDocked === false && this.state.loggedIn === true ?
            <button
              onClick={() => this.onSetSidebarOpen(true)}
              style={sideBarButtonStyle}
            >
              <MenuIcon />
            </button>
          : null}

          {this.state.page === "signup" ? <Signup firebase={this.props.firebase} /> :
          this.state.loggedIn === false ? <Login onLoginAuth={this.onLoginAuthentication} onNavItemClicked={this.onNavItemClicked}/> :
          this.state.page === "settings" ? <Settings /> :
          this.state.page === "createForm" ? <UseForm /> :
          this.state.page === "profile" ? <p>Profile Page Goes Here</p> :
          this.state.page === "manageAccess" ? <ManageAccess choice={this.state.manageAccessOptionChosen}/> :
          this.state.page === "home" ? <HomePage userID={this.state.userID}/> :
          null}
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
