import React, { Component } from 'react';
import './App.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

///////
import MagicButtonIcon from '@material-ui/icons/ThumbUp';
import NotMagicButtonIcon from '@material-ui/icons/ThumbDown';
///////

class ToolList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ToolList">
        <List component="tools">
          <ListItem button>
            <ListItemIcon>
              <NotMagicButtonIcon />
            </ListItemIcon>
            <ListItemText primary="Tool 1" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NotMagicButtonIcon />
            </ListItemIcon>
            <ListItemText primary="Tool 2" />
          </ListItem>
          <ListItem button component="a" href="https://youtu.be/yMMz2VwbhVI?t=64">
            <ListItemIcon>
              <MagicButtonIcon />
            </ListItemIcon>
            <ListItemText primary="T00L" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NotMagicButtonIcon />
            </ListItemIcon>
            <ListItemText primary="Tool 4" />
          </ListItem>
          <ListItem button>
          <ListItemIcon>
            <NotMagicButtonIcon />
          </ListItemIcon>
            <ListItemText primary="Tool 5" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NotMagicButtonIcon />
              </ListItemIcon>
            <ListItemText primary="Tool 6" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default ToolList;
