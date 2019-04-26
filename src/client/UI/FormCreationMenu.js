import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import {GoalCreateSubscriber} from './../GoalModules/GoalCreate.js';
import {GoalModel} from './../Models/GoalModel.js';
import { subscribe } from 'react-axiom';
import api from '../API/api.js';

var myGoal;

var cssHSL = "hsl(" + 60 + ',' +
                 2 + '%,' +
                  39 + '%)';

const listContainer = {
  backgroundColor: cssHSL,
  position: "relative",
  width: "100%",
  height: "100vh"
};

var cleft = -50;
var ctop = -38;
var ctrans = 'translate('+cleft+'%, '+ctop+'%)';

var dleft = -50;
var dtop = -1;
var dtrans = 'translate('+dleft+'%, '+dtop+'%)';

var popuptop = -7;
var popuptrans = 'translate('+dleft+'%, '+popuptop+'%)';

var footertop = -90;
var footertrans = 'translate('+dleft+'%, '+footertop+'%)';

const header = {
  position: "absolute",
  top: "1%",
  left: "50%",
  transform: dtrans,
  width: "70vw",
  height: "auto",
  display: "block"
}

const headerinfo = {
  width: "100%",
  fontSize: "large",
  color: "white"
};

const footer = {
  position: "absolute",
  top: "90%",
  left: "50%",
  transform: footertrans,
  width: "70vw",
  height: "auto",
  display: "flex"
}

const popup = {
  position: "absolute",
  top: "7%",
  left: "50%",
  transform: popuptrans,
  width: "70vw",
  height: "auto",
  display: "flex"
}

const content = {
  position: "absolute",
  top: "38%", left: "50%",
  transform: ctrans,
  width: "70vw",
  height: "70vh",
  overflow: "scroll",
  backgroundColor: "#FDFDFD",
  borderRadius: "10px",
};

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
        myGoal = new GoalModel({goalName: this.props.goalName, studentID: this.props.studentID});
    }

    onTaskNameChange(event) {
        this.setState({TaskName: event.target.value});
    }

    onOptionsListChange(event) {
        this.setState({TaskOptions: event.target.value});
    }

    onMoveUpComponent(index) {
        index = parseInt(index, 10);
        myGoal.reorderTask(index, (index - 1));
        this.setState({components: myGoal.getTaskList()});
    }

    onMoveDownComponent(index) {
        index = parseInt(index, 10);
        myGoal.reorderTask(index, (index + 1));
        this.setState({components: myGoal.getTaskList()});
    }

    onDeleteComponent(index) {
        index = parseInt(index, 10);
        myGoal.deleteTask(index);
        this.setState({components: myGoal.getTaskList()});
    }

    onSubmit() {
        var err = myGoal.isValidCreate();
        if (err.length === 0) {
            api.posts().createGoal(myGoal.toCreateJSON())
                .then(this.props.goBack(this.props.studentID, this.props.studentINIT))
                .catch((error)=>{this.props.addNotification("Error", err, "danger")})
        }
        else {
            this.props.addNotification("Error", err, "warning");
        }
    }

    render() {
        return(
            <div style={listContainer}>
              <div style={header}>
                <div style={headerinfo}>Goal: {this.props.goalName}</div>
                <div style={headerinfo}>Student: {this.props.studentINIT}</div>
              </div>

                <Popup trigger={<div style={popup}><button> Add Goal Component </button></div>} modal lockScroll = {true}>
                {close => (
                    <div style={{color: 'black'}} className="modal">
                        <div className="header">Add Goal Component </div>
                        <div className="actions">
                        <br />
                        <div className="taskname">
                                Enter a task name: <input type="text"  ref={el => this.inputTitle = el}
                                    value={this.state.value}
                                    onChange={(event) => this.onTaskNameChange(event)}/>
                        </div>
                        <br />
                        <select defaultValue="choose" onChange={e => this.onListItemClicked(e.target.value)}>
                            <option disabled value="choose">Choose Task Type</option>
                            <option value="yesNoComponent">Yes/No</option>
                            <option value="timerComponent">Timer</option>
                            <option value="incrementalComponent">Counter</option>
                            <option value="textBoxComponent">TextBox</option>
                            <option value="dropdownComponent">DropDown</option>
                        </select> <br/><br/>
                        {this.state.popupContent === "dropdownComponent" ?
                            <div className="optionsList">
                            Enter task options: <input type="text" ref={el => this.inputOptions = el}
                                value = {this.state.value}
                                onChange={(event) => this.onOptionsListChange(event)} /><br/>
                            </div> 
                            :
                            <div className="optionsList">
                            Enter task options: <input type="text" ref={el => this.inputOptions = el}
                                value = {this.state.value}
                                onChange={(event) => this.onOptionsListChange(event)} 
                                disabled/><br/>
                            </div> 
                        }
                            
                        
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

              <div style={content}>
                  <GoalCreateSubscriber dataFields={this.state.components} onMoveUp={this.onMoveUpComponent} onMoveDown={this.onMoveDownComponent} onDelete={this.onDeleteComponent}/>
              </div>
              <div style={footer}>
                  <button style={{margin:'3px'}}
                      title="submit_button"
                      className="button"
                      onClick={() => {
                      this.onSubmit();
                      }}>
                      Submit Goal
                  </button>
              </div>
            </div>

        );
    }
}

export const FormCreateSubscriber = subscribe(FormCreationMenu);
