import React from 'react';
import List from '@material-ui/core/List';
import api from '../API/api.js';
import Popup from 'reactjs-popup';

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

var etop= -65;
var etrans = 'translate('+cleft+'%, '+etop+'%)';

var gtop = -12;
var gtrans = 'translate('+cleft+'%, '+gtop+'%)';

var sectrans = gtrans;

var dleft = -50;
var dtop = -2;
var dtrans = 'translate('+dleft+'%, '+dtop+'%)';

var calc = 'calc(70% - 7px)';
var calc2 = 'calc(70% - 7px)';

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
  fontSize: "xx-large"
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

const secondaryRow = {
  position: "absolute",
  top: "12%",
  left: "50%",
  transform: sectrans,
  width: "70vw",
  height: "5vh",
  display: "flex"
}

const selected = {
  width: "30%",
  height: "100%",
  display: "flex",
  margin: "0px 0px 0px 0px",
  backgroundColor: "white",
  borderRadius: "4px"
};

const textBox = {
  width: calc2,
  height: "100%",
  display: "flex",
  margin: "0px 0px 0px 7px",
  borderRadius: "4px"
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
      userToAdd: '',
      addStudentName: ''
    };
    this.onStudentClicked = this.onStudentClicked.bind(this);
    this.receivedStudents = this.receivedStudents.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.handleAddStudentClicked = this.handleAddStudentClicked.bind(this);
    this.handleAddStudentToUser = this.handleAddStudentToUser.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.onAddStudentNameChange = this.onAddStudentNameChange.bind(this);
  }

  onAddStudentNameChange(event) {
    var name = event.target.value;
    if (name !== undefined && name.length > 2) {
      this.props.addNotification("Warning", "Student initials/ID must be 2 characters long.", "warning");
      this.setState({addStudentName: event.target.value});
    } else {
      this.setState({addStudentName: event.target.value});
    }

  }

  handleChangeUser(event) {
    this.setState({userToAdd: event.target.value});
  }

  handleAddStudentToUser(){
    if(this.state.selectedStudent === undefined || this.state.selectedStudent === null){
      this.props.addNotification("Error", "You must select a student.", "danger");
    }
    else if(this.state.userToAdd === ''){
      this.props.addNotification("Error", "You must enter a user email.", "danger");
    }
    else{
      api.posts().addUserAccess(this.state.selectedStudent.key, this.state.selectedStudent.init, this.state.userToAdd)
        .then(()=>{
          this.props.addNotification("Success","Student now accessible to provided user.", "success")
          this.setState({userToAdd: "", selectedStudent: {key: "", init: ""}});
      })
      .catch((error)=>{
        console.log(error.message)
        this.props.addNotification("Error", error.message, "danger");
      })
    }
  }

  handleAddStudentClicked(callBack){
    if (this.state.addStudentName === '') {
      this.props.addNotification("Error","You must enter a student name or id.", "danger");
      return;
    }
    else if (this.state.addStudentName.length !== 2) {
      this.props.addNotification("Error","Initials/ID must be exactly 2 characters", "danger");
      return;
    }
    api.posts().addNewStudent(this.props.userID, this.state.addStudentName.toUpperCase())
      .then(res => {
        this.props.addNotification("Success", "New student added!", "success");
        this.setState({addStudentName: ""});
        api.gets().getStudentsByUser(this.props.userID)
          .then(result => {
            this.receivedStudents(result);
            callBack();
          })
          .catch(error => {console.log("No Results")});
      }
    );
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  receivedStudents(results){

    var tempList = [];
    for(var student in results.admin) {
      tempList.push(results.admin[student]);
    }

    for(var i in results.edit) {
      tempList.push(results.edit[i]);
    }
    this.setState({
      userStudents: tempList
    });

  }

  componentDidMount(){
    api.gets().getStudentsByUser(this.props.userID).then(result => this.receivedStudents(result)).catch(function(error){console.log("No Results")});
  }

  onStudentClicked(student){
    if(!this.props.manageAccess){
      this.props.showStudentGoals(student.key);
    }
    else{
      this.setState({selectedStudent: student});
    }
  }


  render() {
    return (
      <div style={listContainer}>
        {!this.props.manageAccess ?
          <div>
            <Popup trigger={<div style={topButtons}><button style={addStudentButton} >Add Student</button></div>}
                modal
                closeOnDocumentClick>
                {close =>
                  (<div className="studentInitials">
                    Enter Student's Initials/ID:<br/>
                    <input type="text" value={this.state.addStudentName} onChange={event => this.onAddStudentNameChange(event)}></input><br/><br/>
                    <button style={addStudentButton}
                            onClick={() => this.handleAddStudentClicked(close)}
                            maxLength="2">
                            Add Student
                    </button>
                  </div>
                )}
              </Popup>
            <div style={content_add}>
              <List disablePadding="false" style={{padding: "5px"}}>
                {this.state.userStudents.map((student) => (
                  <button style={buttonStyle} onClick={()=>this.onStudentClicked(student)}>{student.init}</button>
                  ))}
              </List>
            </div>
          </div>
          :
          <div>
            <div style={topButtons}>
              <button style={addStudentButton} onClick={this.handleAddStudentToUser}>Add Student To User</button>
            </div>
            <div style={secondaryRow}>
              <div style={selected}>Selected Student: {this.state.selectedStudent.init}</div>
              <div style={textBox}>
                <input style={{width: "100%", height: "auto",borderRadius: "4px", fontSize: "large"}} type="text" placeholder="user_to_add@example.com" value={this.state.userToAdd} onChange={this.handleChangeUser} />
              </div>
            </div>
            <div style={content_manage}>
              <List disablePadding="false" style={{padding: "5px"}}>
                {this.state.userStudents.map((student) => (
                  <button style={buttonStyle} onClick={()=>this.onStudentClicked(student)}>{student.init}</button>
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
