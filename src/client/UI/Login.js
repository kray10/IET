import React from 'react';
import './Login.css'
import logo from './iet_logo.png';

var cssHSL = "hsl(" + 200  + ',' +
                 (75 ) + '%,' +
                 (75 ) + '%)';

const loginCSS = {
  backgroundColor: cssHSL,
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      userDNE: false,
      passDNE: false
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
    this.props.onLoginAuth(this.state.user, this.state.pass);
  }

  render() {
    return (
      <div className="outer" style={loginCSS}>
        <div className = "middle">
          <div className = "inner">
            <div>
            <img src={logo} style={{width: '80%'}} alt='' />
            <p style={{textAlign: "center", color: "black"}}>Individualized Education Tracker</p>
            <form style={{color: 'black', textAlign: 'left'}} onSubmit={this.handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>User:</td>
                  <td>
                    <label>
                      <input type="text" style={{width: "100%"}} placeholder="abc@example.com" value={this.state.user} onChange={this.handleChangeUser} />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>Password:</td>
                  <td>
                    <label>
                      <input type="password" style={{width: "100%"}} value={this.state.pass} onChange={this.handleChangePass} />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td><button type="button" onClick={()=>this.props.onNavItemClicked("signup")}>Sign Up </button></td>
                  <td><input type="submit" value="Submit" /></td>
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

export default Login;
