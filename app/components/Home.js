// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import {authenticateUser} from '../reducers/login';
import {connect} from 'react-redux';
import { Link, Router, hashHistory } from 'react-router';


export class Home extends Component {
  constructor(props) {
    super(props)
    this.onUserSubmit = this.onUserSubmit.bind(this);

  }

  onUserSubmit(event) {
    event.preventDefault();
    const userCred = {
        email: event.target.email.value,
        password: event.target.password.value,
    }
    this.props.loginUser(userCred);
    hashHistory.push("/mainHome")
  }

  render() {
    return (
      <div className={styles.container} >
        <div className="row">

          <div className="col s12">
            <img className="home_logo" src="../public/media/archiver_logo_words_2.png" height="350px" />
          </div>

          <br />
          <br />

          <form className="col s12 valign" onSubmit={this.onUserSubmit}>
            <div className="row email-margin-bottom-zero">
              <div className="col s3"></div>
              <div className="input-field col s6">
                <i className="material-icons prefix cyan-text text-darken-2">account_circle</i>
                <input placeholder="Username" id="email" type="text" className="validate" />
                {this.props.login.incorrectUser ? <h6>user does not exist</h6> : ""}
              </div>

              <div className="col s3"></div>
            </div>

            <div className="row email-margin-bottom-zero">
              <div className="col s3"></div>

              <div className="input-field col s6">
                <i className="material-icons prefix cyan-text">vpn_key</i>
                <input placeholder="Password" id="password" type="password" className="validate" />
                 {this.props.login.incorrectPassword ? <h6>incorrect password</h6> : ""}
              </div>

              <div className="col s3"></div>
            </div>

            <div className="row home_button1">
              <div className="col s12">
                <button className="waves-effect waves-light btn cyan">submit</button>
                <br />
              </div>

              <div className="col s2"></div>
              <div className="col s8">
              </div>
              <div className="col s2"></div>


            </div>
          </form>
          <div className="row home_button2">
            <div className="col s12">

                <button className="waves-effect waves-light btn orange darken-3" onClick={() => hashHistory.push("/signup")}>signup</button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/

function mapStateToProps(state){
  return {
    login: state.login
  }
}


function mapDispatchToProps(dispatch) {
    return {
        loginUser: (userCred) => {
            dispatch(authenticateUser(userCred))
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
