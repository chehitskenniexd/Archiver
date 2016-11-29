import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './Sidebar.css';
import Project_List from './Project_List';
import {fetchUserProjects} from '../reducers/projects_list';
import {logUserOut} from '../reducers/login';

export class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.localLogUserOut = this.localLogUserOut.bind(this);
    this.linkToHomeView = this.linkToHomeView.bind(this);
  }

 componentDidUpdate(){
    if (this.props.loginUser.id && !Object.keys(this.props.projects).length){
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
                <Link>
                  <span onClick={() => hashHistory.push('/info')}>
                    <i className="small material-icons icon-light pull-right">info</i>
                  </span>
                </Link>
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


/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state){
  return {
    loginUser: state.login,
    projects: state.projects
  }
}

function mapDispatchToProps(dispatch) {
  return {
     onLoadProjects: function (user){
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
