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
    axios.get('localhost:3000/api/vcontrol/1')
      .then(projects => {
        console.log(projects)
      })
    // this.props.projects && this.props.projects.map(project => {
    //   const dir = `./${project.name}`;
    //   const archive = `${dir}/.archive`;
    //   try{
    //     fs.statSync(dir)
    //   } catch (err) {
    //     FEActions.initNewProject(dir);
    //   }
    //   project.commits.map(commit => {
    //     FEActions.commitFileChanges(_filePath, commit.message, undefined ,commit.date);
    //   })
    // })
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
    projects: state.projects
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