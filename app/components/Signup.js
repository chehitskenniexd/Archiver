import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Signup.css';


export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
  }


  checkPasswordMatch() {
    var password = $("#new_password").val();
    var confirmPassword = $("#confirm_password").val();
    if (password !== confirmPassword)
        $("#password_message").html("Passwords do not match!");
    else
        $("#password_message").html("");
  }

  render() {
    return (
      <div className={styles.container} >
          <div className="row col s12">
            <form className="col s12">
              <div className="row">
                <div className="col 12">
                  <Link to="/"><button className="btn-floating btn-large waves-effect waves-light cyan"><i className="material-icons">chevron_left</i></button></Link>
                </div>
                <br />
                <br />
                <br />
                <div className="input-field col s6">
                  <input placeholder="First Name" id="first_name" type="text" className="validate" />
                </div>
                <div className="input-field col s6">
                  <input placeholder="Last Name" id="last_name" type="text" className="validate" />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="Email" id="email" type="email" className="validate" />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="Password" id="password" type="password" className="validate" required />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="Confirm Password" id="password" type="password" className="validate" required />
                </div>
              </div>
              <div className="row">
                <button className="waves-effect waves-light btn cyan">submit</button>
              </div>
            </form>
          </div>
      </div>
    );
  }
}
