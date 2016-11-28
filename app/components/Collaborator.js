import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Collaborator.css';
import PendingInvitations from './PendingInvitations';
import { checkCurrentCollabs, deleteCurrentCollab, deleteCurrentInv } from '../reducers/collabs';

export class Collaborator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // Iterating through the arrays to get out Current Collabs and Current Invitatees
    const project = this.props.collabs.projects[0];
    const projectUsers = this.props.collabs.projects[0].users;
    let userC = [],
        userI = [];
    projectUsers && projectUsers.forEach((collab) => {
      if (collab.userProject.role === 'collaborator') {
        userC.push({
          id: collab.id,
          name:`${collab.first_name} ${collab.last_name}`
        });
      } else if (collab.userProject.role === 'pending') {
        userI.push({
          id: collab.id,
          name: `${collab.first_name} ${collab.last_name}`
        });
      }
    });

    return (
      <div className={styles.container} >

        <div className="row">
        <br />
        <br />
        <br />
        <br />
        <h4 className="h4-collabs">CURRENT COLLABORATORS</h4>
          <hr />
          <div className="col s1"></div>

          <div className="col s10">
            <table className="bordered centered">
              <thead>
                <tr>
                  <th data-field="id">Collaborator Name</th>
                  <th data-field="delete">Remove</th>
                </tr>
              </thead>
              {
                userC && userC.map((user, i) => {
                  return (
                    <tbody key={i}>
                      <tr>
                        <td>{user.name}</td>
                        <td>
                          <Link>
                            <span className="red-text" type="submit" name="action" onClick={() => this.props.removeCollab(project, user)}>
                            <i className="material-icons">cancel</i>
                            </span>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  )
                })
              }
            </table>
          </div>

          <div className="col s1"></div>
        </div>

        <br />
        <br />


        <div className="row">
          <div className="col s1"></div>

          <div className="col s10">
            <h4 className="h4-collabs">CURRENT INVITATIONS</h4>
            <hr />
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
                <th data-field="status">Status</th>
                <th data-field="delete">Remove</th>
            </tr>
          </thead>
            {
              userI && userI.map((user, i) => {
              return(
                <tbody key={`${i}2`}>
                  <tr>
                    <td>{user.name}</td>
                    <td><i>Awaiting reply</i></td>
                    <td>
                      <Link>
                        <span className="red-text" type="submit" name="action" onClick={() => this.props.removeCollab(project, user)}>
                        <i className="material-icons">cancel</i>
                        </span>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              )
            })
          }
        </table>
        </div>

        <div className="col s1"></div>
        </div>

        <br />
        <br />

        <form>
          <div className="input-field row">
            <br />
            <div className="col s12">
              <h4 className="h4-collabs">INVITE COLLABORATORS</h4>

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

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state) {
  return {
    login: state.login,
    mainhome: state.mainhome,
    collabs: state.collabs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeCollab: (project, user) => {
      dispatch(deleteCurrentCollab(project, user))
    },
    removeInvite: (project, user) => {
      dispatch(deleteCurrentInv(project, user))
    }
  };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Collaborator);
