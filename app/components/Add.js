import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './Add.css';
import { onCollaborator, onPageRender } from '../reducers/mainhome'
import * as FEActions from '../../utilities/vcfrontend';
import fs from 'fs';
import axios from 'axios';
import { fetchUserProjects } from '../reducers/projects_list';

export class Add extends Component {
  constructor(props) {
    super(props);
    this.onUserSubmit = this.onUserSubmit.bind(this);
  }

  onUserSubmit(event) {
    console.log('entering onClick');
    event.preventDefault();
    const project_info = {
      project_name: event.target.project_name.value,
      select_file: event.target.select_file.value,
      message: event.target.message.value,
      collaborators: event.target.collaborators.value // comma delimited string
    }

    // get the file information from the input
    const file = $('#select_file')[0].files[0];
    const fileContents = fs.readFileSync(file.path, 'utf-8');
    const extFilename = file.name;

    // need to verify this?
    const collabs = project_info.collaborators.split(',');
    console.log('collaborators', collabs);

    // Need to create multiple dispatches to complete actions
    // this.props.loginUser(userCred);

    // Project Name => Project creator is the author
    const dirPath = `./${project_info.project_name}`;
    const author = `${this.props.user.first_name} ${this.props.user.last_name}`;
    console.log('dirPath', dirPath);
    console.log('author', author);
    // Init the archive
    fs.mkdirSync(dirPath);
    FEActions.initNewProject(dirPath);
    // Select A File.. Create a File of same name?
    console.log('filename', filename);
    const filePath = `${dirPath}/${extFilename}`; // change is user wants input
    console.log('filePath', filePath);
    fs.writeFileSync(filePath, '', 'utf-8');
    // Message (?)
    const message = project_info.message;
    const filename = extFilename.split('.')[0];
    const fileHash = FEActions.getSha1Hash(`${filename}${fileContents}`);
    console.log('file hash', fileHash); 22
    const commitHash = FEActions.getSha1Hash(`${filename}${fileContents}${message}`);
    console.log('commit hash', commitHash);
    // Create a commit for the first object
    const currentDate = new Date();
    FEActions.commitFileChanges(filePath, message, undefined, currentDate, fileHash, '');
    // Invite Collabs => Create db fields with project Id and their status as pending
    const bodyObj = {
      userId: this.props.user.id,
      projName: project_info.project_name,
      fileName: project_info.project_name,
      fileContents: fileContents,
      date: currentDate,
      message: message,
      fileHash: fileHash,
      commitHash: commitHash,
      committer: author,
      collabs: collabs,
    }
    console.log(bodyObj);

    axios.post(`http://localhost:3000/api/vcontrol/create`, bodyObj)
      .then(res => {
        // delete the file when everything is done and successful
        fs.unlinkSync(file.path);
        console.log(res.data);
        this.props.fetchProjects(this.props.user.id);
        return res.data;
      })
      .catch(err => console.error(err));

  }

  componentDidUpdate() {
    $("#project_name").val('');
    $("#select_file").val('');
    $("#message").val('');
    $("#collaborators").val('');
  }

  render() {
    return (
      <div className={styles.container} >

        <div className="row">
          <div className="col s12">
            <br />
            <br />
            <br />
            <img className="add_logo center" src="../public/media/archiver_logo_words_2.png" height="250px" />
          </div>
        </div>


        <div className="row">
          <form className="col s12" onSubmit={this.onUserSubmit}>
            <div className="row">
              <div className="input-field">
                <h6 className="h6-collabs left">PROJECT NAME</h6>
                <input placeholder="" id="project_name" type="text" className="validate" required />
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <h6 className="h6-collabs left">SELECT A FILE</h6>
                <input type="file" className="form-control select_file validate" id="select_file" placeholder="" required />
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <h6 className="h6-collabs left">MESSAGE</h6>
                <input placeholder="" id="message" type="text" className="validate" required />
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <h6 className="h6-collabs left">INVITE COLLABORATORS</h6>
                <textarea className="form-control validate" id="collaborators" placeholder="Please enter emails separated by commas"></textarea>
              </div>
            </div>

            <div className="row right">
              <button type="submit" className="add_ok_btn btn btn-form btn-primary cyan">
                submit
              </button>
            </div>
          </form>
        </div>

      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state) {
  return {
    user: state.login,
    projects: state.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToCollaborator: () => {
      dispatch(onCollaborator());
    },
    goToPageRender: () => {
      dispatch(onPageRender());
    },
    fetchProjects: (userId) => {
      dispatch(fetchUserProjects(userId))
    },
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);
