import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './MainHome.css';
import { onAddProject } from '../reducers/mainhome';
import PendingInvitations from './PendingInvitations';

export class MainHome extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className={styles.container} >
        <br />
        <div className="row semi_trans">

          <div className="col s6">
            <i className="material-icons prefix large right">create_new_folder</i>
          </div>
          <div className="col s6">
            <button className="center btn-large waves-effect cyan left new_project" type="submit" name="action" onClick={() => hashHistory.push("/add")}>
              New Project
            </button>
          </div>

        </div>
        <br />
        <br />
        <PendingInvitations />
      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state) {
  return {
    mainhome: state.mainhome,
    login: state.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToAdd: () => {
      dispatch(onAddProject());
    }
  }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainHome);
