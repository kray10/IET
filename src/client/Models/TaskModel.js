import { Model } from 'react-axiom';

var constants = require('../GoalModules/Constants.js')

class TaskModel extends Model {
    static defaultState() {
        return {
            taskName: '',
            taskType: '',
            taskOptions: null,
            taskValue: ''
        }
    }

    /*
    *   Returns true if object meets all requirements for creating a new goal.
    */
    isValidCreate() {
        var valid = true;
        var name = this.state.getTaskName();
        if (name === undefined || name === null || name === '') valid = false;
        var type = this.state.getTaskType();
        valid = valid && !constants.taskTypesi.includes(type);
        var options = this.state.getTaskOptions();
        if (type === 'dropdown' && (options === undefined || options === null 
            || options.constructor !== Array || options.length === 0)) {
                valid = false;
            }
        return valid;        
    }

    /*
    *   Returns true if object meets all requirements for submitting data
    *       for a new goal.
    */
    isValidSubmit() {
        var valid = true;
        var name = this.state.getTaskName();
        if (name === undefined || name === null || name === '') valid = false;
        var type = this.state.getTaskType();
        valid = valid && !constants.taskTypesi.includes(type);
        var options = this.state.getTaskOptions();
        if (type === 'dropdown' && (options === undefined || options === null 
            || options.constructor !== Array || options.length === 0)) {
                valid = false;
            }
        var value = this.state.getTaskValue();
        var expectedValue = constants.taskValues[type] || constants.taskValues.default;
        valid = valid && (value instanceof expectedValue);
        return valid;  
    }

    /*
    *   Returns an object used for creating a new goal.
    */
    toCreateJSON() {
        var json = {};
        json.taskName = this.state.getTaskName();
        json.taskType = this.state.getTaskType();
        json.options = this.state.getTaskOptions();
        return json;
    }

    /*
    *   Returns a object used for submitting a new datapoint.
    */
    toSubmitJSON() {
        var json = {};
        json.taskName = this.state.getTaskName();
        json.taskType = this.state.getTaskType();
        json.options = this.state.getTaskOptions();
        json.value = this.state.getTaskValue();
        return json;
    }
}