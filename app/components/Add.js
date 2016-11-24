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
            <form>
              <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" placeholder="Email" />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Password" />
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea class="form-control" rows="3"></textarea>
              </div>
              <select class="form-control">
                <option>Option one</option>
                <option>Option two</option>
                <option>Option three</option>
                <option>Option four</option>
                <option>Option five</option>
                <option>Option six</option>
                <option>Option seven</option>
                <option>Option eight</option>
              </select>
              <div class="checkbox">
                <label>
                  <input type="checkbox" /> This is a checkbox
                </label>
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox" /> This is a checkbox too
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="radios" checked />
                  Keep your options open
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="radios" />
                  Be sure to remember to check for unknown unknowns
                </label>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn btn-form btn-default">Cancel</button>
                <button type="submit" class="btn btn-form btn-primary">OK</button>
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
