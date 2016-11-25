import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './MainRender.css';

// Additional modules for rendering a file
import * as fs from 'fs';

export class MainRender extends Component {
  render() {
    const col6container = `col 6 ${styles.textContain}`;
    // Load in a text file with some information
    console.log('in the main component', __dirname);
    // fs.writeFileSync('./Text.txt', 'Hello!', 'utf-8');
    const renderText = fs.readFileSync('./Text.txt', 'utf-8');
    return (
      <div className={styles.container} >
        <div className="row">

          <div className="col 3"></div>

          <div className={col6container}>
            <h2>Text File</h2>
            <div id="textWindow" style={{ height: `550px`, position: `relative` }}>
              <div id="textContainer" style={{ 'maxHeight': `100%`, overflow: 'auto', border: '1px' }}>
                <div id="textRender" style={{ height: `1500px`, border: `5px` }}>{renderText}</div>
              </div>
            </div>
          </div>

          <div className="col 3"></div>

        </div>
      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/

function mapStateToProps() {
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
