import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Collaborator.css';

export class Collaborator extends Component {
  render() {
    return (
      <div className={styles.container} >

        <div className="row">
        <h1>Collaborators</h1>
          <div className="col s1"></div>

          <div className="col s10">
            <table className="bordered centered">
              <thead>
                <tr>
                  <th data-field="id">Collaborator Name</th>
                  <th data-field="price"></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Alvin</td>
                  <td>
                    <button className="btn waves-effect waves-light cyan" type="submit" name="action">
                    x
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Alan</td>
                  <td>
                    <button className="btn waves-effect waves-light cyan" type="submit" name="action">
                    x
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Jonathan</td>
                  <td>
                    <button className="btn waves-effect waves-light cyan" type="submit" name="action">
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
