import React, { Component } from 'react';
import {Goal} from '../GoalModules/Goal.js';
import api from '../API/api.js';
import { subscribe } from 'react-axiom';
import {defaultValues} from '../GoalModules/Constants.js';

export class CollectData extends Component {
    constructor(props) {
        super(props);
        var initialValues = [this.props.goal.getTasks().length];
        var tasks = this.props.goal.getTasks();
        for (var i = 0; i < tasks.length; i ++) {
            initialValues[i] = defaultValues[tasks[i].getTaskType()];
        }
        this.state = {
            values: initialValues.slice(),
            initial: initialValues.slice()
        }
    }

    updateValue(index, value) {
       var values = this.state.values;
       values[index] = value;
       this.setState({values: values});
    }

    handleSubmit() {
        this.props.goal.addValues(this.state.values);
        this.props.goal.setTimeStamp(new Date());
        var err = this.props.goal.isValidSubmit();
        if (err.length === 0) {
            // probably put popup to confirm submit
            api.posts().addGoalDatapoint(this.props.goal.toSubmitJSON())
                .then(this.props.goBack())
                .catch(err => console.log(err));
        } else {
            alert(err);
        }
    }

    handleReset() {
       this.setState({values: this.state.initial.slice()});
    }

    render() {
        const goal = this.props.goal;
        return(
            <Goal dataFields={goal.getTaskList()}
            onValueChange={(index, value)=> this.updateValue(index, value)}
            onSubmit={()=>this.handleSubmit()}
            values={this.state.values}
            onReset={()=> this.handleReset()}/>
        );
    }
}

export const GoalSubscriber = subscribe(CollectData);