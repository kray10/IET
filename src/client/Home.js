import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
    this.state = {

    };

  }



  render() {
    return (
      //use loop to populate the list with ListItems. Its tricky but can be done.
      //need a member function to do it, can't loop in render()
      <div style={listContainer}>
        <div style={left}>
          <List component="studentList">
            <ListItem button>
              <ListItemText primary="Student 1" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 2" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 3" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 4" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 5" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 6" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 7" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 8" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 9" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 10" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 11" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 12" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 13" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 14" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 15" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 16" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 17" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 18" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 19" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 20" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Student 21" />
            </ListItem>
          </List>
        </div>
        <div style={middle}>
          <List component="goalsList">
            <ListItem button>
              <ListItemText primary="Goal 1" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Goal 2" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Goal 3" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Goal 4" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Goal 5" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Goal 6" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Goal 7" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Goal 8" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Goal 9" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Goal 10" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Goal 11" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Goal 12" />
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}

 export default Home;
