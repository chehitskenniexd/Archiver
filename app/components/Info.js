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
      <div className="info-page" id="back-to-top">

        <div className="row">
          <h1 className="h1-info">FAQs</h1>
          <hr />
          <br />
          <ul className="ul-info">
            <a className="black-text" href="#getting-started">
              <li>GETTING STARTED</li>
            </a>
            <a className="black-text" href="#add-new-project">
              <li>ADDING A NEW PROJECT</li>
            </a>
            <a className="black-text" href="#view-project-details">
              <li>VIEW PROJECT DETAILS</li>
            </a>
            <a className="black-text" href="#update-current-project">
              <li>UPDATE CURRENT PROJECT</li>
            </a>
            <a className="black-text" href="#update-messages">
              <li>UPDATE MESSAGES</li>
            </a>
            <a className="black-text" href="#select-file">
              <li>SELECTING A FILE</li>
            </a>
            <a className="black-text" href="#add-collaborator">
              <li>ADDING COLLABORATORS</li>
            </a>
            <a className="black-text" href="#remove-collaborator">
              <li>REMOVING COLLABORATORS</li>
            </a>
            <a className="black-text" href="#pending-invitations">
              <li>MY PENDING INVITATIONS</li>
            </a>
            <a className="black-text" href="#joining-project">
              <li>JOINING A PROJECT</li>
            </a>
          </ul>
          <br />
          <hr />
        </div>

        <div className="row" id="getting-started">
          <h4 className="h4-collabs">GETTING STARTED</h4>
          <hr />
        </div>
        <div className="row">
          <p>
            Thank you for choosing Archiver!
          </p>

          <p>
            Here at Archiver, we do our best to handle all your version control needs.
          </p>

          <p>
            If you've ever worked on a project within a team and had to share a single text document, you understand the dire need for a version control manager.
          </p>

          <p>
            To get started, you can begin by adding a new project, accessed on the "Project" button/icon on the sidebar or on the home page icon (also accessed via the sidebar).
          </p>

          <p>
            Feel free to use the sidebar to navigate throughout the Archiver application.
          </p>

          <p>
            Best of Luck,
          </p>

          <p>
            The Archiver Team
          </p>


        </div>
        <div className="row">
          <a className="black-text" href="#back-to-top">
            <h6 className="h6-collabs right">BACK TO TOP</h6>
          </a>
          <br />
          <br />
          <br />
          <br />
        </div>

        <div className="row" id="add-new-project">
          <h4 className="h4-collabs">ADDING A NEW PROJECT</h4>
          <hr />
        </div>
        <div className="row">
          <p>
            You may add a project in two ways:
          </p>

          <p>
            1. Click the "Project" button/icon located on the sidebar
          </p>

          <p>
            2. Click the Home icon located on the sidebar, then click the "New Project" button
          </p>

          <p>
            A project name, file and message is required on all new projects. You may also choose to invite other collaborators at this time.
          </p>
        </div>
        <div className="row">
          <a className="black-text" href="#back-to-top">
            <h6 className="h6-collabs right">BACK TO TOP</h6>
          </a>
          <br />
          <br />
          <br />
          <br />
        </div>

        <div className="row" id="view-project-details">
          <h4 className="h4-collabs">VIEW PROJECT DETAILS</h4>
          <hr />
        </div>
        <div className="row">
          <p>
            The sidebar will be your main navigation tool.
          </p>

          <p>
            All projects for which you have created as an author or are a collaborator on will appear on the sidebar underneath the "Project" button/icon.
          </p>

          <p>
            Each project will have a multi-person icon which will link to the collaborators associated to that specific project.
          </p>

          <p>
            As you click on each project, update messages specific to that project, will appear below the project name.
          </p>

          <p>
            Clicking on a specific update message will pull up details on that update message and the document associated to that update.
          </p>

          <p>
            Please note that all update messages are in reverse order, with the most recent updates appearing first.
          </p>
        </div>
        <div className="row">
          <a className="black-text" href="#back-to-top">
            <h6 className="h6-collabs right">BACK TO TOP</h6>
          </a>
          <br />
          <br />
          <br />
          <br />
        </div>

        <div className="row" id="update-current-project">
          <h4 className="h4-collabs">UPDATE CURRENT PROJECT</h4>
          <hr />
        </div>
        <div className="row">
          <p>
            To update any project, please go to the project page.
          </p>

          <p>
            Click the 'Update' button.
          </p>

          <p>
            You will be prompted to select your file and enter an update message.
          </p>

          <p>
            Once you submit your new update, the newest updated message should appear on your sidebar navigator.
          </p>
        </div>
        <div className="row">
          <a className="black-text" href="#back-to-top">
            <h6 className="h6-collabs right">BACK TO TOP</h6>
          </a>
          <br />
          <br />
          <br />
          <br />
        </div>

        <div className="row" id="update-messages">
          <h4 className="h4-collabs">UPDATE MESSAGES</h4>
          <hr />
        </div>
        <div className="row">
          <p>
            This is a required field when updating your projects.
          </p>

          <p>
            Please enter a description of what changes you have made to your project.
          </p>

          <p>
            These update messages will appear for all your collaborators to see.
          </p>
        </div>
        <div className="row">
          <a className="black-text" href="#back-to-top">
            <h6 className="h6-collabs right">BACK TO TOP</h6>
          </a>
          <br />
          <br />
          <br />
          <br />
        </div>

        <div className="row" id="select-file">
          <h4 className="h4-collabs">SELECTING A FILE</h4>
          <hr />
        </div>
        <div className="row">
          <p>
            You must select the file you would like to update on a new project and on a current existing project.
          </p>

          <p>
            This is a required field when adding a new project or updating a current project.
          </p>

          <p>
            The file selected will be shared with all current colllaborators.
          </p>
        </div>
        <div className="row">
          <a className="black-text" href="#back-to-top">
            <h6 className="h6-collabs right">BACK TO TOP</h6>
          </a>
          <br />
          <br />
          <br />
          <br />
        </div>

        <div className="row" id="add-collaborator">
          <h4 className="h4-collabs">ADDING COLLABORATORS</h4>
          <hr />
        </div>
        <div className="row">
          <p>
            There are two ways in which you may add collaborators.
          </p>

          <p>
            1. When adding a new project, you are given the option of adding collaborators
          </p>

          <p>
            2. On any specified project page, you can access the collaborator information by clicking the multi-person icon on the sidebar. The collaborator information will include current collaborators, pending collaborators, and a final option to add additional collaborators.
          </p>

          <p>
            Please note, all collaborators must be a user of Archiver in order to be added as a collaborator. To add a collaborator, please enter the email address associated to the other users account, separated by commas.
          </p>

          <p>
            Once they have joined your project, you will see them listed as collaborators on the project and they will subsequently have access to all the project information including all past update messages.
          </p>
        </div>
        <div className="row">
          <a className="black-text" href="#back-to-top">
            <h6 className="h6-collabs right">BACK TO TOP</h6>
          </a>
          <br />
          <br />
          <br />
          <br />
        </div>

        <div className="row" id="remove-collaborator">
          <h4 className="h4-collabs">REMOVING COLLABORATORS</h4>
          <hr />
        </div>
        <div className="row">
          <p>
            On the collaborator page, you also have the option of removing a collaborator from a project as well as removing an invitation to collaborate on a project.
          </p>

          <p>
            To do so, please click the "x" icon located next to their names.
          </p>
        </div>
        <div className="row">
          <a className="black-text" href="#back-to-top">
            <h6 className="h6-collabs right">BACK TO TOP</h6>
          </a>
          <br />
          <br />
          <br />
          <br />
        </div>

        <div className="row" id="pending-invitations">
          <h4 className="h4-collabs">MY PENDING INVITATIONS</h4>
          <hr />
        </div>
        <div className="row">
          <p>
            After signing in, you will be directed to the home page.
          </p>

          <p>
            The homepage will also list any pending invitations you have recieved from other users, inviting you to collaborate on a project.
          </p>

          <p>
            Invitations can only be recieved from Archiver users.
          </p>

          <p>
            If you have no invitations, that will also be indicated.
          </p>
        </div>
        <div className="row">
          <a className="black-text" href="#back-to-top">
            <h6 className="h6-collabs right">BACK TO TOP</h6>
          </a>
          <br />
          <br />
          <br />
          <br />
        </div>

        <div className="row" id="joining-project">
          <h4 className="h4-collabs">JOINING A PROJECT</h4>
          <hr />
        </div>
        <div className="row">
          <p>
            Under your pending invitations, you will have an option to join a project.
          </p>

          <p>
            To join a project, please click the icon next to the project title.
          </p>

          <p>
            The invitation will also include the author of the project.
          </p>
        </div>
        <div className="row">
          <a className="black-text" href="#back-to-top">
            <h6 className="h6-collabs right">BACK TO TOP</h6>
          </a>
          <br />
          <br />
          <br />
          <br />
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
