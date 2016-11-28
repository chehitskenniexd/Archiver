import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export class TestModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];
    console.log('THIS DOT PROPS', this.props);
    return (
      <div>
        <RaisedButton label="Update Project" onTouchTap={this.handleOpen} />
        <Dialog
          title={'You are updating project ' + 'purple'}
          actions={actions}
          modal={true}
          open={this.state.open}
        >

          <div>
            <div className="row">
              <div className="input-field">
                <input type="file" className="form-control select_file validate" id="select_file" placeholder="" required />
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
    login: state.login
  };
}


function mapDispatchToProps(dispatch) {
  return {
    registerUser: (userCred) => {
        dispatch(createUser(userCred));
    }

  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestModal);


