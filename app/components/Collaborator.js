import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Collaborator.css';

export class Collaborator extends Component {
  render() {
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

              <tbody>
                <tr>
                  <td>Kenneth</td>
                  <td>
                    <button className="btn-floating btn waves-effect waves-light red lighten-2" type="submit" name="action">
                    x
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Stephanie</td>
                  <td>
                    <button className="btn-floating btn waves-effect waves-light red lighten-2" type="submit" name="action">
                    x
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Hannah</td>
                  <td>
                    <button className="btn-floating btn waves-effect waves-light red lighten-2" type="submit" name="action">
                    x
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Sophia</td>
                  <td>
                    <button className="btn-floating btn waves-effect waves-light red lighten-2" type="submit" name="action">
                    x
                    </button>
                  </td>
                </tr>
              </tbody>
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
            <u><h4>Pending Invitations</h4></u>
          </div>

          <div className="col s1"></div>
        </div>

        <div className="row">
          <div className="col s1"></div>

          <div className="col s10">
          <table className="bordered">
            <thead>
              <tr>
                  <th data-field="id">Collaborator Name</th>
                  <th data-field="delete"></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Alvin</td>
                <td>
                  <button className="btn-floating btn waves-effect waves-light red lighten-2" type="submit" name="action">
                    x
                  </button>
                </td>
              </tr>
              <tr>
                <td>Alan</td>
                <td>
                  <button className="btn-floating btn waves-effect waves-light red lighten-2" type="submit" name="action">
                    x
                  </button>
                </td>
              </tr>
              <tr>
                <td>Jonathan</td>
                <td>
                  <button className="btn-floating btn waves-effect waves-light red lighten-2" type="submit" name="action">
                  x
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
    mainhome: state.mainhome
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Collaborator);
