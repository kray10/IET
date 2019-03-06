import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import api from './api.js';
// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

var cssHSL = "hsl(" + 360 * Math.random() + ',' +
                 (25 + 70 * Math.random()) + '%,' +
                 (85 + 10 * Math.random()) + '%)';
const headers = {

};

const listContainer = {
  backgroundColor: cssHSL,
  width: "100%",
  height: "100vh",
  verticalAlign: 'middle',
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'left',
  justifyContent: 'left'
};

const left = {
  display: 'flex',
  flexDirection: 'column',
  zoom: '1',
  verticalAlign: 'top',
  fontSize: '12px',
  width: '20%',
  height: "100%",
  overflow: 'hidden',
  color: 'black',
  textAlight: 'left',
  borderRight: '1px solid black'
};

const middle = {
  display: 'flex',
  flexDirection: 'column',
  zoom: '1',
  verticalAlign: 'top',
  fontSize: '12px',
  width: '20%',
  height: "100%",
  overflow: 'hidden',
  color: 'black',
  textAlight: 'left',
  borderRight: '1px solid black'
};

const right = { //unused for now, don't remove
  display: 'flex',
  flexDirection: 'column',
  zoom: '1',
  verticalAlign: 'top',
  fontSize: '12px',
  width: '20%',
  height: "100%",
  overflow: 'hidden',
  color: 'black',
  textAlight: 'left',
  borderRight: '1px solid black'
};

 class Home extends React.Component {
  constructor(props) {
    super(props);
    const students = [];
    const goals = [];
    const userStudents = [];

    for(let i = 0; i < 21; i++) {
      students.push({
      name: chance.name(),
      });
    }
    this.state = {
      students,
      goals,
      userStudents
    };
    this.onStudentClicked = this.onStudentClicked.bind(this);
    this.receivedStudents = this.receivedStudents.bind(this);
    this.receivedGoals = this.receivedGoals.bind(this);
  }

  receivedStudents(results){
    //console.log(results.adminStudents);
    var tempList = [];
    for(var student in results.adminStudents) {
      tempList.push({
      name: results.adminStudents[student],
      });
    }
    for(var student in results.editStudents) {
      tempList.push({
      name: results.editStudents[student],
      });
    }
    //Sort. Apparently there is no good way to sort list of numerals
    tempList = tempList.sort((a, b) => a.name - b.name);
    this.setState({
      userStudents: tempList
    });
    //console.log(this.state.userStudents);
  }

  componentDidMount(){
    api.gets(12345).getStudentsByUser(123456).then(result => this.receivedStudents(result));
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
    console.log(results.goals);
    this.setState({goals: results.goals});
  }

  onStudentClicked(student){
    //"get goals" API call here...
    api.gets(1).getGoalsByStudent(student.name).then(result => this.receivedGoals(result));
  }


  render() {
    return (
      <div style={listContainer}>
        <div style={left}>
          <div style= {headers}>
            <h2>Students</h2>
          </div>
          <Divider />
          <div style={{overflowY: 'scroll'}}>
            <List component="studentList">
              {this.state.userStudents.map((student) => (
                <ListItem button onClick={()=>this.onStudentClicked(student.name)}>
                  <ListItemText primary={student.name} />
                </ListItem>
                ))}
            </List>
          </div>
        </div>
        <div style={middle}>
          <div style={headers}>
            <h2>Goals</h2>
          </div>
          <Divider />
          <div style={{overflowY: 'scroll'}}>
            <List component="goalsList">
              {this.state.goals.map((goal) => (
                <ListItem button >
                  <ListItemText primary={goal.goalName} />
                </ListItem>
                ))}
            </List>
          </div>
        </div>
      </div>
    );
  }
}

 export default Home;
