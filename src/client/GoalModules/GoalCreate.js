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

export class GoalCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onUp = this.onUp.bind(this);
        this.onDown = this.onDown.bind(this);
        this.onDel = this.onDel.bind(this);
    }

    onUp(index) {
        this.props.onMoveUp(parseInt(index, 10));
    }

    onDown(index) {
        this.props.onMoveDown(parseInt(index, 10));
    }

    onDel(index) {
        this.props.onDelete(parseInt(index, 10));
    }

    render() {
        var fieldList = this.props.dataFields.map((entry, index) => {
            const FormComponent = formMap[entry.taskType] || formMap.default;
            return <div key={index} name={index}><FormComponent name={entry.taskName}
                index={index}
                title={entry.taskName}
                options={entry.options} 
                onMoveUp={this.props.onMoveUp}
                onMoveDown={this.props.onMoveDown}
                onDelete={this.props.onDelete}
                /><br/>
                <button type="button" onClick={()=>this.onUp(index)}>Move Up</button>
                <button type="button" onClick={()=>this.onDown(index)}>Move Down</button>
                <button type="button" onClick={()=>this.onDel(index)}>Delete</button>
                <br/>
                </div>
        });
        return(
            <ul>
                {fieldList}
            </ul>
        );
    }
}
