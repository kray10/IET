import React from 'react';
import './Login.css'
import logo from './iet_logo.png';

var cssHSL = "hsl(" + 360 * Math.random() + ',' +
                 (25 + 70 * Math.random()) + '%,' +
                 (85 + 10 * Math.random()) + '%)';

const loginCSS = {
  backgroundColor: cssHSL,
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
      <div className="outer" style={loginCSS}>
        <div className = "middle">
          <div className = "inner">
            <div>
            <img src={logo} style={{width: '10vw'}} alt='' />
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
                  <td></td>
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
