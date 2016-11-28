import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './Sidebar.css';
import Project_List from './Project_List';
import {fetchUserProjects} from '../reducers/projects_list';
import {logUserOut} from '../reducers/login';
import * as fs from 'fs';
import * as FEActions from '../../utilities/vcfrontend';
import axios from 'axios';

export class Sidebar extends Component {
    constructor(props) {
      super(props)
      this.localLogUserOut = this.localLogUserOut.bind(this);
      this.linkToHomeView = this.linkToHomeView.bind(this);
      this.onClickArchiveUpdate = this.onClickArchiveUpdate.bind(this);
  }

  onClickArchiveUpdate(event) {
    console.log('enter event', this.props.currents);
    const project = this.props.currents && this.props.currents.currentProject
      ? this.props.currents.currentProject : undefined;
    console.log('project', project);
    project && axios.get(`http://localhost:3000/api/vcontrol/${project.id}`)
      .then(project => {
        const projectData = project.data[0];
        console.log(projectData)
        // Note the object structure
        // project.commits[0].blob.files[0];
        // must create the file directory ./${ProjectName}
        // then create the file ./${ProjectName}/${Filename}
        // then create the .archive file??
        const dirPath = `./${projectData.name}`;
        console.log('name', projectData.name);
        console.log(dirPath);
        try {
          fs.StatSync(dirPath).isDirectory();
        } catch (err) {
          fs.mkdirSync(dirPath);
        }
      })
  }

  componentDidUpdate() {
    if (this.props.loginUser.id && !Object.keys(this.props.projects).length) {
      this.props.onLoadProjects(this.props.loginUser.id);
    }
  }

  linkToHomeView(){
    hashHistory.push('/mainHome');
  }

  localLogUserOut(){
    this.props.logMeOut();
  }

  render() {
    return (
        <div className={styles.container} >
            <div className="row">
              <div className="col s12">
                <i className="small material-icons icon-light pull-right">info</i>
                  <button className="btn-floating btn-large waves-effect waves-light cyan left"
                    onClick={this.onClickArchiveUpdate}>
                    <i className="material-icons">queue</i>
                  </button>
                <br/>
                <br/>
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
                <Project_List/>
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
    logMeOut: function(){
      dispatch(logUserOut());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);