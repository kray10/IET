import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css'
//import './App.css';
//import Sidebar from "react-sidebar";
//import MenuIcon from '@material-ui/icons/MenuTwoTone';
//import {MenuSideBar} from "./MenuSideBar.js";
//import {UseForm} from "./UseForm.js";


var cssHSL = "hsl(" + 360 * Math.random() + ',' +
                 (25 + 70 * Math.random()) + '%,' +
                 (85 + 10 * Math.random()) + '%)';
var cssHSL2 = "hsl(" + 360 * Math.random() + ',' +
                  (25 + 70 * Math.random()) + '%,' +
                  (85 + 10 * Math.random()) + '%)';

const loginCSS = {
  backgroundColor: cssHSL,
};
const loginCSS2 = {
  backgroundColor: cssHSL2,
};

 class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: ''
    };

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUser(event) {
    this.setState({user: event.target.value});
  }

  handleChangePass(event) {
    this.setState({pass: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.user);
    event.preventDefault();
    this.props.onLoginAuth(true);
  }

  render() {
    return (
      <div class="outer" style={loginCSS}>
        <div class = "middle">
          <div class = "inner">
            <div>
            <form style={{color: 'black', textAlign: 'left'}} onSubmit={this.handleSubmit}>
            <table>
              <tr>
                <td>User:</td>
                <td>
                  <label>
                    <input type="text" placeholder="abc@example.com" value={this.state.user} onChange={this.handleChangeUser} />
                  </label>
                </td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>
                  <label>
                    <input type="password" value={this.state.pass} onChange={this.handleChangePass} />
                  </label>
                </td>
              </tr>
              <tr>
                <td></td>
                <td><input type="submit" value="Submit" /></td>
              </tr>
            </table>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

 export default Login;
