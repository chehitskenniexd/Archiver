import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './Add.css';
import { onCollaborator, onPageRender } from '../reducers/mainhome'

export class Add extends Component {
  constructor(props) {
    super(props)
    this.onUserSubmit = this.onUserSubmit.bind(this);
  }

  onUserSubmit(event) {
    event.preventDefault();
    const project_info = {
        project_name: event.target.project_name.value,
        select_file: event.target.select_file.value,
        collaborators: event.target.collaborators.value
    }

    // Need to create multiple dispatches to complete actions
    // this.props.loginUser(userCred);
  }

  render() {
    return (
      <div className={styles.container} >

        <div className="row">
          <div className="col s12">
            <br />
            <br />
            <br />
            <img className="add_logo center" src="../public/media/archiver_logo_words_2.png" height="250px" />
          </div>
        </div>


        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field">
                <h6 className="h6-collabs left">PROJECT NAME</h6>
                <input placeholder="" id="project_name" type="text" className="validate" required/>
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <h6 className="h6-collabs left">SELECT A FILE</h6>
                <input type="file" className="form-control select_file validate" id="select_file" placeholder="" required />
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <h6 className="h6-collabs left">MESSAGE</h6>
                <input placeholder="" id="message" type="text" className="validate" required/>
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <h6 className="h6-collabs left">INVITE COLLABORATORS</h6>
                <textarea className="form-control validate" id="collaborators"placeholder="Please enter emails separated by commas"></textarea>
              </div>
            </div>

            <div className="row right">
              <button type="submit" className="add_ok_btn btn btn-form btn-primary cyan">submit</button>
            </div>
          </form>
        </div>

      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    goToCollaborator: () => {
      dispatch(onCollaborator());
    },
    goToPageRender: () => {
      dispatch(onPageRender());
    }
  };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add);
