import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Add.css';

export class Add extends Component {
  render() {
    return (
      <div className={styles.container} >

        <div className="row">
        <h1>Hi there</h1>
          <div className="col s1"></div>

          <div className="col s10">
          </div>

          <div className="col s1"></div>
        </div>

      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/
function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add);
