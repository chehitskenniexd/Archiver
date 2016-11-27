import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { checkPendingInv } from '../reducers/invitations'

export class PendingInvitations extends Component {
  constructor(props){
    super(props)
  }

  runCheckPendingInv() {
    if (this.props.login.id) {
      console.log("LOGiN?", this.props.login)
      checkPendingInv(this.props.login.id)
    }
  }


  render() {
    console.log("in PI props", this.props)
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

          <tbody>
            <tr>
              <td>Alvin</td>
              <td>Eclair</td>
              <td>
                <button className="btn waves-effect waves-light cyan" type="submit" name="action">
                + Join
                </button>
              </td>
            </tr>
            <tr>
              <td>Alan</td>
              <td>Jellybean</td>
              <td>
                <button className="btn waves-effect waves-light cyan" type="submit" name="action">
                + Join
                </button>
              </td>
            </tr>
            <tr>
              <td>Jonathan</td>
              <td>Lollipop</td>
              <td>
                <button className="btn waves-effect waves-light cyan" type="submit" name="action">
                + Join
                </button>
              </td>
            </tr>
          </tbody>
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
    mainhome: state.mainhome
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingInvitations);
