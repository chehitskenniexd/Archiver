import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import styles from './Signup.css';
import {createUser} from '../reducers/login';


export class Signup extends Component {
  constructor(props) {
    super(props)
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
    this.onUserSubmit = this.onUserSubmit.bind(this);
  }


  checkPasswordMatch() {
    var password = $("#new_password").val();
    var confirmPassword = $("#confirm_password").val();
    if (password !== confirmPassword)
        $("#password_message").html("Passwords do not match");
    else
        $("#password_message").html("");
  }

  onUserSubmit(event) {
    event.preventDefault();
    const userCred = {
        email: event.target.email.value,
        password: event.target.new_password.value,
        first_name: event.target.first_name.value,
        last_name: event.target.last_name.value,
    }
      this.props.registerUser(userCred);
      // hashHistory.push('/profile')

  }

  render() {
    return (
      <div className={styles.container} >
          <div className="row col s12">
            <form className="col s12" onSubmit={this.onUserSubmit}>
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
                <div>
                  {this.props.login.userExists ? <h6>That user already exists</h6> : ""}
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="Password" id="new_password" type="password" className="validate" required />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <h5 id="password_message"></h5>
                  <input placeholder="Confirm Password" id="confirm_password" type="password" className="validate" onChange={this.checkPasswordMatch} required />
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


