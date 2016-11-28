import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { checkPendingInv } from '../reducers/invitations';
import { updateInvStatus } from '../reducers/collabs';


export class PendingInvitations extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    if (this.props.login.id && !Object.keys(this.props.invite).length) {
      this.props.checker(this.props.login);
    };
  }


  render() {
    const invites = this.props.invite;
    const user = this.props.login;
    console.log("!!!",this.props)

    return (
      <div>

        <div className="row">
          <hr />
        </div>

        <div className="row">
          <div className="col s1"></div>

          <div className="col s10">
            <br />
            <h4 className="h4-collabs">MY PENDING INVITATIONS</h4>
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
                <th data-field="id">Author</th>
                <th data-field="name">Project Title</th>
                <th data-field="price">Status</th>
            </tr>
          </thead>
          {
            invites && invites.map((item, i) => {
              let project = item[0];
              let projectAuthor;

              console.log("project", project)

              item[0].users.filter((user => {
                if (user.userProject.role === 'author') {
                  projectAuthor = {
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`
                  }
                }
              }))

              console.log("PA", projectAuthor)
              return(
                <tbody key={i}>
                  <tr>
                    <td>{projectAuthor.name}</td>
                    <td>{project.name}</td>
                    <td>
                      <button className="btn waves-effect waves-light cyan" type="submit" name="action" onClick={() => this.props.updateStatus(project, projectAuthor)}>
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

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state) {
  return {
    login: state.login,
    mainhome: state.mainhome,
    invite: state.invite
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checker: (user) => {
      dispatch(checkPendingInv(user))
    },
    updateStatus: (project, user) => {
      dispatch(updateInvStatus(project, user))
    }
  };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingInvitations);
