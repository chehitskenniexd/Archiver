import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './MainRender.css';

// Additional modules for rendering a file
import * as fs from 'fs';

export class MainRender extends Component {
  constructor(props) {
    super(props);
  }

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

          <div className="main-buttons-container" style={{ position: 'absolute', float: 'right' }}>
            <a className="btn-floating btn-med waves-effect waves-light red"><i className="material-icons">add</i></a>
            <a className="btn-floating btn-med waves-effect waves-light blue"><i className="material-icons">grade</i></a>
            <a className="btn-floating btn-med waves-effect waves-light green"><i className="material-icons">toc</i></a>
            <a className="btn-floating btn-med waves-effect waves-light yellow"><i className="material-icons">done</i></a>
          </div>

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
  return {};
}


function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainRender);
