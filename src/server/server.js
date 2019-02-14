const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

var testJson = require('./ExampleJSON');


var admin = require("firebase-admin");

var serviceAccount = require("./ietracker-firebase-adminsdk-eq6d3-523b5b314c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ietracker.firebaseio.com"
});

var db = admin.database();
var apitest = db.ref("testAPI");
apitest.set(testJson.testJSON);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/form/:id', (req, res) => {
  console.log('Received: ' + req.params.id);
  // hard coded response for now
  res.send(testJson.testJSON);
});

app.get('/', (req, res) => {

  console.log("whats up");
})

app.get('/test', (req, res) => {
  console.log("whats up");
})

app.listen(port, () => console.log(`Listening on port ${port}`));
