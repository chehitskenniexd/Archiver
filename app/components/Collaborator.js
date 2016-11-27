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

  componentDidUpdate() {
    if (this.props.login.id && !Object.keys(this.props.collabs).length) {
      this.props.checker(this.props.login);
    };
  }

  render() {
    const collabs = this.props.collabs;
    const invites = this.props.invite;
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
                collabs && collabs.map((item, i) => {

                let collab = item[0];
                let projectCollab;

                item[0].users.filter((user => {
                  if (user.userProject.role === 'collaborator') {
                    projectCollab = `${user.first_name} ${user.last_name}`
                  }
                }))

                  return (
                    <tbody key={i}>
                      <tr>
                        <td>{projectCollab}</td>
                        <td>
                          <button className="btn-floating btn waves-effect waves-light red lighten-2" type="submit" name="action">
                          x
                          </button>
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
            invites && invites.map((item, i) => {
              console.log(item)
              let invite = item[0];
              // let projectAuthor;

              // item[0].users.filter((user => {
              //   if (user.userProject.role === 'author') {
              //     projectAuthor = `${user.first_name} ${user.last_name}`
              //   }
              // }))

              return(
                <tbody key={i}>
                  <tr>
                    <td>{invite.name}</td>
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
    collabs: state.collabs,
    invite: state.invite
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checker: (user) => {
      dispatch(checkCurrentCollabs(user));
      dispatch(checkPendingInv(user));
    }
  };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Collaborator);
