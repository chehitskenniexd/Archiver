import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { checkPendingInv } from '../reducers/invitations';

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

    return (
      <div>

        <div className="row">
          <hr />
        </div>

        <div className="row">
          <div className="col s1"></div>

          <div className="col s10">
            <u><h4>Pending Invitations</h4></u>
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

              let invite = item[0];
              let projectAuthor;

              item[0].users.filter((user => {
                if (user.userProject.role === 'author') {
                  projectAuthor = `${user.first_name} ${user.last_name}`
                }
              }))

              return(
                <tbody key={i}>
                  <tr>
                    <td>{projectAuthor}</td>
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
    }
  };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingInvitations);
