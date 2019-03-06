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

app.get('/api/goal/:studentid', (req, res) => {
  console.log('/api/goal/' + req.params.studentid);
  // TODO Get actual data from database
  res.send(testJSONS.goalsByStudent);
});

app.get('/api/goal/:id', (req, res) => {
  console.log('/api/goal/' + req.params.id);
  // TODO Get actual goal from database
  res.send(testJSONS.goalJSON);
});

app.get('/api/students/:userid', (req, res) => {
  console.log('/api/students/' + req.params.userid);
  // TODO Get actual data from database
  res.send(testJSONS.userAccessJSON);
});

app.post('/api/createGoal', (req, res) => {
  console.log('creategoal: ' + req.body)
  // TODO store the goal in the databse with a new goalID
  // TODO add goalID and goalName to the student's goals
  res.send(JSON.stringify({goalID: 123456}))
});

app.post('/api/updateAccess', (req, res) => {
  console.log('updateAcces: ' + req.body)
  // TODO add the userid to the students editStudents array
  res.send()
});
app.post('/api/addGoalData', (req, res) => {
  console.log('addGoalData: ' + req.body)
  // TODO append the req.body.goalData object to the goal data array for the
  // associated req.body.goalID
  res.send()
});

app.listen(port, () => console.log(`Listening on port ${port}`));
