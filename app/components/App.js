// @flow
import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    console.log("thisprops?", this.props)
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
