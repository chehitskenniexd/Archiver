// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.onUserSubmit = this.onUserSubmit.bind(this);
  }

  onUserSubmit(event) {
    event.preventDefault();
    const userCred = {
        email: event.target.email.value,
        password: event.target.password.value
    }
    if (event.target.id === 'login-form') {
      this.props.login(userCred)
      hashHistory.push('/')
    } else {
      if (event.target.user_name.value){
        var name = event.target.user_name.value.split(' ').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')
        userCred.name = name
      }
        this.props.registerUser(userCred);
        hashHistory.push('/profile')
    }
  }

  render() {
    return (
      <div className={styles.container} >
        <div className="row">
          <div className="col s12">
            <img className="home-logo" src="../public/media/archiver_logo_words_2.png" height="350px" />
          </div>
          <br />
          <br />
          <form className="col s12 valign">
            <div className="row">
              <div className="col s3"></div>
              <div className="input-field col s6">
                <i className="material-icons prefix cyan-text text-darken-2">account_circle</i>
                <input placeholder="Username" id="icon_prefix" type="text" className="validate" />
              </div>
              <div className="col s3"></div>
            </div>
            <div className="row">
              <div className="col s3"></div>
              <div className="input-field col s6">
                <i className="material-icons prefix cyan-text">vpn_key</i>
                <input placeholder="Password" id="vpn_key" type="text" className="validate" />
              </div>
              <div className="col s3"></div>
              <div className="col s12">
                <a className="waves-effect waves-light btn cyan">submit</a>
                <br />
              </div>
              <div className="col s12">
                <h6>OR</h6>
              </div>
              <div className="col s12">
                <Link to="/signup"><button className="waves-effect waves-light btn orange darken-3">signup</button></Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = () => ({

// });

// const mapDispatchToProps = () => ({

// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )();
