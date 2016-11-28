import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Accordion, AccordionItem } from 'react-sanfona';
import { fetchCurrentProjectInfo } from '../reducers/collabs';
import { setCurrentProject } from '../reducers/currentsReducer';


export class Project_List extends Component {
  constructor(props){
    super(props);
    this.viewAdd = this.viewAdd.bind(this);
  }

  viewAdd(){
    hashHistory.push('/add')
  }

  componentDidUpdate() {
    if (this.props.user.projects && !Object.keys(this.props.collabs).length) {
      this.props.setDefaultCollabs(this.props.user.projects[0]);
    };
    if(this.props.user.projects && !this.props.currents.currentProject){
      this.props.setCurrentProject(this.props.user.projects[0]);
    }
  }

  render() {
      return (
        <div className="sidebar-panel-wrapper">
          <div className="card-panel project-add" onClick={this.viewAdd}>
            <h3 className="left-justified-text"><i className="small material-icons">note_add</i> Project </h3>
          </div>
          <Accordion allowMultiple={false}>
                {this.props.user.projects && this.props.user.projects.map((instance, index) => {
                  const titleBar = (
                      <div className="project-title">
                        <span>{instance.name}</span>
                        <Link>
                        <span className="icon-height"style={{float: 'right'}} onClick={(evt) => {
                          this.props.fetchCollabs(instance);
                          hashHistory.push('/collabs');
                          // alert('this action needs to be changed to re render the collaborators page') // ** ADD ACTION TO RENDER THE "COLLABORATORS" VIEW HERE, AKA REPLACE THE ALERT **
                          evt.stopPropagation() // **LEAVE THIS HERE!** it makes sure we don't trigger AccordionItemTitle onClick of the icon
                        }}><i className="small material-icons">supervisor_account</i></span>
                          </Link>
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
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Project_List);
