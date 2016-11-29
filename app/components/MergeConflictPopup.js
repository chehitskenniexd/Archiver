import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


export class MergeConflictPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      commit: null,
      displayError: false,
    };
    this.cancelChoice = this.cancelChoice.bind(this);
    this.checkCommit = this.checkCommit.bind(this);
    this.updateCommit = this.updateCommit.bind(this);
  }

  // opens dialog/modal
  handleOpen = () => {
    this.setState({ open: true });
  };
  // closes dialog
  handleClose = () => {
    this.setState({ displayError: false });
    this.setState({ open: false });
  };
  // when cancel is hit, resets message and file, then closes dialog
  cancelChoice = () => {
    this.setState({ commit: null });
    this.handleClose();
  };
  // when submit is hit, checks to make sure message and file are there,
  // if yes, closes dialog, if no, error message
  checkCommit = () => {
    event.preventDefault();
    if (this.state.commit !== null) {
      this.setState({ displayError: true });
    } else {
      this.handleClose();
    }
  };
  // updates file when selected (onChange because onSubmit doesn't work with material ui)
  updateCommit = () => {
    let commit = $("#select_commit").val();
    this.setState({ commit: commit })
  };

  render() {
    // A modal dialog can only be closed by selecting one of the actions.
    const actions = [
      <FlatButton
        label="Cancel"
        className="orange-text"
        onTouchTap={this.cancelChoice}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        // ONTOUCHTAP IS THE ONSUBMIT EQUIVALENT FOR MATERIAL UI
        onTouchTap={this.checkCommit}
      />,
    ];
    return (
      <div>
        <RaisedButton label="Fix version conflict" onTouchTap={this.handleOpen} />
        <Dialog
          title={'Which version do you want to make the current version?'}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div className="row">
            <div className={this.state.displayError ? 'display-message' : 'no-display-message'} >
              <h6>Choose one commit</h6>
            </div>
          </div>
          <div>
          </div>
          <div>
            <RadioButtonGroup name="notRight" labelPosition="left">
              <RadioButton
                id="select_commit"
                value={this.props.login.projects[0].commits[(commits.length - 1)]}
                label={(this.props.login ? this.props.login.projects[0].commits[(commits.length - 1)].date : '')}
                onChange={this.updateCommit}
              />
              <RadioButton
                id="select_commit"
                value={this.props.login.projects[0].commits[(commits.length - 2)]}
                label={(this.props.login ? this.props.login.projects[0].commits[(commits.length - 2)].date : '')}
                onChange={this.updateCommit}
              />
            </RadioButtonGroup>
          </div>
        </Dialog>
      </div>
    );
  }
}


/* ---------------- CONTAINER --------------------*/

function mapStateToProps(state) {
  return {};
}


function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MergeConflictPopup);
