import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

var cssHSL = "hsl(" + 360 * Math.random() + ',' +
                 (25 + 70 * Math.random()) + '%,' +
                 (85 + 10 * Math.random()) + '%)';

const studentListCSS = {
  backgroundColor: cssHSL,
  width: "25%",
  height: "100%"
};

 class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }



  render() {
    return (
      //use loop to populate the list with ListItems. Its tricky but can be done.
      //need a member function to do it, can't loop in render()
      <div style={studentListCSS}>
      <List component="studentList">
      <ListItem button>
        <ListItemText primary="Student 1" />
      </ListItem>
        <ListItem button>
          <ListItemText primary="Student 2" />
        </ListItem>
      </List>
      </div>
    );
  }
}

 export default Home;
