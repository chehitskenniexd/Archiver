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
  <div className="fixed-action-btn horizontal click-to-toggle">
    <a className="btn-floating btn-large red">
      <i className="material-icons">menu</i>
    </a>
    <ul>
      <li><a className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
      <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
      <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
      <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
    </ul>
  </div>
          <div className="col s10">
            <form>
              <div className="form-group">
                <label className="left">Project Name</label>
                <input type="email" className="form-control" placeholder="" />
              </div>
              <div className="form-group">
                <label className="left">Select A File</label>
                <input type="file" className="form-control" placeholder="Password" />
                <br />
              </div>
              <div className="form-group">
                <br />
                <label className="left">Invite Collaborators</label>
                <textarea className="form-control" rows="3"></textarea>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" /> This is a checkbox
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" /> This is a checkbox too
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="radios" checked />
                  Keep your options open
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="radios" />
                  Be sure to remember to check for unknown unknowns
                </label>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-form btn-default">Cancel</button>
                <button type="submit" className="btn btn-form btn-primary">OK</button>
              </div>



            </form>
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
