import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {GoalCreateSubscriber} from './../GoalModules/GoalCreate.js';
import {GoalModel} from './../Models/GoalModel.js';
import { subscribe } from 'react-axiom';

var myGoal;

export class FormCreationMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupContent: "chooseMenu",
            TaskType: '',
            components: [],
            TaskOptions: [1,2,3],
            TaskName: '',
          };
        this.onListItemClicked = this.onListItemClicked.bind(this);
        this.onApplyButtonClicked = this.onApplyButtonClicked.bind(this);
        this.onTaskNameChange = this.onTaskNameChange.bind(this);
        this.onMoveUpComponent = this.onMoveUpComponent.bind(this);
        this.onMoveDownComponent = this.onMoveDownComponent.bind(this);
        this.onDeleteComponent = this.onDeleteComponent.bind(this);
        this.onOptionsListChange = this.onOptionsListChange.bind(this);
    }

    onListItemClicked(popupContent){
        this.setState({
          popupContent: popupContent
        })
    };

    onApplyButtonClicked(){
        var {TaskName ,TaskType, TaskOptions} = this.state;
        switch (this.state.popupContent) {
            case "yesNoComponent":
                TaskType = "yesNo";
                TaskOptions = '';
                break;
            case "timerComponent":
                TaskType = "timer";
                TaskOptions = '';
                break;
            case "incrementalComponent":
                TaskType = "increment";
                TaskOptions = '';
                break;
            case "textBoxComponent":
                TaskType = "textBox";
                TaskOptions = '';
                break;
            case "dropdownComponent":
                TaskType = "dropdown";
                break;
            default:
                TaskType = '';
        }
        if (TaskType) {
            var taskOptionsArray = TaskOptions.split(',')
            myGoal.addTask(TaskName, TaskType, taskOptionsArray);
            console.log(TaskName)
            var validCheck = myGoal.isValidCreate();
            if (validCheck.length === 0) {
                this.setState({components: myGoal.getTaskList()});
                console.log(myGoal.getTaskList());
                this.setState({TaskType:'', TaskOptions:[]});
                this.inputTitle.value = '';
                this.inputOptions.value = '';
            }
            else {
                alert(validCheck)
            }
        }
    };

    componentDidMount(){
        myGoal = new GoalModel({goalName: "name", studentID: this.props.studentID});
    }

    onTaskNameChange(event) {
        this.setState({TaskName: event.target.value});
    }

    onOptionsListChange(event) {
        this.setState({TaskOptions: event.target.value});
    }

    onMoveUpComponent(index) {
        // alert(index);
        index = parseInt(index, 10);
        myGoal.reorderTask(index, (index - 1));
        // this.state.components = myGoal.getTaskList();
        this.setState({components: myGoal.getTaskList()});
    }

    onMoveDownComponent(index) {
        // alert(index);
        index = parseInt(index, 10);
        myGoal.reorderTask(index, (index + 1));
        // this.state.components = myGoal.getTaskList();
        this.setState({components: myGoal.getTaskList()});
    }

    onDeleteComponent(index) {
        // alert(index);
        index = parseInt(index, 10);
        myGoal.deleteTask(index);
        // this.state.components = myGoal.getTaskList();
        this.setState({components: myGoal.getTaskList()});
    }

    render() {
        return(
            <div>
                <Popup trigger={<button className="button"> Add Goal Component </button>} modal lockScroll = {true}>
                {close => (
                    <div style={{color: 'black'}} className="modal">
                        <div className="header">Add Goal Component </div>
                        {this.state.popupContent === "chooseMenu" ? <ChooseMenu /> : 
                        this.state.popupContent === "yesNoComponent"? <YesNoComponent /> : 
                        this.state.popupContent === "timerComponent"? <TimerComponent /> :
                        this.state.popupContent === "incrementalComponent"? <IncrementalComponent /> :
                        this.state.popupContent === "textBoxComponent"? <TextboxComponent /> :
                        this.state.popupContent === "dropdownComponent"? <DropdownComponent /> : null}
                        <div className="actions"> 
                        <br />
                        <div className="taskname">
                                Enter a task name: <input type="text"  ref={el => this.inputTitle = el}
                                    value={this.state.value}
                                    onChange={(event) => this.onTaskNameChange(event)}/>
                        </div>
                        <br />
                        <div className="optionsList">
                        Enter task options: <input type="text" ref={el => this.inputOptions = el}
                            value = {this.state.value}
                            onChange={(event) => this.onOptionsListChange(event)} />
                        </div>
                            <Popup 
                                trigger={<button className="button" style={{margin:'3px'}}> Component Types </button>}
                                position="top center"
                                closeOnDocumentClick
                            >
                            {close1 => (
                            <List>
                                <ListItem button className="menu-item" title="menu_yesno" onClick={()=>{this.onListItemClicked("yesNoComponent"); close1()}}> Yes/No</ListItem>
                                <ListItem button className="menu-item" title="menu_timer" onClick={()=>{this.onListItemClicked("timerComponent"); close1()}}> Timer</ListItem>
                                <ListItem button className="menu-item" title="menu_increment" onClick={()=>{this.onListItemClicked("incrementalComponent"); close1()}}> Increment</ListItem>
                                <ListItem button className="menu-item" title="menu_textbox" onClick={()=>{this.onListItemClicked("textBoxComponent"); close1()}}> TextBox</ListItem>
                                <ListItem button className="menu-item" title="menu_dropdown" onClick={()=>{this.onListItemClicked("dropdownComponent"); close1()}}> DropDown</ListItem>
                            </List>
                            )}
                            </Popup>
                            <button style={{margin:'3px'}}
                                title="apply_button"
                                className="button"
                                onClick={()=> {
                                    this.onListItemClicked("chooseMenu");
                                    this.onApplyButtonClicked();
                                }}
                            >
                                Apply
                            </button>
                            <button style={{margin:'3px'}}
                                title="cancel_button"
                                className="button"
                                onClick={() => {
                                close();
                                this.onListItemClicked("chooseMenu");
                                }}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                    )}
                </Popup>
                <div className="createContent">
                    <header>Component content will go here</header>
                    <div>Student: {this.props.studentID}</div>
                    <GoalCreateSubscriber dataFields={this.state.components} onMoveUp={this.onMoveUpComponent} onMoveDown={this.onMoveDownComponent} onDelete={this.onDeleteComponent}/>
                </div>
            </div>

        );
    }
}

export const FormCreateSubscriber = subscribe(FormCreationMenu);

export class ChooseMenu extends Component {

    render(){
        return(
            <div className="content">
                {' '}
                Choose New Goal Component Type From List
            </div>
        );
    }
}

export class YesNoComponent extends Component {

    render(){
         return(
             <div className="content">
                {' '}
                This is a placeholder for yes/no goal creation
             </div>
       );
    }
}

export class TimerComponent extends Component {

    render(){
        return(
            <div className="content">
               {' '}
               This is a placeholder for timer goal creation
            </div>
        );
    }
}

export class IncrementalComponent extends Component {

    render(){
        return(
            <div className="content">
               {' '}
               This is a placeholder for icrement goal creation
            </div>
        );
    }
}


export class DropdownComponent extends Component {

    render(){
        return(
            <div className="content">
               {' '}
               This is a placeholder for dropdown goal creation
            </div>
        );
    }
}



export class TextboxComponent extends Component {

    render(){
        return(
            <div className="content">
               {' '}
               This is a placeholder for textbox goal creation
            </div>
        );
    }
}
