import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Signup.css';


export default class Signup extends Component {
  render() {
    return (
      <div className={styles.container} >
        <h1>Hello</h1>
        <Link to="/"><button className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">chevron_left</i></button></Link>

      </div>
    );
  }
}
