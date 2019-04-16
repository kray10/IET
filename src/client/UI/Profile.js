import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';

const settingsStyle = {
  backgroundColor: 'purple',
  width: "100%",
  height: '100vh'
};
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.handleResetPassword = this.handleResetPassword.bind(this);
  }

  handleResetPassword(){

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
            <button onClick={this.handleResetPassword}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Profile;
