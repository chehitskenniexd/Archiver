import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import styles from './Signup.css';
import { createUser } from '../reducers/login';


export class Signup extends Component {
  constructor(props) {
    super(props)
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
    this.onUserSubmit = this.onUserSubmit.bind(this);
  }


  checkPasswordMatch() {
    var password = $("#new_password").val();
    var confirmPassword = $("#confirm_password").val();
    if (confirmPassword !== "" &&password !== confirmPassword)
        $("#password_message").html("Passwords do not match");
    else
        $("#password_message").html("");
  }

  onUserSubmit(event) {
    event.preventDefault();
    var password = $("#new_password").val();
    var confirmPassword = $("#confirm_password").val();
    if (password === confirmPassword) {
      const userCred = {
          email: event.target.email.value,
          password: event.target.new_password.value,
          first_name: event.target.first_name.value,
          last_name: event.target.last_name.value,
      };

      this.props.registerUser(userCred);
      // hashHistory.push('/mainHome');
    }
  }

  componentDidUpdate() {
    if(this.props.login.email){
      hashHistory.push('/mainHome');
    }
  }

  render() {
    return (
      <div className={styles.container} >
          <div className="row">
            <div className="row">
              <br />
              <br />
              <div className="col s1"></div>
              <div className="col 10">
                <Link to="/">
                  <button className="btn-floating btn-large waves-effect waves-light cyan"><i className="material-icons">chevron_left</i></button>
                </Link>
              </div>
              <div className="col s1"></div>
              <br />
              <br />
              <br />
            </div>

            <form onSubmit={this.onUserSubmit}>
              <div className="row">
                <div className="col s1"></div>
                <div className="input-field col s5">
                  <input placeholder="First Name" id="first_name" type="text" className="validate" />
                </div>

                <div className="input-field col s5">
                  <input placeholder="Last Name" id="last_name" type="text" className="validate" />
                </div>
                <div className="col s1"></div>
              </div>

              <div className="row">
                <div className="col s1"></div>
                <div className="input-field col s10">
                  <input placeholder="Email" id="email" type="email" className="validate" />
                </div>
                <div>
                  {this.props.login.userExists ? <h6>That user already exists</h6> : ""}
                </div>
                <div className="col s1"></div>
              </div>

              <div className="row">
                <div className="col s1"></div>
                <div className="input-field col s10">
                  <input placeholder="Password" id="new_password" type="password" className="validate" required />
                </div>
                <div className="col s1"></div>
              </div>

              <div className="row">
                <div className="col s1"></div>
                <div className="input-field col s10">
                  <input placeholder="Confirm Password" id="confirm_password" type="password" className="validate" onChange={this.checkPasswordMatch} required />
                  <em>
                    <h6 id="password_message"></h6>
                  </em>
                </div>
                <div className="col s1"></div>
              </div>

              <div className="row">
                <div className="col s1"></div>

                <div className="col s10">
                  <button className="waves-effect waves-light btn cyan right">submit</button>
                </div>

                <div className="col s1"></div>
              </div>

            </form>
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
        registerUser: (userCred) => {
            dispatch(createUser(userCred))
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);


