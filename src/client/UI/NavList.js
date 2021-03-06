import React, { Component } from 'react';
import '../App.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FormCreationIcon from '@material-ui/icons/Note';
import ManageAccessIcon from '@material-ui/icons/People';
import ProfileIcon from '@material-ui/icons/Portrait';
///////
import MagicButtonIcon from '@material-ui/icons/ThumbUp';
///////

class NavList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="NavList">
        {false ? <List component="nav">
          <ListItem button onClick={()=>this.props.onNavItemClicked("createForm")}>
            <ListItemIcon>
              <FormCreationIcon />
            </ListItemIcon>
            <ListItemText primary="Create Form(Soon to be removed)" />
          </ListItem>
        </List> : null}
        <Divider />
        <List component="nav">
          <ListItem button onClick={()=>this.props.onNavItemClicked("profile")}>
            <ListItemIcon>
              <ProfileIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={()=>this.props.onNavItemClicked("manageAccess")}>
          <ListItemIcon>
            <ManageAccessIcon />
          </ListItemIcon>
            <ListItemText primary="Manage Access" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {false ? <ListItem button component="a" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <ListItemIcon>
              <MagicButtonIcon />
              </ListItemIcon>
            <ListItemText primary="Magic Button" />
          </ListItem> : null}
          <ListItem button onClick={()=>this.props.logOut()}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default NavList;
