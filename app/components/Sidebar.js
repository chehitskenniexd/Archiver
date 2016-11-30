import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './Sidebar.css';
import Project_List from './Project_List';
import { fetchUserProjects } from '../reducers/projects_list';
import { logUserOut } from '../reducers/login';
import * as fs from 'fs';
import * as FEActions from '../../utilities/vcfrontend';
import { setCurrentProject } from '../reducers/currentsReducer';
import { clearProjects } from '../reducers/projects_list';
import { clearInvs } from '../reducers/invitations';
import axios from 'axios';

export class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.localLogUserOut = this.localLogUserOut.bind(this);
    this.linkToHomeView = this.linkToHomeView.bind(this);
    this.onClickLocalFileUpdate = this.onClickLocalFileUpdate.bind(this);
    this.onClickAddFile = this.onClickAddFile.bind(this);
    this.onClickAddArchive = this.onClickAddArchive.bind(this);
  }

  onClickAddArchive(event) {
    console.log('adding archive to local machine');
    const project = this.props.currents && this.props.currents.currentProject
      ? this.props.currents.currentProject : undefined;
    project && axios.get(`http://localhost:3000/api/vcontrol/${project.id}`)
      .then(project => {
        const projectData = project.data[0];
        // Note the object structure
        // project.commits[0].blob.files[0];

        // create the directory if it doesn't already exist
        const dirPath = `./${projectData.name}`;
        try {
          fs.statSync(dirPath).isDirectory()
        } catch (err) {
          fs.mkdirSync(dirPath);
        }
        // create the file if it doesn't already exist
        // NOTE: WILL CONTAIN MOST RECENT DATA
        const commits = projectData.commits;
        const fileData = commits[commits.length - 1].blob.files[0];
        const filePath = `${dirPath}/${fileData.file_name}.txt`
        fs.writeFileSync(filePath, fileData.file_contents, 'utf-8');

        // then create the .archive directory
        try {
          fs.statSync(`${dirPath}/.archive`).isDirectory()
        } catch (err) {
          FEActions.initNewProject(dirPath);
        }

        // then create all the .archive files
        projectData.commits.forEach((commit, index) => {
          // commitFileChanges(filePath, message, mergeHash, date)
          const fileHash = commit.blob.hash;
          const fileContent = commit.blob.files[0].file_contents;
          FEActions.commitFileChanges(filePath, commit.message, undefined, commit.date, fileHash, fileContent);
        })
      })
  }

  onClickLocalFileUpdate(event) {
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
        return false;
      }

      const commitFileContents = fileData.file_contents;
      const localFileContents = fs.readFileSync(filePath, 'utf-8');

      // Check to make sure there are changes to be sent to server
      if (commitFileContents === localFileContents) {
        console.log('no updates to be made!');
        return false;
      }

      fs.writeFileSync(filePath, commitFileContents, 'utf-8');
    }
  }

  onClickAddFile(event) {
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
        return false;
      }

      const commitFileContents = fileData.file_contents;
      const localFileContents = fs.readFileSync(filePath, 'utf-8');

      // Check to make sure there are changes to be sent to server
      if (commitFileContents === localFileContents) {
        console.log('no changes made!');
        return false;
      }

      const project = this.props.currents && this.props.currents.currentProject
        ? this.props.currents.currentProject : undefined;

      const newCommit = {
        previousCommit: fs.readFileSync(`./${dirPath}/.archive/refs/${fileData.file_name}`, 'utf-8'),
        // hard coded message
        date: new Date(),
        message: 'merging file updates to server',
        committer: `${this.props.loginUser.first_name} ${this.props.loginUser.last_name}`,
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
        .then(res => console.log(res))
        .catch(err => console.error(err));

      // Need to trigger the project_list to re-render the latest commit
      this.props.fetchProjects(this.props.loginUser.id);
    }
  }

  componentDidUpdate() {
    if (this.props.loginUser.id && !Object.keys(this.props.projects).length) {
      this.props.onLoadProjects(this.props.loginUser.id);
    }
    // Re-set the current project to the updated one (THIS IS NOT THE BEST WAY)
    console.log(this.props.currents.currentProject);
    const numCurrentCommits = this.props.currents && this.props.currents.currentProject ? this.props.currents.currentProject.commits.length : 0;
    const numProjectCommits = this.props.currents && this.props.currents.currentProject
      && this.props.projects ? this.props.projects.projects
        .filter(project => project.id === this.props.currents.currentProject.id)[0].commits.length : 0;

    this.props.currents && numCurrentCommits != numProjectCommits &&
      axios.get(`http://localhost:3000/api/vcontrol/${this.props.currents.currentProject.id}`)
        .then(project => {
          const oldProject = project.data[0];
          const newProject = Object.assign({}, oldProject, { commits: oldProject.commits.reverse() })
          this.props.setCurrentProject(newProject);
        });
  }

  linkToHomeView() {
    hashHistory.push('/mainHome');
  }

  localLogUserOut() {
    this.props.logMeOut();
  }

  linkToHomeView() {
    hashHistory.push('/mainHome');
  }

  localLogUserOut() {
    // clear projects state and my invitations state after logout for next user login
    if (this.props.projects.id) {
      this.props.nullProjects();
      this.props.nullInvs();
    }

    // then log user out
    this.props.logMeOut();
  }

  render() {
    return (
      <div className={styles.container} >
        <div className="row">
          <div className="col s12">

            <Link>
              <span onClick={() => hashHistory.push('/info')}>
                <i className="small material-icons icon-light pull-right">info</i>
              </span>
            </Link>

            <div className="DUMMY-BTN-TO-DELETE">
              <button className="btn-floating btn-large waves-effect waves-light pink accent-1 left"
                onClick={this.onClickAddArchive}>
                <i className="material-icons">queue</i>
              </button>
              <br />
              <br />
              <br />
              <button className="btn-floating btn-large waves-effect waves-light light-green accent-3 left"
                onClick={this.onClickLocalFileUpdate}>
                <i className="material-icons">play_for_work</i>
              </button>
              <br />
              <br />
              <br />
              <button className="btn-floating btn-large waves-effect waves-light light-blue accent-2 left"
                onClick={this.onClickAddFile}>
                <i className="material-icons">trending_up</i>
              </button>
            </div>

            <br />
            <br />
            <Link onClick={this.linkToHomeView}>
              <div className="welcome-name light-text">Welcome, {this.props.loginUser.first_name}</div>
              <i className="material-icons large icon-light">person_pin</i>
            </Link>
          </div>
          <div>
            <Link to={'/'}>
              <h6 onClick={this.localLogUserOut} className="light-text">Logout</h6>
            </Link>
          </div>
          <div>
            <Project_List />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginUser: state.login,
    projects: state.projects,
    currents: state.currents
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLoadProjects: function (user) {
      dispatch(fetchUserProjects(user));
    },
    fetchProjects: (userId) => {
      dispatch(fetchUserProjects(userId))
    },
    setCurrentProject: (project) => {
      dispatch(setCurrentProject(project));
    },
    logMeOut: function () {
      dispatch(logUserOut());
    },
    nullProjects: () => {
      dispatch(clearProjects());
    },
    nullInvs: () => {
      dispatch(clearInvs());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

