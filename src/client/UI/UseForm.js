import React, { Component } from 'react';
import {Goal} from '../GoalModules/Goal.js';
import api from '../API/api.js'

export class UseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLoaded: false,
      formNumber: null,
      form: {}
    }

    this.onClickGetForm = this.onClickGetForm.bind(this);
  }

  onClickGetForm() {
    api.gets('form').getForm(this.state.formNumber)
      .then(res => this.setState({form: res, formLoaded: true}))
      .catch(err => console.log(err));
  }

  handleOnChange(event) {
      this.setState({formNumber: parseInt(event.target.value, 10)});
  }

  render() {
    let getForm = (!this.state.formLoaded) ?
        <div>
          <b>Enter Form Number</b><br/>
          <input type="text"
              onChange={this.handleOnChange.bind(this)}
              defaultValue=''/><br/>
          <button onClick={this.onClickGetForm}>Get Form</button>
        </div> :
        null

    let displayForm = (this.state.formLoaded) ?
      <Goal dataFields={this.state.form.Tasks}/> :
      null
    return (
      <div>
        {getForm}
        {displayForm}
      </div>
    );
  }
}
