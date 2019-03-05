import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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

const right = {
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

 class ManageAccess extends React.Component {
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
      goals,
      showing: ""
    };
    this.onStudentClicked = this.onStudentClicked.bind(this);
  }

  componentDidUpdate(prevProps){
    if(prevProps.choice !== this.props.choice){
        this.setState({
            showing: this.props.choice
        });
    }
}

  onStudentClicked(name){
    //"get goals" API call here...

    //random goals used below but method of adding can still be used like this

    //To check that a student button was pressed uncomment this alert
    //alert("Pressed student " + name);
    let goals = [];
    let goalNum = chance.integer({ min: 15, max: 30 });

    //To Check that all goals are showing, compare to this alert number.
    //alert(goalNum);

    for(let i = 0; i < goalNum; i++) {
      goals.push({
      name: ("Goal " + (i+1))
      });
    }
    this.setState({goals: goals});
  }


  render() {
    return (
      <div>
      {console.log(this.props.choice)}
      {this.state.showing === "authorize" ?
      <div style={listContainer}>
        <div style={left}>
          <div style= {headers}>
            <h2>Admin Privileges</h2>
          </div>
          <Divider />
          <div style={{overflowY: 'scroll'}}>
            <List component="studentList">
              {this.state.students.map((student, index) => (
                <ListItem button onClick={()=>this.onStudentClicked(student.name)}>
                  <ListItemText primary={student.name} />
                </ListItem>
                ))}
            </List>
          </div>
        </div>
        <div style={middle}>
          <div style={headers}>
            <h2>Granted Access</h2>
          </div>
          <Divider />
          <div style={{overflowY: 'scroll'}}>
            <List component="goalsList">
              {this.state.goals.map((goal, index) => (
                <ListItem button >
                  <ListItemText primary={goal.name} />
                </ListItem>
                ))}
            </List>
          </div>
        </div>
        <div style={right}>
          <div style={headers}>
            <h2>Goals</h2>
          </div>
          <Divider />
          <div style={{overflowY: 'scroll'}}>
            <List component="goalsList">
              {this.state.goals.map((goal, index) => (
                <ListItem button >
                  <ListItemText primary={goal.name} />
                </ListItem>
                ))}
            </List>
          </div>
        </div>
      </div> :
      this.state.showing === "revoke" ? <p>Revoke</p> : null}
      </div>
    );
  }
}

export default ManageAccess;
