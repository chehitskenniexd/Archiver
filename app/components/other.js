import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Main.css';
import Sidebar from './Sidebar';
import MainRender from './MainRender';

export class Main extends Component {
  render() {
    return (
      <div className={styles.container} >
        <div className="row">

          <div className="col s4">
            <Sidebar />
          </div>

          <div className="col s8">
            <MainRender />
          </div>

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


//HELLO PLEASE WORK

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
