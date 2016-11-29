import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';



export class UpdateProjectPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
      file: null,
      displayError: false,
      displayFileError: false
    };
    this.cancelMessage = this.cancelMessage.bind(this);
    this.checkMessage = this.checkMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }

  // opens dialog/modal
  handleOpen = () => {
    this.setState({ open: true });
  };
  // closes dialog
  handleClose = () => {
    this.setState({ displayError: false });
    this.setState({ displayFileError: false });
    this.setState({ open: false });
  };
  // when cancel is hit, resets message and file, then closes dialog
  cancelMessage = () => {
    this.setState({ message: '' });
    this.setState({ file: null });
    this.handleClose();
  };
  // when submit is hit, checks to make sure message and file are there,
  // if yes, closes dialog, if no, error message
  checkMessage = () => {
    event.preventDefault();
    if (this.state.message.length === 0) {
      this.setState({ displayError: true });
    } else if (!this.state.file) {
      this.setState({ displayFileError: true });
    } else {
      this.handleClose();
    }
  };
  // updates states as message is written (onChange because onSubmit doesn't work with material ui)
  updateMessage = () => {
    let message = $("#message-content").val();
    this.setState({ message: message })
  };
  // updates file when selected (onChange because onSubmit doesn't work with material ui)
  updateFile = () => {
    let file = $("#select_file").val();
    this.setState({ file: file })
  };

  render() {
    // A modal dialog can only be closed by selecting one of the actions.
    const actions = [
      <FlatButton
        label="Cancel"
        className="orange-text"
        onTouchTap={this.cancelMessage}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        // ONTOUCHTAP IS THE ONSUBMIT EQUIVALENT FOR MATERIAL UI
        onTouchTap={this.checkMessage}
      />,
    ];
    return (
      <div>
        <RaisedButton label="Update Project" onTouchTap={this.handleOpen} />
        <Dialog
          title={'You are updating project ' + (this.props.user ? this.props.user.projects[0].name : '')}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div className="row">
            <div className={this.state.displayError ? 'display-message' : 'no-display-message'} >
              <h6>A message is required</h6>
            </div>
          </div>
          <div>
            <TextField
              hintText="Write your update message here"
              type="text"
              floatingLabelText="Update Message"
              fullWidth={true}
              id="message-content"
              onChange={this.updateMessage}
            />
          </div>
          <div className="row">
            <div className="input-field">
              <input type="file" className="form-control select_file validate" id="select_file" placeholder="" onChange={this.updateFile} />
              <div className={this.state.displayFileError ? 'display-message' : 'no-display-message'} >
                <h6>A file is required</h6>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}


/* ---------------- CONTAINER --------------------*/

function mapStateToProps(state) {
  return {
    user: state.login
  };
}


function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateProjectPopup);
