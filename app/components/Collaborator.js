import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Collaborator.css';
import PendingInvitations from './PendingInvitations';
import { checkCurrentCollabs } from '../reducers/collabs';

export class Collaborator extends Component {
  constructor(props) {
    super(props)
  }

  // componentDidUpdate() {
  //   if (this.props.login.id && !Object.keys(this.props.collabs).length) {
  //     this.props.checker(this.props.login);
  //   };
  // }

  render() {
    console.log("hahaha!!!!!", this.props)
    const projectUsers = this.props.collabs.projects[0].users;
    console.log("PUUUU", projectUsers)
    const projects = [];

    return (
      <div className={styles.container} >

        <div className="row">
        <u><h4>Current Collaborators</h4></u>
          <div className="col s1"></div>

          <div className="col s10">
            <table className="bordered">
              <thead>
                <tr>
                  <th data-field="id">Collaborator Name</th>
                  <th data-field="price"></th>
                </tr>
              </thead>
              {
                projectUsers && projectUsers.map((collab, i) => {

                let userC;

                if (collab.userProject.role === 'collaborator') {
                  userC = `${collab.first_name} ${collab.last_name}`
                }

                  return (
                    <tbody key={i}>
                      <tr>
                        <td>{userC}</td>
                        <td>
                          <button className="btn-floating btn waves-effect waves-light red lighten-2" type="submit" name="action">
                          x
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              }
            </table>
          </div>

          <div className="col s1"></div>
        </div>

        <br />
        <hr />

        <div className="row">
          <div className="col s1"></div>

          <div className="col s10">
            <u><h4>Current Invitations</h4></u>
          </div>

          <div className="col s1"></div>
        </div>

        <div className="row">
        <div className="col s1"></div>

        <div className="col s10">
        <table className="bordered centered">
          <thead>
            <tr>
                <th data-field="id">Invitee</th>
                <th data-field="price">Status</th>
            </tr>
          </thead>
            {
              projectUsers && projectUsers.map((collab, i) => {

              let userI;

              if (collab.userProject.role === 'pending') {
                userI = `${collab.first_name} ${collab.last_name}`
              }
              return(
                <tbody key={`${i}2`}>
                  <tr>
                    <td>{userI}</td>
                    <td>
                      <button className="btn waves-effect waves-light cyan" type="submit" name="action">
                      + Join
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })
          }
        </table>
        </div>

        <div className="col s1"></div>
        </div>

        <hr />

        <form>
          <div className="input-field row">
            <br />
            <div className="col s12">
              <u><h4>Invite Collaborators</h4></u>
              <br />
            </div>

            <div className="col s12">
              <textarea className="form-control validate" id="collaborators"placeholder="Please enter emails separated by commas"></textarea>
              <button type="submit" className="add_ok_btn btn btn-form btn-primary cyan right">submit
              </button>
            </div>
          </div>
        </form>

      </div>
    );
  }
}
// need to revise pending invitations, its only for pending invites sent out for that current project

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state) {
  return {
    login: state.login,
    mainhome: state.mainhome,
    collabs: state.collabs
    // projects: state.projects.projects
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // checker: (user) => {
    //   dispatch(checkCurrentCollabs(user));
    //   dispatch(checkPendingInv(user));
    // }
  };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Collaborator);
