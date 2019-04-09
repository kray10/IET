import React, { Component } from 'react';
import './App.css';
import Sidebar from "react-sidebar";
import Settings from "./UI/Settings.js";
import Login from "./UI/Login.js";
import MenuIcon from '@material-ui/icons/MenuTwoTone';
import Students from './UI/Students.js';
import ManageAccess from './UI/ManageAccess.js';
import {MenuSideBar} from "./UI/MenuSideBar.js";
import {UseForm} from "./UI/UseForm.js";
import Signup from "./UI/Signup.js";
import Goals from "./UI/Goals.js";

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
      userID: "",
      studentID: ""
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onCallApi = this.onCallApi.bind(this);
    this.onNavItemClicked = this.onNavItemClicked.bind(this);
    this.onLoginAuthentication = this.onLoginAuthentication.bind(this);
    this.resize = this.resize.bind(this);
    this.onManageAccessListClick = this.onManageAccessListClick.bind(this);
    this.showStudentGoals = this.showStudentGoals.bind(this);
    this.logOut = this.logOut.bind(this);
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

  logOut(){
    var signOut = this.props.firebase.doSignOut();
    this.setState({loggedIn: system_loggedIn_override, page: "home"});
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

  showStudentGoals(student){
    //console.log(student);
    this.setState({page: "goals", studentID: student});
  }

  onNavItemClicked(page){
    if(showAlerts){
    alert(page);
    }
    this.setState({
      page: page,
      sidebarDisplay: "nav" /*Hardcode nav to disable sub tool bars*/
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
          sidebar={<MenuSideBar showing={"nav"} /*Hardcode nav for single menu*/
                                onNavItemClicked={this.onNavItemClicked}
                                onManageAccessListClick={this.onManageAccessListClick}
                                logOut={this.logOut}/>}
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

          {this.state.page === "signup" ? <Signup firebase={this.props.firebase} onNavItemClicked={this.onNavItemClicked} /> :
          this.state.loggedIn === false ? <Login firebase={this.props.firebase} onLoginAuth={this.onLoginAuthentication} onNavItemClicked={this.onNavItemClicked}/> :
          this.state.page === "settings" ? <Settings /> :
          this.state.page === "createForm" ? <UseForm /> :
          this.state.page === "profile" ? <p>Profile Page Goes Here</p> :
          this.state.page === "manageAccess" ? <ManageAccess choice={this.state.manageAccessOptionChosen}/> :
          this.state.page === "home" ? <Students showStudentGoals={this.showStudentGoals} userID={this.state.userID}/> :
          this.state.page === "goals" ? <Goals userID={this.state.userID} studentID ={this.state.studentID} goBack={()=>this.onNavItemClicked("home")} /> :
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
