import React, { Component } from 'react';

const settingsStyle = {
  backgroundColor: 'purple',
  width: "100%",
  height: '500px'
};
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    //this.handleClick = this.handleClick.bind(this);
  }

  Alert() {
    alert("Hey, an alert!");
  }

  render() {
    return (
      <div style={settingsStyle} className="Settings">
        <div style={{width: '32%', height: '100%', backgroundColor: 'purple', float: 'left'}}>
        Pane 1
        </div>
        <div style={{width: '32%', height: '100%', backgroundColor: 'grey', float: 'left'}}>
        Pane 2
        </div>
        <div style={{width: '32%', height: '100%', backgroundColor: 'purple', float: 'left'}}>
        Pane 3
        </div>
      </div>
    );
  }
}

export default Settings;
