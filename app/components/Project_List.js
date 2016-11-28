import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Accordion, AccordionItem } from 'react-sanfona';
import { fetchCurrentProjectInfo } from '../reducers/collabs';


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
          <Accordion allowMultiple={false}>
                {projectLoop && projectLoop.map((instance, index) => {
                  const titleBar = (
                      <div className="project-title">
                        <span>{instance.name}</span>
                     
                        <span className="icon-height"style={{float: 'right'}} onClick={(evt) => {
                          this.props.fetchCollabs(instance);
                          hashHistory.push('/collabs');
                          evt.stopPropagation() // **LEAVE THIS HERE!** it makes sure we don't trigger AccordionItemTitle onClick of the icon
                        }}><i className="small material-icons">supervisor_account</i></span>
                         
                      </div>
                    )
                    return (
                        <AccordionItem title={titleBar} key={index} slug={index} className="card-panel left-justified-text">
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
