import React from 'react';
import api from '../API/api.js';
import './Login.css'
import logo from './iet_logo.png';

const showAlerts = true;

var cssHSL = "hsl(" + 360 * Math.random() + ',' +
                 (25 + 70 * Math.random()) + '%,' +
                 (85 + 10 * Math.random()) + '%)';

const loginCSS = {
  backgroundColor: cssHSL,
};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      confirmPass: '',
      showPassError: false
    };

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleConfirmPass = this. handleConfirmPass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUser(event) {
    this.setState({user: event.target.value});
  }

  handleChangePass(event) {
    this.setState({pass: event.target.value});
  }

  handleConfirmPass(event) {
    if(event.target.value !== '' && event.target.value !== this.state.pass){
      this.setState({showPassError: true});
    }
    else{
      this.setState({showPassError: false});
    }
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.user);
    event.preventDefault();
    this.props.firebase.doCreateUserWithEmailAndPassword(this.state.user, this.state.pass).then((response) =>{
        alert("success");
        //console.log(response.user.uid);
        console.log(api.posts().addNewUser(response.user.uid));
        this.props.onNavItemClicked("login");})
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if(showAlerts){
        alert(errorMessage);
      }
      // ...
    });
  }

  render() {
    return (
      <div className="outer" style={loginCSS}>
        <div className = "middle">
          <div className = "inner">
            <div style={{color: 'black'}}>
              <img src={logo} style={{width: '10vw', textAlign: "center"}} alt='' />
              <h3 style={{textAlign: "center"}}>Welcome</h3>
              <p style={{textAlign: "left"}}>Please enter an email address and password</p>
              <p style={{textAlign: "left"}}>Your email will be used as your unique ID</p>
            <form style={{color: 'black', textAlign: 'left'}} onSubmit={this.handleSubmit}>
            <table>
              <tbody>
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
                  <td>Confirm Password:</td>
                  <td>
                    <label>
                      <input type="password" onChange={this.handleConfirmPass} />
                    </label>
                  </td>
                </tr>
                {this.state.showPassError ?
                  <tr>
                    <p>Passwords do not match</p>
                  </tr> : null}
                <tr>
                  <td></td>
                  <td><input type="submit" value="Sign Up" /></td>
                </tr>
              </tbody>
            </table>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
