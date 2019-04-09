import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import BackArrowIcon from '@material-ui/icons/ArrowBack';
import '../App.css';
import api from '../API/api.js';
// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

var cssHSL = "hsl(" + 60 + ',' +
                 2 + '%,' +
                  39 + '%)';
const headers = {

};

const buttonStyle={
  borderRadius: "10px",
  textAlign: "center",
  padding: "5px 5px 5px 5px",
  margin: "0px 0px 7px 0px",

  fontSize: "50px",
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
  fontSize: "50px"
}

const topButtons = {
  position: "absolute",
  top: "2%",
  left: "50%",
  transform: dtrans,
  width: "70vw",
  height: "8vh",
  display: "flex"
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

    for(let i = 0; i < 21; i++) {
      students.push({
      name: chance.name(),
      });
    }
    this.state = {
      students,
      goals,
      userStudents,
      data,
      selectedIndex: 0,
      totalIndex: 0,
      selectedStudent: ''
    };
    this.receivedGoals = this.receivedGoals.bind(this);
    this.handleAddGoalClicked = this.handleAddGoalClicked.bind(this);
    this.onGoalClicked = this.onGoalClicked.bind(this);
  }

  onGoalClicked(goal){
    api.gets().getGoalById(goal.goalKey)
      .then(res => this.props.selectGoal(res, goal.goalKey))
      .catch(err => console.log(err));
  }

  handleAddGoalClicked(){
    //Call John's API here
    //Can use this.props.userID and this.props.studentID if desired
    // alert("Implement handleAddGoalClicked in Goals.js");

  }

  componentDidMount(){
    //console.log(this.props.studentID);
    //api.gets().getStudentsByUser(this.props.userID).then(result => this.receivedStudents(result)).catch(function(error){console.log("No Results")});
    api.gets().getGoalsByStudent(this.props.studentID).then(result => this.receivedGoals(result)).catch(function(error){console.log("No Results")});
  }

  receivedGoals(results){
    //console.log(results);
    //random goals used below but method of adding can still be used like this

    //To check that a student button was pressed uncomment this alert
    //alert("Pressed student " + name);
    let goals = [];
    //let goalNum = chance.integer({ min: 15, max: 30 });

    //To Check that all goals are showing, compare to this alert number.
    //alert(goalNum);

    /*for(let i = 0; i < goalNum; i++) {
      goals.push({
      name: ("Goal " + (i+1))
      });
    }*/

    /*
       Right now we only have one goal, but after we have many, we will need
       to change this logic to iterate through all goals and push all goals
    */

    //goals.push(results.goals);
    this.setState({goals: results.goals, selectedStudent: this.props.studentID});
  }

  render() {
    return (
      <div style={listContainer}>
        <div style={topButtons}>
          <button style={goalsBackButton} onClick={this.props.goBack}><BackArrowIcon style={{width: "100%", height: "100%"}} /></button>
          <button style={goalsAddGoalButton} onClick={()=>this.props.createGoal(this.state.selectedStudent)}>Add Goal</button>
        </div>
        <div style={content}>
          <div>
            <List disablePadding="false" style={{padding: "5px"}}>
              {this.state.goals.map((goal) => (
                <button style={buttonStyle} onClick={()=>this.onGoalClicked(goal)}>
                {goal.goalName}
                </button>
                ))}
            </List>
          </div>
        </div>
      </div>
    );
  }
}

 export default Goals;
