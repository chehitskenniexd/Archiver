import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './PageRender.css';
import { setCurrentCommit, setCurrentProject } from '../reducers/currentsReducer';

// Additional modules for rendering a file
import * as fs from 'fs';

export class PageRender extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.currents.currentCommit) {
      this.props.currents && this.props.currents.setCurrentProject
      && this.props.setCurrentCommit(this.props.currents.currentProject.commits[0]);
    }
  }

  render() {
    const col6container = `col 6 ${styles.textContain}`;
    const renderText = this.props.currents && this.props.currents.currentCommit
      ? this.props.currents.currentCommit.blob.files[0].file_contents : '';
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
          {this.props.currents && this.props.currents.currentCommit
            ? <div className={col6container}>
              <br />
              <br />
              <br />
              <br />
              <div id="textContainer" style={{ 'minHeight':``, 'maxHeight': `100%`, border: '1px' }}>
                <div id="textRender" style={{ border: `5px` }}>{renderText}
                </div>
              </div>
            </div>
            : ''
          }
          <div className="col 3"></div>
        </div>
      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state) {
  return {
    mainhome: state.mainhome,
    currents: state.currents
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentCommit: (commit) => {
      dispatch(setCurrentCommit(commit));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageRender);
