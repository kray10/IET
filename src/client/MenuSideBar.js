import React, { Component } from 'react';
import {Goal} from "./Goal.js";
import {NavItem} from "./NavComponents.js";
import ToolList from "./ToolList.js";
import NavList from "./NavList.js";
import BackArrowIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
//import {SimpleList} from "./SimpleList.js";
import api from "./api.js";
import './App.css';

const sideBarBackButtonStyle = {
  height: 'auto',
  width:  'auto',
  display: 'block'
};
const divStyle = {
  float: 'left'
};

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

    componentWillReceiveProps(nextProps){
        if(nextProps.sidebarDisplay != this.props.showing){
            this.setState({goBackTo: this.state.showing, showing: nextProps.showing});
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
                <button class='menuButton' style={{width: '50%'}} onClick={this.onBackButtonPressed}><BackArrowIcon /></button>
                <button class='menuButton' style={{width: '50%'}} onClick={()=>this.props.onNavItemClicked("home")}><HomeIcon /></button>
              </div>

              {this.state.showing == "" ? <NavList onNavItemClicked={this.props.onNavItemClicked}/> :
              this.state.showing == "nav" ? <NavList onNavItemClicked={this.props.onNavItemClicked}/> :
              this.state.showing == "home" ? <NavList onNavItemClicked={this.props.onNavItemClicked}/> :
              this.state.showing == "createForm" ? <ToolList/> :
              this.state.page == "viewForm" ? <p>View Form Page Goes Here</p> :
              this.state.page == "profile" ? <p>Profile Page Goes Here</p> :
              this.state.page == "manageAccess" ? <p>Manage Access Page Goes Here</p> :
              this.state.page == "" ? <p>Welcome Page Goes Here</p> : null}
            </div>
        );
    }
}
