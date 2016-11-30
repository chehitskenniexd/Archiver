import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './MainHome.css';
import { onAddProject } from '../reducers/mainhome';
import PendingInvitations from './PendingInvitations';
import { checkPendingInv, updateInvStatus } from '../reducers/invitations';

export class MainHome extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.login && !Object.keys(this.props.invite).length
      && Object.keys(this.props.login).length) {
      this.props.checker(this.props.login);
    };
  }

  render() {
    const invites = this.props.invite;

    return (
      <div className={styles.container} >
        <br />
        <div className="row semi_trans">

          <div className="col s5">
            <i className="material-icons prefix large right">create_new_folder</i>
          </div>
          <div className="col s7">
            <button className="center btn-large waves-effect cyan left new_project" type="submit" name="action" onClick={() => hashHistory.push("/add")}>
              New Project
            </button>
          </div>

        </div>

        <div className="row">
          <br />
          <br />
          <hr />
        </div>

        {
          !(invites.length > 0) ?
            (
              <div className="row">
                <br />
                <h4 className="h4-invite">
                  <i>NO PENDING INVITATIONS</i>
                </h4>
              </div>
            ) :
            (
              <PendingInvitations />
            )
        }

      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state) {
  return {
    login: state.login,
    invite: state.invite
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToAdd: () => {
      dispatch(onAddProject());
    },
    checker: (user) => {
      dispatch(checkPendingInv(user))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainHome);
