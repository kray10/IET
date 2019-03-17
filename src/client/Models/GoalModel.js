import { Model } from 'react-axiom';
import TaskModel from './TaskModel.js';

class GoalModel extends Model {

    /*
    *   Default Constructor.
    *   All elements in default constroctor will have getters and setters
    *       automatically generated.
    */
    static defaultState() {
        return {
            goalName: '',
            goalID: '',
            studentID: '',
            tasks: [],
            timeStamp: ''
        }
    }

    /*
    *   Add a new task to the task array.
    *   Invalid arguments can be passed. Must be checked with an isValid
    *       function prior to creating JSON
    */
    addTask(name, type, options) {
        var tasks = this.getTasks();
        tasks.push(new TaskModel({
            taskName: name,
            taskType: type,
            taskOptions: options
        }));
        this.setTasks(tasks);
    }

    /*
    *   Returns true if object meets all requirements for creating a new goal.
    */
    isValidCreate() {
        var valid = true;
        var name = this.state.getGoalName();
        if (name === undefined || name === null || name === '') valid = false;
        var student = this.state.getStudentID();
        if (student === undefined || student === null || student === '') valid = false;
        var tasks = this.state.getTasks();
        for (var task in tasks) {
            valid = valid && task.isValidCreate();
        }
        return valid;
    }

    /*
    *   Returns true if object meets all requirements for submitting data
    *       for a new goal.
    */
    isValidSubmit() {
        var valid = true;
        var name = this.state.getGoalName();
        if (name === undefined || name === null || name === '') valid = false;
        var goalid = this.state.getGoalID();
        if (goalid === undefined || goalid === null || goalid === '') valid = false;
        var student = this.state.getStudentID();
        if (student === undefined || student === null || student === '') valid = false;
        var date = this.state.getTimeStamp();
        if (date === undefined || date === null || !(date instanceof Date)) valid = false;
        var tasks = this.state.getTasks();
        for (var task in tasks) {
            valid = valid && task.isValidSubmit();
        }
        return valid;
    }

    /*
    *   Used to add values to all tasks. Argument should be an array of values.
    *   Returns true if all values were assigned to tasks.
    *   Size of values must be equal to size of tasks or else returns false.
    *   Invalid datatypes are allowed. Need to be checked with isValid.
    */
    addValues(values) {
        var tasks = this.state.getTasks();
        if (values === undefined || values === null 
            || values.constructor !== Array || values.length !== tasks.length) {
                return false;
            }
        for (var i = 0; i < tasks.length; i++) {
            tasks[i].setTaskValue(values[i]);
        }
        this.state.setTasks(tasks);
        return true;
    }

    /*
    *   Returns a JSON for creating a new goal.
    */
    toCreateJSON() {
        var json = {};
        json.goalName = this.state.getGoalName();
        json.studentID = this.state.getStudentID();
        json.tasks = [];
        for (var task in this.state.getTasks()) {
            json.tasks.push(task.toCreateJSON());
        }
        return JSON.stringify(json);
    }

    /*
    *   Returns a JSON for submitting a new datapoint.
    */
    toSubmitJSON() {
        var json = {};
        json.goalName = this.state.getGoalName();
        json.goalID = this.state.getGoalID();
        json.studentID = this.state.getStudentID();
        json.timeStamp = this.state.getTimeStamp().toString();
        json.tasks = [];
        for (var task in this.state.getTasks()) {
            json.tasks.push(task.toSubmitJSON());
        }
        return JSON.stringify(json);
    }
}