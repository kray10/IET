const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


var admin = require("firebase-admin");

var serviceAccount = require("./ietracker-firebase-adminsdk-eq6d3-523b5b314c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ietracker.firebaseio.com"
});

var db = admin.database();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
* Get all of the Goal IDs associated with a student
*/
app.get('/api/student/goals/:studentid', (req, res) => {
  // find student by id
  db.ref("/students/" + req.params.studentid).once("value", snap => {
    // check if student is in database
    if (snap.exists()) {
      // get goal list and convert to an array
      var goals = []
      if (snap.child("goalList").val() !== null) {
        goals = Object.values(snap.child("goalList").val());
      }
      // send the goals in an object
      res.send({goals})
    } else {
      res.status(500).send({error: "Student could not be found in database"});
    }
  });
});

/*
* Get the goal by the Goal ID
*/
app.get('/api/goal/:id', (req, res) => {
  // find the goal by id
  db.ref("/goals/" + req.params.id).once("value", snap=> {
    // check if it was found
    if (snap.exists()) {
      // return the goal
      res.send(snap.val());
    } else {
      res.status(500).send({error: "Could not find goal"});
    }
  });
});

/*
* Get all of the students that a user has access to
*/
app.get('/api/user/students/:userid', (req, res) => {
  // find user JSON
  db.ref("/users/" + req.params.userid).once("value", snap => {
    // check if user was found
    if (snap.exists()) {
      // turn admin and edit into arrays
      var admin = [];
      if (snap.child("adminStudents").val() !== null) {
        admin = Object.values(snap.child("adminStudents").val());
      }
      var edit = [];
      if (snap.child("editStudents").val() !== null) {
        edit = Object.values(snap.child("editStudents").val());
      }
      // send result
      res.send({admin: admin, edit: edit});
    } else {
      res.status(500).send({error: "Could not find user"});
    }
  });
});

/*
* Get all of the data for a goal.
*/
app.get('/api/goal/data/:goalid', (req, res) => {
  // find all data for the goal
  db.ref("/data/" + req.params.goalid).once("value", snap => {
    // check if goal was found
    if (snap.exists()){
      // create an array from the values (drops the auto ids)
      var datapoints = {}
      if (snap.val() !== null) {
        datapoints = snap.val();
      }
      // send the data
      res.send(datapoints);
    } else {
      res.status(500).send({error: "Could not find data for goal"});
    }
  });
});

/*
* Create a new student passing in the users uid. Returns the new student's ID
*/
app.post('/api/student/new', (req, res) => {
  // get reference to student section
  var ref = db.ref("/students");
  // push new value to students and save key
  var newKey = ref.push().key;
  // store 0 in student. needed to store in db.
  // otherwise push is only local action
  ref.child(newKey).set(0)
  // get refernce to user admin section
  var adminRef = db.ref("/users").child(req.body.uid).child("adminStudents");
  // add student id to users admin
  adminRef.push(newKey);
  res.send(newKey);
});

/*
* Create a new user by passing a uid. This is different than creating the login account.
*/
app.post('/api/user/new/', (req, res) => {
  // get reference to user section
  var ref = db.ref("/users/" + req.body.uid);
  ref.set({created: true});
  res.send()
});

/*
* Create a Goal. Returns the new Goal ID
*/
app.post('/api/createGoal', (req, res) => {
  db.ref("/students/" + req.body.studentID).once("value", snap => {
    if (snap.exists()) {
      // push new form to db
      var ref = db.ref("/goals");
      var newKey = ref.push(req.body).key;
      // add new key to the goals list
      ref = db.ref("/students/" + req.body.studentID + "/goalList");
      ref.push({goalKey: newKey, goalName: req.body.goalName});
      // return the new key
      res.send({goalID: newKey});

    } else {
      res.status(500).send({error: "Student could not be found in database"});
    }
  });
});

/*
* Give a user edit access to a student
*/
app.post('/api/updateAccess', (req, res) => {
  // query for the user id by email
  db.ref("/users/" + req.body.userID).once("value", (snap) => {
      // check is user was returned
      if (snap.exists()) {
        // get the list of students the user can already edit
        var editStudents = snap.child("editStudents").val();
        // get list of students with admin
        var adminStudents = snap.child("adminStudents").val();
        // check if the student to be added already exists in the array
        if (adminStudents !== null && Object.values(adminStudents).indexOf(req.body.studentID) > -1) {
           // if it does, send back a 500
           console.log("User already as admin access");
           res.status(500).send({error: "User already as admin access"});
        } else if (editStudents !== null && Object.values(editStudents).indexOf(req.body.studentID) > -1) {
          // if it does, send back a 500
          console.log("User already as edit access");
          res.status(500).send({error: "User already as edit access"});
        } else {
          // else add the student to the edit list
          var ref = db.ref("/users/" + req.body.userID + "/editStudents");
          ref.push(req.body.studentID);
          res.send();
        }
      } else {
        res.status(500).send({error: "Could not find user"});
      }
    });
  
});

/*
* Add a datapoint to a goal
*/
app.post('/api/addGoalData', (req, res) => {
  var ref = db.ref("/data/" + req.body.goalID + "/" + req.body.timeStamp);
  ref.set(req.body.tasks);
  res.send({});
});


app.listen(port, () => console.log(`Listening on port ${port}`));
