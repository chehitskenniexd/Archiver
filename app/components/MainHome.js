import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './MainHome.css';
import { onAddProject } from '../reducers/mainhome'

export class MainHome extends Component {
  constructor(props){
    super(props)
  }

  render() {
    console.log("is this working?", this.props)
    return (
      <div className={styles.container} >
        <div className="row semi_trans">

          <div className="col s6">
            <i className="material-icons prefix large right">create_new_folder</i>
          </div>
          <div className="col s6">
            <button className="center btn-large waves-effect cyan left new_project" type="submit" name="action" onClick={() => this.props.goToAdd()}>
              New Project
            </button>
          </div>

        </div>

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
    mainhome: state.mainhome
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToAdd: () => {
      dispatch(onAddProject());
    }
  }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainHome);
