import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { Accordion, AccordionItem } from 'react-sanfona';


const dummyCommitData = [
    {
      committer: "Bonnie Lee",
      commitMessage: "I updated something",
      date: "12/10"
    },
     {
      committer: "Adam Orange",
      commitMessage: "Made a change",
      date: "12/09"
    },
     {
      committer: "Adam Orange",
      commitMessage: "Made a change",
      date: "12/09"
    },
     {
      committer: "Adam Orange",
      commitMessage: "Made a change",
      date: "12/09"
    },
     {
      committer: "Adam Orange",
      commitMessage: "Made a change",
      date: "12/09"
    }
]



export class Project_List extends Component {
  render() {
    return (
        <div>
          <div className="card-panel orange lighten-2">
            <h3 className="left-justified-text"><i className="small material-icons">note_add</i> Project </h3>
          </div>
          <Accordion allowMultiple={false}>
                {/* LOOP OVER USERS PROJECTS HERE */}
                {[1, 2, 3, 4, 5].map((item) => {

                  const titleBar = (
                      <div className="project-title">
                        <span>Project { item }</span> {/* PULL IN THE PROJECT TITLE HERE */}
                        <span className="icon-height"style={{float: 'right'}} onClick={(evt) => {
                          alert('this action needs to be changed to re render the collaborators page') // ** ADD ACTION TO RENDER THE "COLLABORATORS" VIEW HERE, AKA REPLACE THE ALERT **
                          evt.stopPropagation() // **LEAVE THIS HERE!** it makes sure we don't trigger AccordionItemTitle onClick of the icon
                        }}><i className="small material-icons">supervisor_account</i></span>
                      </div>
                    )

                    return (
                        <AccordionItem title={titleBar}  slug={item} key={item} className="card-panel left-justified-text">
                                {dummyCommitData.map(commitInfo => {
                                  return (
                                    <div className="item-commit">
                                      <div className="commit-message commit-color">{commitInfo.commitMessage}</div>
                                      <div><span className="commit-message commit-info-font commit-date">{`On ${commitInfo.date}`}</span><span className="commit-info-font">{`by ${commitInfo.committer}`}</span></div>
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
function mapStateToProps(){
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Project_List);
