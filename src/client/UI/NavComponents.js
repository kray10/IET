import React, { Component } from 'react';

const NavBarButtonStyle = {
  height: '60px',
  width:  'auto',
  float:  'left',
  //border: '5px solid black'
};

export class NavItem extends Component {
    constructor(props) {
        super(props);
        this.state= {value: ''}
    }

    handleOnChange(event) {
        this.setState({ value: event.target.value});
    }

    render() {
        return (
            <div className="NavItem">
                <b>{this.props.title}</b><br/>
                <button style={NavBarButtonStyle}>
                  Button
                </button>
            </div>
        );
    }
}
