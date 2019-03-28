import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as form from "./../GoalModules/GoalComponents.js";
import {Goal} from './../GoalModules/Goal.js'
import api from '../API/api.js';

// const ComponentListItem = ({value, onComponentClick}) =>(
//   <li onClick={onComponentClick}>{value}</li>  
// );

// const ComponentList = ({items}) => (
//     <ul>
//         {
//             items.map((item, i) => <ComponentListItem key={i} value={item} text={item} />)
//         }
//     </ul>
// )

export class FormCreationMenu extends Component {
    constructor(props) {
        super(props);//only leaving this here in case this.props is needed in the constructor
        this.state = {
            popupContent: "chooseMenu",
            TaskType: '',
            components: [],
            TaskOptions: [1, 2, 3],
            receivedStudents: [],
            userStudents: []
          };
        this.onListItemClicked = this.onListItemClicked.bind(this);
        this.onApplyButtonClicked = this.onApplyButtonClicked.bind(this);
        this.onCloseButtonClicked = this.onCloseButtonClicked.bind(this);
        this.receivedStudents = this.receivedStudents.bind(this);
    }

    // onComponentClick = () => {
    //     // alert("In: onComponentClick");
    //     var {TaskType, components} = this.state;
    //     TaskType = "This";
    //     if (this.state.popupContent == "yesNoComponent") {
    //         TaskType = "yes no component placeholder";
    //     }
    //     if (TaskType) {
    //         const nextState = [...components, TaskType];
    //         this.setState({components: nextState, TaskType:''});
    //     }
    // };

    // onChange = (e) => {
    //     this.setState({TaskType: e.target.value});
    //     alert("In: onChange()")
    // }

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
        // alert("In: onApplyButtonClicked");
        var {TaskType, components, TaskOptions} = this.state;
        switch (this.state.popupContent) {
            case "yesNoComponent":
                TaskType = "yesNo";
                break;
            case "timerComponent":
                TaskType = "timer";
                break;
            case "incrementalComponent":
                TaskType = "increment";
                break;
            case "textBoxComponent":
                TaskType = "textBox";
                break;
            case "dropdownComponent":
                TaskType = "dropdown";
                break;
            default:
                TaskType = '';
        }
        if (TaskType) {
            const nextState = [...components, {TaskType: TaskType, TaskOptions: TaskOptions}];
            this.setState({components: nextState, TaskType:'', TaskOptions:[]});
        }
    };

    setTaskOptions(taskOptions){

    }

    receivedStudents(results){
        //console.log(results.adminStudents);
        var tempList = [];
        for(var student in results.admin) {
          tempList.push({
          name: results.admin[student]
          });
        }
        
        for(var student in results.edit) {
          tempList.push({
          name: results.edit[student]
          });
        }
        //Sort. Apparently there is no good way to sort list of numerals
        //tempList = tempList.sort((a, b) => a.name - b.name);
        this.setState({
          userStudents: tempList
        });
        
    }

    componentDidMount(){
        api.gets().getStudentsByUser(this.props.userID).then(result => this.receivedStudents(result));
    }

    render() {
        const{components, TaskType} = this.state;
        return(
            <div>
                <div style={{overflowY: 'auto'}}>
                    <List component="studentList">
                    {this.state.userStudents.map((student) => (
                        <ListItem>
                        <ListItemText primary={student.name} />
                        </ListItem>
                        ))}
                    </List>
                </div>                
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
                                trigger={<button className="button"> Component Types </button>}
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
                            <button
                                title="apply_button"
                                className="button"
                                onClick={()=> {
                                    this.onListItemClicked("chooseMenu");
                                    this.onApplyButtonClicked();
                                }}
                            >
                                Apply
                            </button>

                            <button
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
