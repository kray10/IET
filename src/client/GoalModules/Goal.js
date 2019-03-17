import React, { Component } from 'react';
import * as task from "./GoalComponents.js"

const keymap = {
    yesNo: task.YesNo,
    submitReset: task.SubmitReset,
    textBox: task.TextBox,
    increment: task.Increment,
    timer: task.Timer,
    dropdown: task.Dropdown,
    default: task.ErrorField
};

export class Goal extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        var fieldList = this.props.dataFields.map((entry, index) => {
            const FormComponent = keymap[entry.TaskType] || keymap.default;
            return <div key={index}><FormComponent name={entry.TaskName}
                title={entry.TaskName}
                options={entry.TaskOptions}/><br/></div>
        });
        return(
            <ul>{fieldList}</ul>
        );
    }
}
