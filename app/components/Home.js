// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class Home extends Component {
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
                <input id="icon_prefix" type="text" className="validate" />
                <label htmlFor="icon_prefix">Username</label>
              </div>
              <div className="col s3"></div>
            </div>
            <div className="row">
              <div className="col s3"></div>
              <div className="input-field col s6">
                <i className="material-icons prefix cyan-text">vpn_key</i>
                <input id="vpn_key" type="text" className="validate" />
                <label htmlFor="vpn_key">Password</label>
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
