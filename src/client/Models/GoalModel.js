import { Model } from 'react-axiom';
import { TaskModel } from './TaskModel.js';

export class GoalModel extends Model {

    /*
    *   Default Constructor.
    *   All elements in default constructor will have getters and setters
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
        var tasks = this.state.tasks;
        tasks.push(new TaskModel({
            taskName: name,
            taskType: type,
            taskOptions: options
        }));
        this.setState({tasks: tasks});
    }

    /*
    *   Returns any errors with the tasks, if there are any
    */
    isValidCreate() {
        var err = [];
        var name = this.state.goalName;
        if (name === undefined || name === null || name === '') 
            err.push("Goal name is not valid");
        var student = this.state.studentID;
        if (student === undefined || student === null || student === '') 
            err.push("Student ID is not valid");
        var tasks = this.state.tasks;
        for (var i = 0; i < tasks.length; i++) {
            tasks[i].isValidCreate(err, i);
        }
        return err;
    }

    /*
    *   Returns true if object meets all requirements for submitting data
    *       for a new goal.
    */
    isValidSubmit() {
        var err = [];
        var name = this.state.goalName;
        if (name === undefined || name === null || name === '')
            err.push("Goal name is not valid");
        var goalid = this.state.goalID;
        if (goalid === undefined || goalid === null || goalid === '') 
            err.push("Invalid goal ID");
        var student = this.state.studentID;
        if (student === undefined || student === null || student === '')
            err.push("Student ID is not valid");
        var date = this.state.timeStamp;
        if (date === undefined || date === null || !(date instanceof Date)) 
            err.push("Invalid timestamp");
        var tasks = this.state.tasks;
        for (var i = 0; i < tasks.length; i++) {
            tasks[i].isValidSubmit(err, i);
        }
        return err;
    }

    /*
    *   Used to add values to all tasks. Argument should be an array of values.
    *   Returns true if all values were assigned to tasks.
    *   Size of values must be equal to size of tasks or else returns false.
    *   Invalid datatypes are allowed. Need to be checked with isValid.
    */
    addValues(values) {
        var tasks = this.state.tasks;
        if (values === undefined || values === null 
            || values.constructor !== Array || values.length !== tasks.length) {
                return false;
            }
        for (var i = 0; i < tasks.length; i++) {
            tasks[i].setTaskValue(values[i]);
        }
        this.setState({tasks: tasks});
        return true;
    }

    /*
    *   Returns a JSON for creating a new goal.
    */
    toCreateJSON() {
        var json = {};
        json.goalName = this.state.goalName;
        json.studentID = this.state.studentID;
        json.tasks = [];
        var tasks = this.state.tasks;
        for (var i = 0; i < tasks.length; i++) {
            json.tasks.push(tasks[i].toCreateJSON());
        }
        return JSON.stringify(json);
    }

    /*
    *   Returns a JSON for submitting a new datapoint.
    */
    toSubmitJSON() {
        var json = {};
        json.goalName = this.state.goalName;
        json.goalID = this.state.goalID;
        json.studentID = this.state.studentID;
        json.timeStamp = this.state.timeStamp.toString();
        json.tasks = [];
        var tasks = this.state.tasks;
        for (var i = 0; i < tasks.length; i++) {
            json.tasks.push(tasks[i].toSubmitJSON());
        }
        return JSON.stringify(json);
    }

    /*
    *   Function used to create the array of tasks for rendering 
    *       in the Goal Component
    */
    getTaskList() {
        var list = [];
        var tasks = this.state.tasks;
        for (var i = 0; i < tasks.length; i++) {
            list.push(tasks[i].toCreateJSON());
        }
        return list;
    }

    /*
    *   Pass in the old index and new index. Tasks are reorded in the state.
    */
    reorderTask(oldIndex, newIndex) {
        var newTasks = [];
        var oldTasks = this.state.tasks;

        // error checking
        if (oldIndex < 0 || oldIndex >= oldTasks.length
            || newIndex < 0 || newIndex >= oldTasks.length) 
        {
            return false;
        }

        // check for simplest case
        if (oldIndex === newIndex) {
            return true;
        }
        for (var i = 0; i < oldTasks.length; i++) {
            if (i !== oldIndex) {
                if (newIndex > oldIndex) {
                    newTasks.push(oldTasks[i]);
                }
                if (i === newIndex) {
                    newTasks.push(oldTasks[oldIndex]);
                }
                if (newIndex < oldIndex) {
                    newTasks.push(oldTasks[i]);
                }
            }
        }

        this.setState({tasks: newTasks});
        return true;
    }

    /*
    *   Delete a task from the Task array.
    *   Should only be used from the create screen.
    */
    deleteTask(index) {
        var tasks = this.state.tasks;
        tasks.splice(index, 1);
        this.setState({tasks: tasks});
    }
}