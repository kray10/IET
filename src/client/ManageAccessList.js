import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AuthorizeButtonIcon from '@material-ui/icons/Add';
import RevokeButtonIcon from '@material-ui/icons/Remove';

class ManageAccessList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: ""
    };
  }

  render() {
    return (
      <div className="ManageAccessList">
        <List>
          <ListItem button onClick={()=>this.props.onManageAccessListClick("authorize")}>
            <ListItemIcon>
              <AuthorizeButtonIcon />
            </ListItemIcon>
            <ListItemText primary="Authorize Access" />
          </ListItem>
          <ListItem button onClick={()=>this.props.onManageAccessListClick("revoke")}>
            <ListItemIcon>
              <RevokeButtonIcon />
            </ListItemIcon>
            <ListItemText primary="Revoke Access" />
          </ListItem>
        </List>
      </div>
    );
  }
}

 export default ManageAccessList;
