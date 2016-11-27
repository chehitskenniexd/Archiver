import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { Accordion, AccordionItem } from 'react-sanfona';
import { fetchCurrentProjectInfo } from '../reducers/collabs';


const dummyCommitData = [
  {
    id: 1,
    committer: "Bonnie Lee",
    commitMessage: "I updated something",
    date: "12/10"
  },
    {
      id: 2,
    committer: "Adam Apple",
    commitMessage: "Made a change 1",
    date: "12/09"
  },
    {
    id: 3,
    committer: "Adam Orange",
    commitMessage: "Made a change 2",
    date: "12/08"
  },
    {
    id: 4,
    committer: "Sarah Banana",
    commitMessage: "Made a change 3 ",
    date: "12/07"
  },
    {
    id: 5,
    committer: "Emily Potato",
    commitMessage: "Made a change 4",
    date: "12/06"
  }
]



export class Project_List extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.user.projects && !Object.keys(this.props.collabs).length) {
      this.props.setDefaultCollabs(this.props.user.projects[0]);
    };
  }

  render() {
      // console.log("THIS PROPS USER", this.props.user)
      return (
        <div className="sidebar-panel-wrapper">
          <div className="card-panel project-add">
            <h3 className="left-justified-text"><i className="small material-icons">note_add</i> Project </h3>
          </div>
          <Accordion allowMultiple={false}>
                {/* LOOP OVER USERS PROJECTS HERE */}
                {this.props.user.projects && this.props.user.projects.map((instance, index) => {
                  // console.log("HERE!!!! INSTANCE.id === projectId", instance)
                  const titleBar = (
                      <div className="project-title">
                        <span>{instance.name}</span> {/* PULL IN THE PROJECT TITLE HERE */}
                        <span className="icon-height"style={{float: 'right'}} onClick={(evt) => {
                          this.props.fetchCollabs(instance)
                          // alert('this action needs to be changed to re render the collaborators page') // ** ADD ACTION TO RENDER THE "COLLABORATORS" VIEW HERE, AKA REPLACE THE ALERT **
                          evt.stopPropagation() // **LEAVE THIS HERE!** it makes sure we don't trigger AccordionItemTitle onClick of the icon
                        }}><i className="small material-icons">supervisor_account</i></span>
                      </div>
                    )
                    return (
                        <AccordionItem title={titleBar} key={index} slug={index} className="card-panel left-justified-text">
                        {//console.log('INSTANCE COMMITS', instance.commits)
                        }
                                {instance.commits && instance.commits.map((commit) => {
                                  return (
                                    <div className="item-commit-border" key={commit.id}>
                                      <div className="commit-message commit-color">{commit.message.slice(0, 20)}</div>
                                      <div className="item-commit-details"><span className="commit-message commit-info-font commit-date">{`On ${commit.date}`}</span><span className="commit-info-font">{`by ${commit.committer}`}</span></div>
                                    </div>
                                    )
                                })}
                        </AccordionItem>

                    );
                })}
            </Accordion>
        </div>
    );
  }
}


/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state){
  return {
    user: state.login,
    collabs: state.collabs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDefaultCollabs: (project) => {
      dispatch(fetchCurrentProjectInfo(project))
    },
    fetchCollabs: (project) => {
      dispatch(fetchCurrentProjectInfo(project))
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Project_List);
