import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './MainRender.css';

export class MainRender extends Component {
  render() {
    return (
      <div className={styles.container} >
        <div className="row">
        <h2>MainRender what?</h2>
        </div>
      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/

function mapStateToProps(){
  // return {
  //   login: state.login
  // }
}


function mapDispatchToProps(dispatch) {
    // return {
    //     loginUser: (userCred) => {
    //         dispatch(authenticateUser(userCred))
    //     }

    // }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainRender);
