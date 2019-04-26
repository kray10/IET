import React from 'react';
import List from '@material-ui/core/List';
import BackArrowIcon from '@material-ui/icons/ArrowBack';
import '../App.css';
import api from '../API/api.js';
import Popup from 'reactjs-popup';
import XLSX from 'xlsx';
import {BrowserView, MobileView,} from 'react-device-detect';

var cssHSL = "hsl(" + 60 + ',' +
                 2 + '%,' +
                  39 + '%)';

const buttonStyle={
  borderRadius: "10px",
  textAlign: "center",
  padding: "5px 5px 5px 5px",
  margin: "0px 0px 7px 0px",

  fontSize: "xx-large",
  width: "100%",

  color: "#fff",
  backgroundColor: "#A5D7A7",
  border: "none",
  boxShadow: "0 2px #999"
}

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
var dtop = -2;
var dtrans = 'translate('+dleft+'%, '+dtop+'%)';

var calc = 'calc(70% - 7px)';

const goalsBackButton = {
  cursor: "pointer",
  outline: "none",
  color: "#fff",
  backgroundColor: "#4CAF50",
  border: "none",
  boxShadow: "0 2px #999",
  borderRadius: "10px",
  width: "30%",
  height: "100%"
}

const goalsAddGoalButton = {
  cursor: "pointer",
  outline: "none",
  color: "#fff",
  backgroundColor: "#e7436c",
  border: "none",
  boxShadow: "0 2px #999",
  borderRadius: "10px",
  width: calc,
  margin: "0px 0px 0px 7px",
  height: "100%",
  fontSize: "xx-large"
}

const topButtons = {
  position: "absolute",
  top: "2%",
  left: "50%",
  transform: dtrans,
  width: "70vw",
  height: "8vh",
  display: "flex",
  align: "left"
}

const content = {
  position: "absolute",
  top: "38%", left: "50%",
  transform: ctrans,
  width: "70vw",
  height: "70vh",

  backgroundColor: "#FDFDFD",
  borderRadius: "10px",
};

 class Goals extends React.Component {
  constructor(props) {
    super(props);
    const students = [];
    const goals = [];
    const userStudents = [];
    const data = [];

    this.state = {
      students,
      goals,
      userStudents,
      data,
      selectedIndex: 0,
      totalIndex: 0,
      selectedStudent: '',
      goalName: ""
    };
    this.receivedGoals = this.receivedGoals.bind(this);
    this.handleAddGoalClicked = this.handleAddGoalClicked.bind(this);
    this.onCollectData = this.onCollectData.bind(this);
    this.onDownloadData = this.onDownloadData.bind(this);
    this.onGoalNameChange = this.onGoalNameChange.bind(this);
  }

  onCollectData(goal){
    api.gets().getGoalById(goal.goalKey)
      .then(res => this.props.selectGoal(res, goal.goalKey))
      .catch(err => console.log(err));
  }

  onDownloadData(goal) {
    api.gets().getDataByGoal(goal.goalKey)
      .then(res => {
        console.log(res)
        var worksheet = XLSX.utils.aoa_to_sheet(res);
        var new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet, goal.name);
        XLSX.writeFile(new_workbook, goal.goalName + ".xlsx")
        this.props.goBack()
      })
      .catch(err => console.log(err))
  }

  handleAddGoalClicked(){
    //Call John's API here
    //Can use this.props.userID and this.props.studentID if desired
    // alert("Implement handleAddGoalClicked in Goals.js");

  }

  componentDidMount(){
    setTimeout(
      () => {
        api.gets().getGoalsByStudent(this.props.studentID).then(result => this.receivedGoals(result)).catch(function(error){console.log("No Results")});
      },
      100
    );
  }

  receivedGoals(results){
    this.setState({goals: results.goals, selectedStudent: this.props.studentID});
  }

  onGoalNameChange(event) {
    this.setState({goalName: event.target.value});
  }

  onAddGoal() {
    if (this.state.goalName==="") {
      //alert("Must enter a goal name")
      this.props.addNotification("Error","Must enter a goal name.","danger");
    }
    else {
      this.props.createGoal(this.state.selectedStudent, this.state.goalName, this.props.studentINIT)
    }
  }

  render() {
    return (
      <div style={listContainer}>
          <Popup trigger={<div style={topButtons}>
            <button style={goalsBackButton} onClick={this.props.goBack}><BackArrowIcon style={{width: "100%", height: "100%"}} /></button>
            <button style={goalsAddGoalButton}>Add Goal</button></div>}
            modal
            closeOnDocumentClick
            lockScroll = {true}>
            {close => (
              <div className="modal">
                <div>Enter a goal name: <input type="text"  ref={el => this.inputGoal = el}
                  value={this.state.value}
                  onChange={(event) => this.onGoalNameChange(event)}/></div>
                <button onClick={()=>
                  this.onAddGoal()
                  }>Add Goal</button><br/>
                <button onClick={close}>Cancel</button><br/>
              </div>)}
          </Popup>
        <div style={content}>
          <div>
            <List disablePadding={false} style={{padding: "5px"}}>
              {this.state.goals.map((goal, i) => (
                <div key={i}>
                  <BrowserView>
                    <Popup trigger={<button style={buttonStyle}>{goal.goalName}</button>}
                    modal
                    closeOnDocumentClick
                    >
                      {close => (
                        <div className="modal">
                          <button onClick={()=>this.onCollectData(goal)}>Collect Data</button><br/>
                          <button onClick={()=>this.onDownloadData(goal)}>Download Data</button><br/>
                          <button onClick={close}>Back</button>
                        </div>
                      )}
                    </Popup>
                  </BrowserView>
                  <MobileView>
                    <button style={buttonStyle} onClick={()=>this.onCollectData(goal)}>{goal.goalName}</button>
                  </MobileView>
                </div>
              ))}
            </List>
          </div>
        </div>
      </div>
    );
  }
}

 export default Goals;
