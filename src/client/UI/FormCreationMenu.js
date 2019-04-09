import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as form from "./../GoalModules/GoalComponents.js";
import {Goal} from './../GoalModules/Goal.js'
import api from '../API/api.js';
import { Sortable } from './Sortable.js';
import {GoalModel} from './../Models/GoalModel.js'

// var myGoal = new GoalModel();

export class FormCreationMenu extends Component {
    constructor(props) {
        super(props);//only leaving this here in case this.props is needed in the constructor
        this.state = {
            popupContent: "chooseMenu",
            TaskType: '',
            components: [],
            TaskOptions: [1,2,3],
            receivedStudents: [],
            userStudents: [],
            // student: '',
          };
        this.onListItemClicked = this.onListItemClicked.bind(this);
        this.onApplyButtonClicked = this.onApplyButtonClicked.bind(this);
        this.onCloseButtonClicked = this.onCloseButtonClicked.bind(this);
        this.receivedStudents = this.receivedStudents.bind(this);
        this.handleStudentSelect = this.handleStudentSelect.bind(this);
    }

    onListItemClicked(popupContent){
        this.setState({
          popupContent: popupContent
        })
    };

    onCloseButtonClicked(){
        // alert("this is an alert that you closed the thing");
        // if (this.state.popupContent == "yesNoComponent") {
        //     alert("this is a yesno close alert.  You did a thing")
        // }
    };

    onApplyButtonClicked(){
        var {TaskType, components, TaskOptions} = this.state;
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
                TaskOptions = "dd";
                break;
            default:
                TaskType = '';
        }
        // if (TaskType) {
        //     const nextState = [...components, {TaskType: TaskType, TaskOptions: TaskOptions}];
        //     this.setState({components: nextState, TaskType:'', TaskOptions:[]});
        // }
        if (TaskType) {
            myGoal.addTask("namegoeshere", TaskType, TaskOptions);
            var validCheck = myGoal.isValidCreate();
            if (validCheck.length == 0) {
                components = myGoal.getTaskList();
            }
            else {
                alert(validCheck)
            }
        }
    };

    componentDidMount(){
        
    }

    handleStudentSelect(event) {
        this.setState({student: event.target.value})
        // alert(this.state.student)
    }

    render() {
        return(
            <div>
                {/* <div style={{overflowY: 'auto'}}>
                    <select value={this.state.selectValue} onChange={this.handleStudentSelect}>
                        <option>--Please Select a Student--</option>
                        {this.state.userStudents.map((student) => (
                            <option value = {student.name}>
                                {student.name}
                            </option>
                            ))}
                    </select>
                </div>                 */}
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
                                A place to put options for dropdown (and labeling?)
                                <input type="text" />
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
                                this.onCloseButtonClicked();
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
                    <Goal dataFields={this.state.components}/>
                </div>
            </div>

        );
    }
}

export class ChooseMenu extends Component {
    constructor(props) {
        super(props);//only leaving this here in case this.props is needed in the constructor
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
        super(props);//only leaving this here in case this.props is needed in the constructor
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
        super(props);//only leaving this here in case this.props is needed in the constructor
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
        super(props);//only leaving this here in case this.props is needed in the constructor
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
        super(props);//only leaving this here in case this.props is needed in the constructor
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
        super(props);//only leaving this here in case this.props is needed in the constructor
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
