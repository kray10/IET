import React, { Component } from 'react';
import * as task from "./GoalComponents.js"

const formMap = {
    yesNo: task.YesNo,
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
            const FormComponent = formMap[entry.taskType] || formMap.default;
            return <div key={index}><FormComponent name={entry.taskName}
                index={index}
                title={entry.taskName}
                options={entry.options}
                onValueChange={(index, value)=>this.props.onValueChange(index, value)}
                value={this.props.values[index]}/><br/></div>
        });
        return(
            <ul>
                {fieldList}
                <div><task.SubmitReset
                onSubmit={()=>this.props.onSubmit()}
                onReset={()=>this.props.onReset()}/><br/></div>
            </ul>
        );
    }
}
