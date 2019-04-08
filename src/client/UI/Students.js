import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
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
  padding: "20px 20px 20px 20px",
  margin: "0px 0px 7px 0px",

  color: "#fff",
  backgroundColor: "#A5D7A7",
  border: "none",
  boxShadow: "0 2px #999"
}

const buttonAddStudentStyle = {
  borderRadius: "10px",
  textAlign: "center",
  padding: "20px 20px 20px 20px",
  margin: "0px 0px 7px 0px",

  color: "#fff",
  backgroundColor: "#e7436c",
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
var ctop = -20;
var ctrans = 'translate('+cleft+'%, '+ctop+'%)';

const content = {
  position: "absolute",
  top: "20%", left: "50%",
  transform: ctrans,
  width: "70vw",
  height: "70vh",

  backgroundColor: "#FDFDFD",
  borderRadius: "10px",
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

 class Students extends React.Component {
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
    this.onStudentClicked = this.onStudentClicked.bind(this);
    this.receivedStudents = this.receivedStudents.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.handleAddStudentClicked = this.handleAddStudentClicked.bind(this);
  }

  handleAddStudentClicked(){
    //alert("Implement handleAddStudentClicked in Students.js");
    /* Post api currently not working. Uncomment when working */

    //console.log(this.props.userID);
    var temp = api.posts().addNewStudent(this.props.userID);
    // console.log(temp);
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

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
    api.gets().getStudentsByUser(this.props.userID).then(result => this.receivedStudents(result)).catch(function(error){console.log("No Results")});
  }

  onStudentClicked(student){
    this.props.showStudentGoals(student.name);
  }


  render() {
    return (
      <div style={listContainer}>
        <div style={content}>
          <List disablePadding="false" style={{padding: "5px"}}>
            <ListItem
              style={buttonAddStudentStyle}
              button
              selected={this.state.selectedIndex === 1}
              onClick={this.handleAddStudentClicked}
            >
              <ListItemText primary="Add Student" />
            </ListItem>
            {this.state.userStudents.map((student) => (
              <ListItem button style={buttonStyle} onClick={()=>this.onStudentClicked(student)}>
                <ListItemText primary={student.name} />
              </ListItem>
              ))}
          </List>
        </div>
      </div>
    );
  }
}

 export default Students;
