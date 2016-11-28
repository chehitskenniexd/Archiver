import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { checkPendingInv, updateInvStatus } from '../reducers/invitations';

export class PendingInvitations extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.login && !Object.keys(this.props.invite).length) {
      this.props.checker(this.props.login);
    };
  }

  render() {
    const invites = this.props.invite;
    const user = this.props.login;
    const allProjects = user.projects;
    const pendingList = [];

    // FASTER LOADING?
    // const project = [];
    // invites && invites.map(item => {
    //   item[0].users.filter((user => {
    //     if (user.userProject.role === 'author') {
    //       project.push({
    //         projectId: item[0].id,
    //         projectName: item[0].name,
    //         authorId: user.id,
    //         author: `${user.first_name} ${user.last_name}`
    //       })
    //     }
    //   }))
    // })

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
            invites.length === 0 ?
            (<div><h4 className="h4-invite"><i>NO PENDING INVITATIONS</i></h4></div>) :
            (
              invites.map((item, i) => {

                let invite = item[0];
                let project;
                console.log("I", invite)
                item[0].users.filter((user => {
                  if (user.userProject.role === 'author') {
                    project = {
                      projectId: item[0].id,
                      projectName: item[0].name,
                      authorId: user.id,
                      author: `${user.first_name} ${user.last_name}`
                    }
                  }
                }))

                return(
                  <tbody key={i}>
                    <tr>
                      <td>{project.author}</td>
                      <td>{project.projectName}</td>
                      <td>
                        <button className="btn waves-effect waves-light cyan" type="submit" name="action" onClick={() => this.props.updateStatus(project, user)}>
                        + Join
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            )
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
