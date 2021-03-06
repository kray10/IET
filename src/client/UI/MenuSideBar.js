import React, { Component } from 'react';
import ToolList from "./ToolList.js";
import NavList from "./NavList.js";
import ManageAccessList from "./ManageAccessList.js";
import HomeIcon from '@material-ui/icons/Home';
import api from "../API/api.js";
import '../App.css';


export class MenuSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          goBackTo: "",
          showing: "home"
        };
        this.getFormData = this.getFormData.bind(this);
        this.setShowing = this.setShowing.bind(this);
        this.onBackButtonPressed = this.onBackButtonPressed.bind(this);
        this.onHomebuttonPressed = this.onHomeButtonPressed.bind(this);
    }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      this.setState({
        goBackTo: this.state.showing, showing: this.props.showing
      });
    }
  }


  setShowing(show){
    this.setState({
      goBackTo: this.showing,
      showing: show
    });
  }

    onBackButtonPressed(){
      //alert("Back Button");
      let temp = this.state.showing;
      this.setState({
        showing: this.state.goBackTo,
        goBackTo: temp
      });
    }

    onHomeButtonPressed(){
      this.props.onNavItemClicked("home");
    }

    getFormData(id) {
      api.gets('form').getForm(id)
        .then(res => this.setState({data: res.Tasks}))
        .catch(err => console.log(err));
    }

    render() {
        return(
            <div>
              <div style={{display: 'inlineBlock'}}>
                <button className='menuButton' style={{width: '100%'}} onClick={()=>this.props.onNavItemClicked("home")}><HomeIcon /></button>
              </div>

              {this.state.showing === "" ? <NavList onNavItemClicked={this.props.onNavItemClicked}/> :
              this.state.showing === "nav" ? <NavList onNavItemClicked={this.props.onNavItemClicked} logOut={this.props.logOut}/> :
              this.state.showing === "home" ? <NavList onNavItemClicked={this.props.onNavItemClicked}/> :
              this.state.showing === "createForm" ? <ToolList/> :
              this.state.showing === "manageAccess" ? <ManageAccessList onManageAccessListClick={this.props.onManageAccessListClick} /> :
              this.state.page === "viewForm" ? <p>View Form Page Goes Here</p> :
              this.state.page === "profile" ? <p>Profile Page Goes Here</p> :
              this.state.page === "" ? <p>Welcome Page Goes Here</p> : null}
            </div>
        );
    }
}
