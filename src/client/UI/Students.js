import React from 'react';
import List from '@material-ui/core/List';
import api from '../API/api.js';
// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

var cssHSL = "hsl(" + 60 + ',' +
                 2 + '%,' +
                  39 + '%)';

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

var etop= -65;
var etrans = 'translate('+cleft+'%, '+etop+'%)';

var ftop = -10;
var ftrans = 'translate('+cleft+'%, '+ftop+'%)';

var dleft = -50;
var dtop = -2;
var dtrans = 'translate('+dleft+'%, '+dtop+'%)';

var calc = 'calc(70% - 7px)';

const addStudentButton = {
  cursor: "pointer",
  outline: "none",
  color: "#fff",
  backgroundColor: "#e7436c",
  border: "none",
  boxShadow: "0 2px #999",
  borderRadius: "10px",
  width: calc,
  margin: "0px 0px 0px 0px",
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

const content_add = {
  position: "absolute",
  top: "38%", left: "50%",
  transform: ctrans,
  width: "70vw",
  height: "70vh",

  backgroundColor: "#FDFDFD",
  borderRadius: "10px",
  overflow: "scroll"
};

const content_manage = {
  position: "absolute",
  top: "65%", left: "50%",
  transform: etrans,
  width: "70vw",
  height: "70vh",

  backgroundColor: "#FDFDFD",
  borderRadius: "10px",
  overflow: "scroll"
};

const textBox = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: ftrans,
  width: "70vw",
  height: "4vh",
  display: "flex",
  margin: "10px 0px 10px 0px"
}

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
      selectedStudent: '',
      userToAdd: ''
    };
    this.onStudentClicked = this.onStudentClicked.bind(this);
    this.receivedStudents = this.receivedStudents.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.handleAddStudentClicked = this.handleAddStudentClicked.bind(this);
    this.handleAddStudentToUser = this.handleAddStudentToUser.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
  }

  handleChangeUser(event) {
    this.setState({userToAdd: event.target.value});
  }

  handleAddStudentToUser(){
    if(this.state.selectedStudent === ''){
      this.props.addNotification("Error", "You must select a student.", "danger");
    }
  }

  handleAddStudentClicked(){
    //alert("Implement handleAddStudentClicked in Students.js");
    /* Post api currently not working. Uncomment when working */

    //console.log(this.props.userID);
    var temp = api.posts().addNewStudent(this.props.userID);
    if(temp){
      this.props.addNotification("Success", "New student added!", "success");
      api.gets().getStudentsByUser(this.props.userID).then(result => this.receivedStudents(result)).catch(function(error){console.log("No Results")});
    }
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

    for(var i in results.edit) {
      tempList.push({
      name: results.edit[i]
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
    if(!this.props.manageAccess){
      this.props.showStudentGoals(student.name);
    }
    else{
      this.setState({selectedStudent:student.name});
    }
  }


  render() {
    return (
      <div style={listContainer}>
        {!this.props.manageAccess ?
          <div>
            <div style={topButtons}>
              <button style={addStudentButton} onClick={this.handleAddStudentClicked}>Add Student</button>
            </div>
            <div style={content_add}>
              <List disablePadding="false" style={{padding: "5px"}}>
                {this.state.userStudents.map((student) => (
                  <button style={buttonStyle} onClick={()=>this.onStudentClicked(student)}>{student.name}</button>
                  ))}
              </List>
            </div>
          </div>
          :
          <div>
            <div style={topButtons}>
              <button style={addStudentButton} onClick={this.handleAddStudentToUser}>Add Student To User</button>
              <div>Selected Student: {this.state.selectedStudent}</div>
            </div>
            <div style={textBox}>
              <input type="text" style={{width: "50%"}} placeholder="user_to_add@example.com" value={this.state.userToAdd} onChange={this.handleChangeUser} />
            </div>
            <div style={content_manage}>
              <List disablePadding="false" style={{padding: "5px"}}>
                {this.state.userStudents.map((student) => (
                  <button style={buttonStyle} onClick={()=>this.onStudentClicked(student)}>{student.name}</button>
                  ))}
              </List>
            </div>
          </div>
        }
      </div>
    );
  }
}

 export default Students;
