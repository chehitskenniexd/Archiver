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
    
  }

  componentDidUpdate() {
    if (this.props.loginUser.id && !Object.keys(this.props.projects).length) {
      this.props.onLoadProjects(this.props.loginUser.id);
    }
    // Re-set the current project to the updated one (THIS IS NOT THE BEST WAY)
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

