import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {GoalCreate, GoalCreateSubscriber} from './../GoalModules/GoalCreate.js';
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
                TaskOptions = "yn";
                break;
            case "timerComponent":
                TaskType = "timer";
                TaskOptions = "time";
                break;
            case "incrementalComponent":
                TaskType = "increment";
                TaskOptions = "inc";
                break;
            case "textBoxComponent":
                TaskType = "textBox";
                TaskOptions = "tb";
                break;
            case "dropdownComponent":
                TaskType = "dropdown";
                TaskOptions = ['1', '2', '3'];
                break;
            default:
                TaskType = '';
        }
        if (TaskType) {
            myGoal.addTask(TaskName, TaskType, TaskOptions);
            console.log(TaskName)
            var validCheck = myGoal.isValidCreate();
            if (validCheck.length == 0) {
                this.state.components = myGoal.getTaskList();
                console.log(myGoal.getTaskList());
                this.setState({TaskType:'', TaskOptions:[]});
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
        this.state.TaskName = event.target.value;
    }

    onMoveUpComponent(index) {
        // alert(index);
        index = parseInt(index, 10);
        myGoal.reorderTask(index, (index - 1));
    }

    onMoveDownComponent(index) {
        // alert(index);
        index = parseInt(index, 10);
        myGoal.reorderTask(index, (index + 1));
    }

    onDeleteComponent(index) {
        // alert(index);
        index = parseInt(index, 10);
        myGoal.deleteTask(index);
    }

    render() {
        return(
            <div>
                <Popup trigger={<button className="button"> Add Goal Component </button>} modal lockScroll = {true}>
                {close => (
                    <div style={{color: 'black'}} className="modal">
                        <div className="header">Add Goal Component </div>
                        {this.state.popupContent == "chooseMenu" ? <ChooseMenu /> : 
                        this.state.popupContent == "yesNoComponent"? <YesNoComponent /> : 
                        this.state.popupContent == "timerComponent"? <TimerComponent /> :
                        this.state.popupContent == "incrementalComponent"? <IncrementalComponent /> :
                        this.state.popupContent == "textBoxComponent"? <TextboxComponent /> :
                        this.state.popupContent == "dropdownComponent"? <DropdownComponent /> : null}
                        <div className="actions">
                        <div className="optionsList">
                                Enter a task name: <input type="text"  
                                    value={this.props.value}
                                    onChange={(event) => this.onTaskNameChange(event)}/>
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
    constructor(props) {
        super(props);
    }

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
    constructor(props) {
        super(props);
    }

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
    constructor(props) {
        super(props);
    }

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
    constructor(props) {
        super(props);
    }

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
    constructor(props) {
        super(props);
    }

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
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="content">
               {' '}
               This is a placeholder for textbox goal creation
            </div>
        );
    }
}
