import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Sidebar.css';
import Project_List from './Project_List';
import { fetchUserProjects } from '../reducers/projects_list';
import * as Actions from '../../utilities/actions';

export class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.onClickArchiveUpdate = this.onClickArchiveUpdate.bind(this);
  }

  onClickArchiveUpdate(event) {

  }

  componentDidUpdate() {
    if (this.props.loginUser.id && !Object.keys(this.props.projects).length) {
      this.props.onLoadProjects(this.props.loginUser.id);
    }
  }

  render() {
    // console.log("THIS DOT PROPS", this.props)
    return (
      <div className={styles.container} >
        <div className="row">
          <div className="col s12">
            <br />
            <br />
            <Link to="/">
              <button className="btn-floating btn-large waves-effect waves-light cyan left">
                <i className="material-icons">chevron_left</i>
              </button>
            </Link>
            <button className="btn-floating btn-large waves-effect waves-light cyan left"
              onClick={this.onClickArchiveUpdate}>
              <i className="material-icons">queue</i>
            </button>
            <br />
            <br />
          </div>

          <div>
            <i className="material-icons large">assignment_ind</i>
            <h6>Settings</h6>
            <h6>Logout</h6>
          </div>


          <div>
            <Project_List />
          </div>
        </div>
      </div>
    );
  }
}


/* ---------------- CONTAINER --------------------*/
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
