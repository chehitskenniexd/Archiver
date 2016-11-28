import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Accordion, AccordionItem } from 'react-sanfona';
import { fetchCurrentProjectInfo } from '../reducers/collabs';
import { setCurrentCommit, setCurrentProject } from '../reducers/currentsReducer';


export class Project_List extends Component {
  constructor(props){
    super(props);
    this.viewAdd = this.viewAdd.bind(this);
    this.onClickProject = this.onClickProject.bind(this);
    this.onClickCommit = this.onClickCommit.bind(this);
  }

  viewAdd(){
    hashHistory.push('/add')
  }

  componentDidUpdate() {
    if (this.props.user.projects && !Object.keys(this.props.collabs).length) {
      this.props.setDefaultCollabs(this.props.user.projects[0]);
    };
  }

  onClickProject() {
    const args = Array.prototype.slice.call(arguments)[0];
    if(args.activeItems && args.activeItems.length > 0){
      this.props.setCurrentProject(this.props.user.projects[args.activeItems[0]]);
    } else {
      this.props.setCurrentProject(null);
    }
  }

  onClickCommit(commitId) {
    const currentProject = this.props.currents.currentProject;
    const commit = currentProject ? currentProject.commits.find(commit => commit.id === commitId) : null;
    commit && this.props.setCurrentCommit(commit);
    // this.props.setCurrentCommit(this.props.user.projects[projIndex].commits[commitIndex]);
  }

  render() {
    let projectLoop;
    if (this.props.user.projects) {
      projectLoop = this.props.user.projects.filter(instance => {
        return instance.userProject.role !== 'pending';
      });
    }
      return (
        <div className="sidebar-panel-wrapper">
          <div className="card-panel project-add" onClick={this.viewAdd}>
            <h3 className="left-justified-text"><i className="small material-icons">note_add</i> Project </h3>
          </div>
          <Accordion allowMultiple={false} onChange={this.onClickProject}>
                {projectLoop && projectLoop.map((instance, index) => {
                  const titleBar = (
                      <div className="project-title" onClick={this.onClickProject}>
                        <span>{instance.name}</span>

                        <Link>
                          <span className="icon-height"style={{float: 'right'}} onClick={(evt) => {
                            this.props.fetchCollabs(instance);
                            hashHistory.push('/collabs');
                            evt.stopPropagation() // **LEAVE THIS HERE!** it makes sure we don't trigger AccordionItemTitle onClick of the icon
                          }}>
                          <i className="small material-icons">supervisor_account</i>
                          </span>
                        </Link>

                      </div>
                    )
                    return (
                        <AccordionItem title={titleBar} key={index} slug={index} className="card-panel left-justified-text">
                                {instance.commits && instance.commits.map((commit) => {
                                  return (
                                    <div className="item-commit-border" key={commit.id} 
                                      onClick={() => {this.onClickCommit(commit.id)}}>
                                      <div className="commit-message commit-color">{commit.message.slice(0, 20)}</div>
                                      <div className="item-commit-details"><span className="commit-message commit-info-font commit-date">{`On ${Moment(commit.date).format('MMMM Do')}`}</span><span className="commit-info-font">{`by ${commit.committer}`}</span></div>
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
    collabs: state.collabs,
    currents: state.currents
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDefaultCollabs: (project) => {
      dispatch(fetchCurrentProjectInfo(project))
    },
    fetchCollabs: (project) => {
      dispatch(fetchCurrentProjectInfo(project))
    },
    setCurrentProject: (project) => {
      dispatch(setCurrentProject(project));
    },
    setCurrentCommit: (commit) => {
      dispatch(setCurrentCommit(commit));
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Project_List);
