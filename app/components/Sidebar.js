import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Sidebar.css';
import Project_List from './Project_List'

export class Sidebar extends Component {
  render() {
    return (
        <div className={styles.container} >
            <div className="row">
              <div className="col s12">
              <br/>
              <br/>
                <Link to="/">
                  <button className="btn-floating btn-large waves-effect waves-light cyan left">
                    <i className="material-icons">chevron_left</i>
                  </button>
                </Link>
                <br />
                <br />
              </div>

              <div>
                <i className="material-icons large">assignment_ind</i>
                <h6>Settings</h6>
                <h6>Logout</h6>
              </div>


              <div>
                <Project_List />
              </div>
            </div>
        </div>
    );
  }
}


/* ---------------- CONTAINER --------------------*/
function mapStateToProps(){
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);
