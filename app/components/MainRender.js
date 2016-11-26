import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './MainRender.css';
import MainHome from './MainHome';
import Add from './Add';
import Collaborator from './Collaborator';
import PageRender from './PageRender';


export class MainRender extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container} >
        <div className="row">

          <div className="col s1"></div>

          <div className="col s10">

            {
              this.props.mainhome.onMainHome ? <MainHome /> : ""
            }
            {
              this.props.mainhome.onAddProject ? <Add /> : ""
            }
            {
              this.props.mainhome.onCollaborator ? <Collaborator /> : ""
            }
            {
              this.props.mainhome.onPageRender ? <PageRender /> : ""
            }

          </div>

          <div className="col s1"></div>
        </div>

      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state){
  return{
    mainhome: state.mainhome
  }
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainRender);
