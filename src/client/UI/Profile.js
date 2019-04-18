import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Firebase from 'firebase/app';

const settingsStyle = {
  backgroundColor: 'purple',
  width: "100%",
  height: '100vh'
};
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      newPassword2: "",
      currentPass: "",
      showPassError: false
    };
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleConfirmPass = this.handleConfirmPass.bind(this);
    this.handleCurrentPass = this.handleCurrentPass.bind(this);
  }

  handleCurrentPass(event){
    this.setState({currentPass: event.target.value});
  }

  handleChangePass(event) {
    this.setState({newPassword: event.target.value});
  }

  handleConfirmPass(event) {
    if(event.target.value !== '' && event.target.value !== this.state.newPassword){
      this.setState({showPassError: true, newPassword2: event.target.value});
    }
    else{
      this.setState({showPassError: false, newPassword2: event.target.value});
    }
  }

  handleResetPassword(){
    if(this.state.newPassword === ""){
      this.props.addNotification("Error","You must enter a new password.","danger");
    }
    else if(this.state.newPassword2 === ""){
      this.props.addNotification("Error","You must confirm new password.","danger");
    }
    else if(this.state.showPassError === true){
      this.props.addNotification("Error","Your passwords must match.","danger");
    }
    else if(this.state.currentPass === ""){
      this.props.addNotification("Error","You must enter your current password.","danger");
    }
    else{
      var newPass = this.state.newPassword
      var curPass = this.state.currentPass

      var user = this.props.firebase.auth.currentUser;
      var credentials = Firebase.auth.EmailAuthProvider.credential(
        user.email,
        curPass)
      user.reauthenticateWithCredential(credentials).then(()=>{
        console.log("reauthenticated");
        user.updatePassword(newPass).then(()=>{
          this.props.addNotification("Success", "Your new password has been set!","success");
          var credentials2 = Firebase.auth.EmailAuthProvider.credential(
            user.email,
            newPass)
          user.reauthenticateWithCredential(credentials2).then(()=>{
            this.setState({newPassword: "", newPassword2: "",currentPass:"", showPassError: false})
          }).catch(()=>{this.props.addNotification("Error","Could not reauthenticate you with new password.","danger")})
        }).catch(()=>{this.props.addNotification("Error","Could not reset password.","danger")})
      }).catch(()=>this.props.addNotification("Error","Could not reauthenticate with current password!","danger"));
    }
}

  Alert() {
    alert("Hey, an alert!");
  }

  render() {
    return (
      <div style={settingsStyle} className="Settings">
        <div style={{width: "auto", height: "auto", margin: "10px 10px 10px 10px"}}>
            <h2>Reset Password</h2>
            <Divider />
            <form style={{color: 'black', textAlign: 'left'}}>
            <table>
              <tbody>
                <tr>
                  <td>Current Password:</td>
                  <td>
                    <label>
                      <input type="password" value={this.state.currentPass} onChange={this.handleCurrentPass} />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>New Password:</td>
                  <td>
                    <label>
                      <input type="password" value={this.state.newPassword} onChange={this.handleChangePass} />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>Confirm Password:</td>
                  <td>
                    <label>
                      <input type="password" value={this.state.newPassword2} onChange={this.handleConfirmPass} />
                    </label>
                  </td>
                </tr>
                {this.state.showPassError ?
                  <tr>
                    <p>Passwords do not match</p>
                  </tr> : null}
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
            </form>
            <button onClick={this.handleResetPassword}>Here</button>
        </div>
      </div>
    );
  }
}

export default Profile;
