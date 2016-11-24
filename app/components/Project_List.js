import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { Accordion, AccordionItem } from 'react-sanfona';

export class Project_List extends Component {
  render() {
    return (
        <div>
          <div className="card-panel orange lighten-2">
            <h3><i className="material-icons">library_add</i> Project </h3>
          </div>
          <Accordion allowMultiple>
                {[1, 2, 3, 4, 5].map((item) => {
                    return (
                        <AccordionItem title={`Project ${ item } Name`} slug={item} key={item} className="card-panel cyan left-justified-text">
                            <div className="card-panel special-card">
                                {`Item ${ item } content`}
                                {item === 3 ? <p><img src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif" /></p> : null}
                            </div>
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
