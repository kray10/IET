import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

// Use Chance here.
var my_random_string = chance.string();

var cssHSL = "hsl(" + 360 * Math.random() + ',' +
                 (25 + 70 * Math.random()) + '%,' +
                 (85 + 10 * Math.random()) + '%)';

const listContainer = {
  backgroundColor: cssHSL,
  width: "100%",
  height: "100vh",
  padding: "5px",
  verticalAlign: 'middle',
  display: 'flex',
  alignItems: 'left',
  justifyContent: 'left'
};

const left = {
  display: 'inlineBlock',

  zoom: '1',
  verticalAlign: 'top',
  fontSize: '12px',
  width: '20%',
  height: "100vh",
  overflowY: 'scroll'
};

const middle = {
  display: 'inlineBlock',

  zoom: '1',
  verticalAlign: 'top',
  fontSize: '12px',
  width: '20%',
  height: "100vh",
  overflowY: 'scroll'
};

const right = {
  display: 'inlineBlock',

  zoom: '1',
  verticalAlign: 'top',
  fontSize: '12px',
  width: '20%',
  height: "100vh",
  overflowY: 'scroll'
};

 class Home extends React.Component {
  constructor(props) {
    super(props);
    const students = [];
    const goals = [];
    for(let i = 0; i < 21; i++) {
      students.push({
      name: chance.name(),
      });
    }
    this.state = {
      students,
      goals
    };
    this.onStudentClicked = this.onStudentClicked.bind(this);
  }

  onStudentClicked(name){
    //get goals for that student
    //alert("Pressed student " + name);
    let goals = [];
    for(let i = 0; i < chance.integer({ min: 1, max: 17 }); i++) {
      goals.push({
      name: ("Goal " + (i+1))
      });
    }
    this.setState({goals: goals});
  }

  render() {
    return (
      //use loop to populate the list with ListItems. Its tricky but can be done.
      //need a member function to do it, can't loop in render()
      <div>
      <div style={listContainer}>
        <div style={left}>
          <List component="studentList">
          {this.state.students.map((student, index) => (
            <ListItem button onClick={()=>this.onStudentClicked(student.name)}>
              <ListItemText primary={student.name} />
            </ListItem>
            ))}
          </List>
        </div>
        <div style={middle}>
          <List component="goalsList">
            {this.state.goals.map((goal, index) => (
              <ListItem button >
                <ListItemText primary={goal.name} />
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
