import React, { Component } from 'react';
import { Link } from 'react-router';
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
    console.log("please go to COLLABS", this.props)
    return (
      <div className={styles.container} >

        <div className="row">
          <div className="col s12">
            <img className="add_logo center" src="../public/media/archiver_logo_words_2.png" height="250px" />
          </div>
        </div>

        <div className="row">
          <div className="col s1"></div>

          <div className="col s10">
            <form onSubmit={this.onUserSubmit}>

              <div className="input-field row">
                <div className="col s3">
                  <label className="left">Project Name</label>
                </div>

                <div className="col s1"></div>

                <div className="col s8">
                  <input type="project_name" id="project_name"className="form-control validate" placeholder="" required/>
                </div>
              </div>


              <div className="input-field row">
                <div className="col s3">
                  <label className="left">Select A File</label>
                </div>

                <div className="col s1"></div>

                <div className="col s8">
                  <input type="file" className="form-control select_file validate" id="select_file"placeholder="" required />
                </div>
                <br />
                <br />
              </div>

              <div className="input-field row">
                <br />
                <div className="col s12">
                  <label className="left">Invite Collaborators</label>
                  <br />
                </div>

                <div className="col s12">
                  <textarea className="form-control validate" id="collaborators"placeholder="Please enter emails separated by commas"></textarea>
                </div>
              </div>

              <div className="form-actions row">
                <div className="col s7">
                  <button type="submit" className="btn btn-form btn-default orange darken-3">Cancel</button>
                </div>

                <div className="col s5">
                  <button type="submit" className="add_ok_btn btn btn-form btn-primary cyan">OK</button>
                </div>
              </div>

            </form>
          </div>

          <div className="col s1"></div>
        </div>

        <div className="row TO-REMOVE-JUST-TEST-COLLABS">
          <button className="center btn-large waves-effect cyan left new_project" type="submit" name="action" onClick={() => this.props.goToCollaborator()}>
              COLLAB PG
          </button>
          <button className="center btn-large waves-effect cyan left new_project" type="submit" name="action" onClick={() => this.props.goToPageRender()}>
              PG RENDER
          </button>
        </div>

      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state) {
  return {
    mainhome: state.mainhome
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToCollaborator: () => {
      dispatch(onCollaborator());
    },
    goToPageRender: () => {
      dispatch(onPageRender());
    }
  }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add);
