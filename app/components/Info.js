import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './Info.css';
import MainHome from './MainHome';
import Add from './Add';
import Collaborator from './Collaborator';
import PageRender from './PageRender';


export class Info extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="info-page">

        <div className="row">
          <div className="col s12">
            <h1 className="h1-info">FAQs</h1>
            <hr />
            <br />
            <ul className="ul-info">
              <li>GETTING STARTED</li>
              <li>ADDING A NEW PROJECT</li>
              <li>COMMIT MESSAGES</li>
              <li>VIEW DIFFERENT PROJECT DETAILS</li>
              <li>Updating current project</li>
              <li>Merge conflicts</li>
              <li>Adding collaborators</li>
              <li>Removing collaborators</li>
              <li>My pending invitations</li>
              <li>Joining a project</li>
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state) {
  return{};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Info);
