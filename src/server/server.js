const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

var testJSONS = require('./ExampleJSON');


var admin = require("firebase-admin");

var serviceAccount = require("./ietracker-firebase-adminsdk-eq6d3-523b5b314c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ietracker.firebaseio.com"
});

var db = admin.database();
var apitest = db.ref("testAPI");
apitest.set(testJSONS.goalJSON);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/student/goals/:studentid', (req, res) => {
  // find student by id
  db.ref("/students/" + req.params.studentid).once("value", snap => {
    // check if student is in database
    if (snap.exists()) {
      // get goal list and convert to an array
      var goals = Object.values(snap.child("goalList").val());
      // send the goals in an object
      res.send({goals})
    } else {
      res.status(500).send({error: "Student could not be found in database"});
    }
  });
});

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

app.get('/api/user/students/:userid', (req, res) => {
  // find user JSON
  db.ref("/users/" + req.params.userid).once("value", snap => {
    // check if user was found
    if (snap.exists()) {
      // turn admin and edit into arrays
      var admin = Object.values(snap.child("adminStudents").val());
      var edit = Object.values(snap.child("editStudents").val());
      // send result
      res.send({admin: admin, edit: edit});
    } else {
      res.status(500).send({error: "Could not find user"});
    }
  });
});

app.post('/api/student/new/:userid', (req, res) => {
  // get reference to student section
  var ref = db.ref("/students");
  // push new value to students and save key
  var newKey = ref.push().key;
  // store 0 in student. needed to store in db.
  // otherwise push is only local action
  ref.child(newKey).set(0)
  // get refernce to user admin section
  var adminRef = db.ref("/users").child(req.params.userid).child("adminStudents");
  // add student id to users admin
  adminRef.push(newKey);
  res.send(newKey);
});

app.post('/api/user/new/:email', (req, res) => {
  // get reference to user section
  var ref = db.ref("/users")
  // push new user storing email address
  var key = ref.push({email: req.params.email}).key;
  // return new key
  res.send(key)
});

app.post('/api/createGoal', (req, res) => {
  db.ref("/students/" + req.body.goal.StudentID).once("value", snap => {
    if (snap.exists()) {
      console.log(req.body.goal.studentID)
      // push new form to db
      var ref = db.ref("/goals");
      var newKey = ref.push(req.body.goal).key;
      // add new key to the goals list
      ref = db.ref("/students/" + req.body.goal.StudentID + "/goalList");
      ref.push({goalKey: newKey, goalName: req.body.goal.GoalName});
      // return the new key
      res.send({goalID: newKey});

    } else {
      res.status(500).send({error: "Student could not be found in database"});
    }
  });
});

app.post('/api/updateAccess', (req, res) => {
  var userID = null
  // query for the user id by email
  db.ref("/users").orderByChild("email").equalTo(req.body.userEmail)
    .once("value").then(function(snap) {
      // check is user was returned
      if (snap.exists()) {
        // get user id from the object
        userID = Object.keys(snap.val())[0];
        // get the list of students the user can already edit
        editStudents = snap.child(userID).child("editStudents").val();
        // check if the student to be added already exists in the array
        if (Object.values(editStudents).indexOf(req.body.studentID) > -1) {
          // if it does, send back a 500
          console.log("User already as edit access");
          res.status(500).send({error: "User already as edit access"});
        } else {
          // else add the student to the edit list
          var ref = db.ref("/users/" + userID + "/editStudents")
          ref.push(req.body.studentID)
          res.send()
        }
      } else {
        res.status(500).send({error: "Email not assocated with user"})
      }
    });
  
});
app.post('/api/addGoalData', (req, res) => {
  console.log('addGoalData: ' + req.body)
  // TODO append the req.body.goalData object to the goal data array for the
  // associated req.body.goalID
  res.send()
});


app.listen(port, () => console.log(`Listening on port ${port}`));
