import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as fs from 'fs';
import * as FEActions from '../../utilities/vcfrontend';
import axios from 'axios';
import { fetchUserProjects } from '../reducers/projects_list';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import { setCurrentCommit, setCurrentProject } from '../reducers/currentsReducer';

export class UpdateProjectPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
      file: null,
      displayError: false,
      displayFileError: false,
      updated: false,
    };
    this.cancelMessage = this.cancelMessage.bind(this);
    this.checkMessage = this.checkMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.onSubmitCommit = this.onSubmitCommit.bind(this);
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

  onSubmitCommit() {
    if (this.state.message.length === 0) {
      this.setState({ displayError: true });
      return;
    }
    // Hardcode this to the current filePath since we're only doing one file
    const project = this.props.currents && this.props.currents.currentProject
      ? this.props.currents.currentProject : undefined;
    const dirPath = `./${project.name}`;
    const fileData = project ? project.commits[0].blob.files[0] : undefined;
    const filePath = project && fileData
      ? `./${project.name}/${fileData.file_name}.txt` : undefined;
    if (filePath) {
      // Check to make sure the file exists first
      try {
        fs.statSync(filePath).isFile();
      } catch (err) {
        console.log(`file ${filePath} does not exist!`);
        this.handleClose();
        return false;
      }

      const commitFileContents = fileData.file_contents;
      const localFileContents = fs.readFileSync(filePath, 'utf-8');

      // Check to make sure there are changes to be sent to server
      if (commitFileContents === localFileContents) {
        console.log('no changes made!');
        this.handleClose();
        return false;
      }

      const project = this.props.currents && this.props.currents.currentProject
        ? this.props.currents.currentProject : undefined;

      const newCommit = {
        previousCommit: fs.readFileSync(`./${dirPath}/.archive/refs/${fileData.file_name}`, 'utf-8'),
        // hard coded message
        date: new Date(),
        message: this.state.message,
        committer: `${this.props.user.first_name} ${this.props.user.last_name}`,
        projectId: project.id,
        file_name: fileData.file_name,
        file_contents: localFileContents
      }
      // Need to create the new objs for commit and new file
      newCommit.hash = FEActions.getSha1Hash(`${newCommit.file_name}${newCommit.file_contents}${newCommit.message}`);
      newCommit.fileHash = FEActions.getSha1Hash(`${newCommit.file_name}${newCommit.file_contents}`);
      FEActions.commitFileChanges(filePath, newCommit.message, undefined,
        newCommit.date, newCommit.fileHash, newCommit.file_contents);

      project && axios.post(`http://localhost:3000/api/vcontrol/${project.id}`, newCommit)
        .catch(err => console.error(err));

      // Need to trigger the project_list to re-render the latest commit
      this.props.fetchProjects(this.props.user.id);
      this.handleClose();

      // this is passed in from PageRender to change its state
      this.props.clicked();
    }
  }

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
        onTouchTap={() => {
          this.onSubmitCommit();
        } }
        />,
    ];
    return (
      <div>
        <RaisedButton label="Update" primary={true} labelPosition="before" icon={<ActionAndroid />} onTouchTap={this.handleOpen} />
        <Dialog
          title={'You are updating project ' + (this.props.currents && this.props.currents.currentProject ? this.props.currents.currentProject.name : '')}
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
          {
            // <div className="row">
            //   <div className="input-field">
            //     <input type="file" className="form-control select_file validate" id="select_file" placeholder="" onChange={this.updateFile} />
            //     <div className={this.state.displayFileError ? 'display-message' : 'no-display-message'} >
            //       <h6>A file is required</h6>
            //     </div>
            //   </div>
            // </div>
          }
        </Dialog>
      </div>
    );
  }
}


/* ---------------- CONTAINER --------------------*/

function mapStateToProps(state) {
  return {
    user: state.login,
    currents: state.currents,
    projects: state.projects
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchProjects: (userId) => {
      dispatch(fetchUserProjects(userId));
    },
    setCurrentCommit: (commit) => {
      dispatch(setCurrentCommit(commit));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProjectPopup);
