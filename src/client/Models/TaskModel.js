import { Model } from 'react-axiom';

var constants = require('../GoalModules/Constants.js')

export class TaskModel extends Model {
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
    isValidCreate(err, i) {
        var name = this.state.taskName;
        console.log("Name", name)
        if (name === undefined || name === null || name === '') 
            err.push(i + ": Task name is not valid");
        var type = this.state.taskType;
        if (!constants.taskTypes.includes(type)) {
            err.push(i + ": Task type not valid");
        }
        var options = this.state.taskOptions;
        if (type === 'dropdown' && (options === undefined || options === null 
            || options.constructor !== Array || options.length === 0)) {
                err.push(i + ": Task requires options");
        }      
    }

    /*
    *   Returns true if object meets all requirements for submitting data
    *       for a new goal.
    */
    isValidSubmit(err, i) {
        var name = this.state.taskName;
        if (name === undefined || name === null || name === '') 
            err.push(i + ": Task name is not valid");
        var type = this.state.taskType;
       if (!constants.taskTypes.includes(type)) {
            err.push(i + ": Task type not valid");
       }
        var options = this.state.taskOptions;
        if (type === 'dropdown' && (options === undefined || options === null 
            || options.constructor !== Array || options.length === 0)) {
                err.push(i + ": Task requires options");
            }
        var value = this.state.taskValue;
        var expectedValue = constants.taskValues[type] || constants.taskValues.default;
        if (!(typeof value === expectedValue)) {
            err.push(i + ": Value is of wrong type");
        } 
    }

    /*
    *   Returns an object used for creating a new goal.
    */
    toCreateJSON() {
        var json = {};
        json.taskName = this.state.taskName;
        json.taskType = this.state.taskType;
        json.options = this.state.taskOptions;
        return json;
    }

    /*
    *   Returns a object used for submitting a new datapoint.
    */
    toSubmitJSON() {
        var json = {};
        json.taskName = this.state.taskName;
        json.taskType = this.state.taskType;
        json.options = this.state.taskOptions;
        json.value = this.state.taskValue;
        return json;
    }
}