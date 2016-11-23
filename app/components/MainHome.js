import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Main.css';

export class MainHome extends Component {
  render() {
    return (
      <div className={styles.container} >
        <div className="row">

          <div className="col s3"></div>

          <div className="col s6">
            <button className="waves-effect waves-light btn cyan">
              <i className="material-icons prefix cyan-text text-darken-2">create_new_folder</i>
            </button>
          </div>

          <div className="col s3"></div>

        </div>
      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(){
//   // return {
//   //   login: state.login
//   // }
}

function mapDispatchToProps(dispatch) {
//     // return {
//     //     loginUser: (userCred) => {
//     //         dispatch(authenticateUser(userCred))
//     //     }

//     // }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainHome);
